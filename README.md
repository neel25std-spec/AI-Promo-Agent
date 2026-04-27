# PromoAgent

AI-powered promo campaign generator + multi-channel posting (LinkedIn + X) with a React dashboard.

## Repo structure

```
PromoAgent/
  main.py
  gemini_agent.py
  linkedin_service.py
  twitter_service.py
  scraper_service.py
  linkedin_auth.py
  requirements.txt
  frontend/
    src/
```

## Prerequisites

- Python 3.10+ (recommended 3.12+)
- Node.js 20+

## Setup

### 1) Backend

```bash
cd PromoAgent
python -m pip install -r requirements.txt
```

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=...
LINKEDIN_USERNAME=...
LINKEDIN_PASSWORD=...
TWITTER_USERNAME=...
TWITTER_PASSWORD=...
```

Run the backend:

```bash
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Health check:

- `http://127.0.0.1:8000/api/health`

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the UI at the URL Vite prints (usually `http://127.0.0.1:5173/` or `http://127.0.0.1:5174/`).

## One-time LinkedIn login (recommended)

LinkedIn often blocks repeated automated logins. Run this once to save a session to `linkedin_state.json`:

```bash
cd PromoAgent
python linkedin_auth.py
```

Complete any captcha/2FA in the opened browser window. After that, posting should reuse the saved session.

## Troubleshooting

- **Dashboard says “Connection to server lost…”**
  - Confirm backend is running on `http://127.0.0.1:8000`
  - Refresh the dashboard tab (hard refresh: Ctrl+Shift+R)

- **LinkedIn won’t post**
  - Run `python linkedin_auth.py` to generate `linkedin_state.json`
  - Then retry posting

## Notes

- This project uses browser automation for posting; platform UI changes can break selectors.
