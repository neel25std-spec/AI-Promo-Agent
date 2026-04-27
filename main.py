# To run this backend:
# 1. pip install -r requirements.txt
# 2. Fill in all values in your .env file
# 3. Run: uvicorn main:app --reload --port 8000
# 4. Backend will be live at http://localhost:8000
# 5. Test the health check at http://localhost:8000/api/health

import os
import json
import asyncio
from datetime import datetime
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from sse_starlette.sse import EventSourceResponse
from collections.abc import Callable
from typing import cast

_ = load_dotenv()

import gemini_agent
import linkedin_service
import twitter_service

app = FastAPI(title="AI PromoAgent Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    # Dev-friendly CORS. SSE (EventSource) does not require cookies,
    # so credentials can stay disabled and we can allow all origins.
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PlatformPost(BaseModel):
    post: str

class CampaignContent(BaseModel):
    linkedin: PlatformPost
    twitter: PlatformPost

class CampaignState(BaseModel):
    content: CampaignContent
    recipientEmail: str

# In-memory store for the latest campaign
current_campaign: CampaignState | None = None

class GenerateRequest(BaseModel):
    productName: str
    description: str
    price: str
    targetAudience: str
    recipientEmail: str
    linkedinProfileUrl: str
    imageBase64: str | None = None
    websiteUrl: str | None = None

class SendCampaignRequest(BaseModel):
    content: CampaignContent
    recipientEmail: str

@app.get("/api/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}

@app.post("/api/generate")
def generate_content(req: GenerateRequest) -> dict[str, dict[str, str]]:
    try:
        if not os.getenv("GEMINI_API_KEY"):
            raise HTTPException(status_code=400, detail="Missing required backend configuration.")
        
        generate_fn = cast(
            Callable[[str, str, str, str], dict[str, dict[str, str]]],
            gemini_agent.generate_promotional_content,
        )
        generated = generate_fn(req.productName, req.description, req.price, req.targetAudience)
        content = CampaignContent.model_validate(generated)
        return content.model_dump()
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=400, detail="AI content generation failed. Please retry.")

@app.post("/api/send-campaign")
async def send_campaign(req: SendCampaignRequest) -> dict[str, str]:
    try:
        global current_campaign
        current_campaign = CampaignState(content=req.content, recipientEmail=req.recipientEmail)
        return {"status": "campaign_started"}
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to start campaign.")

@app.get("/api/stream")
async def stream_campaign(_request: Request) -> EventSourceResponse:
    async def event_generator():
        global current_campaign
        if not current_campaign:
            yield {"data": json.dumps({"message": "❌ No campaign found", "status": "failed", "timestamp": datetime.now().isoformat()})}
            return

        campaign_data = current_campaign
        content = campaign_data.content

        # Step 1 — Post to LinkedIn
        yield {"data": json.dumps({"message": "🔗 Posting to LinkedIn...", "status": "in_progress", "timestamp": datetime.now().isoformat()})}
        _ = await asyncio.sleep(1)
        
        try:
            post_linkedin = cast(Callable[[str], bool], linkedin_service.post_to_linkedin)
            _ = await asyncio.to_thread(
                post_linkedin,
                content.linkedin.post,
            )
            yield {"data": json.dumps({"message": "✅ LinkedIn post published!", "status": "success", "timestamp": datetime.now().isoformat()})}
        except Exception:
            yield {"data": json.dumps({"message": "❌ LinkedIn failed. Please verify login and retry.", "status": "failed", "timestamp": datetime.now().isoformat()})}

        _ = await asyncio.sleep(1)

        # Step 2 — Post to X (Twitter)
        yield {"data": json.dumps({"message": "𝕏 Posting to X...", "status": "in_progress", "timestamp": datetime.now().isoformat()})}
        _ = await asyncio.sleep(1)
        
        try:
            post_twitter = cast(Callable[[str], bool], twitter_service.post_to_twitter)
            _ = await asyncio.to_thread(
                post_twitter,
                content.twitter.post,
            )
            yield {"data": json.dumps({"message": "✅ X post published!", "status": "success", "timestamp": datetime.now().isoformat()})}
        except Exception:
            yield {"data": json.dumps({"message": "❌ X failed. Please verify login and retry.", "status": "failed", "timestamp": datetime.now().isoformat()})}

        _ = await asyncio.sleep(1)

        # Step 4 — Campaign Complete
        yield {"data": json.dumps({"message": "🎉 Campaign complete! All platforms are live.", "status": "campaign_complete", "timestamp": datetime.now().isoformat()})}

    return EventSourceResponse(event_generator())
