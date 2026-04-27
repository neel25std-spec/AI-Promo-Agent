# Project Structure

```text
PromoAgent/
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ ContentPreview.jsx
│  │  ├─ LiveDashboard.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ index.html
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  └─ vite.config.js
├─ .gitignore
├─ .env
├─ README.md
├─ PROJECT_STRUCTURE.md
├─ gemini_agent.py
├─ linkedin_auth.py
├─ linkedin_service.py
├─ twitter_service.py
├─ scraper_service.py
├─ main.py
└─ requirements.txt
```

## Notes

- Keep secrets only in `.env` (never commit real values).
- `frontend/node_modules/` and generated artifacts are ignored by `.gitignore`.
- CI workflow is defined in `.github/workflows/ci.yml`.

