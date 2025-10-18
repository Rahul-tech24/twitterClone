# TwitterClone

A small fullstack Twitter-like clone with a Node/Express backend and a Vite + Vue frontend.

## Structure

- `backend/` - Node.js + Express API
- `frontend/` - Vite + Vue 3 frontend

## Requirements

- Node.js >= 18 (or compatible LTS)
- npm or yarn

## Quick start

Open two terminals.

1) Backend

```powershell
cd backend
npm install
# development
npm run dev
# production
npm start
```

2) Frontend

```powershell
cd frontend
npm install
# development (Vite)
npm run dev
# build
npm run build
# preview built app
npm run preview
```

## Environment

Create a `.env` file in `backend/` with variables required by your app (example):

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Do not commit `.env` files — they are already ignored by `.gitignore`.

## GitHub

To publish this repo to GitHub:

Option A — using GitHub CLI (`gh`):

```powershell
# from repo root
git init
git add .
git commit -m "Initial commit"
# create remote repo interactively
gh repo create --public --source=. --remote=origin
# push
git push -u origin main
```

Option B — manual on GitHub.com:

- Create a new repository on GitHub.
- In your local repo:

```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## Notes

- If you previously committed files that should be ignored (e.g., `node_modules`), run:

```powershell
git rm -r --cached node_modules
git commit -m "Remove node_modules from repo"
```

## License

Add your license as needed.
