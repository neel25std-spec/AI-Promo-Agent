import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def generate_promotional_content(product_name, description, price, target_audience):
    prompt = f"""You are a professional marketing copywriter. Based on the product 
details below, generate promotional content for 2 platforms. 
Return ONLY a valid JSON object with no markdown, no code blocks, 
no extra text — just the raw JSON.

Product Name: {product_name}
Description: {description}
Price: {price}
Target Audience: {target_audience}

Return this exact JSON structure:
{{
  "linkedin": {{
    "post": "professional LinkedIn post text here, under 300 words, no hashtag spam, end with a subtle CTA"
  }},
  "twitter": {{
    "post": "punchy tweet here — MUST be under 280 characters, include 2-3 relevant hashtags"
  }}
}}"""
    model = genai.GenerativeModel("gemini-2.5-flash")
    
    for attempt in range(2):
        try:
            response = model.generate_content(prompt)
            content = response.text.strip()
            
            # Strip any accidental markdown formatting
            if content.startswith("```json"):
                content = content[7:]
            elif content.startswith("```"):
                content = content[3:]
            if content.endswith("```"):
                content = content[:-3]
                
            content = content.strip()
            
            return json.loads(content)
        except json.JSONDecodeError:
            if attempt == 1:
                raise Exception("AI content generation failed to produce valid JSON after retries.")
            continue
        except Exception as e:
            if attempt == 1:
                raise Exception(f"AI content generation failed: {str(e)}")
            continue
