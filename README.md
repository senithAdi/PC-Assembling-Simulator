# PC Assembling Simulator

An educational, browser-based PC building simulator for school students. Learners
drag real components onto a real motherboard photo, get instant compatibility
feedback, earn points/XP, and save their builds.

The project is a **monorepo** with two independent, self-contained apps:

```
PC-Assembling-Simulator/
├── client/        # React 18 + TypeScript + Vite frontend (the website)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── public/            # static assets served as-is (component/board images)
│   │   └── images/components/
│   └── src/
│       ├── main.tsx           # app entry
│       ├── styles/            # Tailwind v4 + theme CSS
│       └── app/
│           ├── App.tsx        # top-level page router
│           ├── api/           # REST client (talks to the server)
│           └── components/
│               ├── *.tsx      # page-level screens (Simulator, Dashboard, …)
│               ├── ui/        # reusable shadcn/ui primitives
│               └── data/      # component catalog + motherboard drop-zone data
│
└── server/        # Express + MongoDB (Mongoose) REST API
    ├── index.js          # app entry
    ├── db.js             # MongoDB connection
    ├── models/           # Mongoose schemas (User, Build)
    ├── routes/           # auth, users, builds, achievements
    ├── middleware/       # JWT auth guard
    └── data/             # achievement definitions
```

Component catalog, motherboard drop-zone coordinates, and quizzes are fixed
reference data that live in the **frontend** (`client/src/app/components/data/`),
not the database. The database only stores **users, their saved builds, and their
progress/achievements**.

---

## Running locally

You need [Node.js](https://nodejs.org/) 18+ and a MongoDB database
(local `mongod`, Docker, or a free [MongoDB Atlas](https://www.mongodb.com/atlas)
cluster). Open two terminals.

**1. Backend (`server/`)**

```bash
cd server
npm install
cp .env.example .env      # then edit .env with your MongoDB URI + JWT secret
npm run dev               # starts the API on http://localhost:3001
```

**2. Frontend (`client/`)**

```bash
cd client
npm install
npm run dev               # starts the site on http://localhost:5173
```

The Vite dev server proxies `/api/*` to the backend on port 3001 (see
`client/vite.config.ts`), so no extra frontend config is needed for local dev.

---

## Deploying

The two apps deploy independently.

### Frontend → any static host (Vercel, Netlify, GitHub Pages, …)

```bash
cd client
npm install
npm run build             # outputs static files to client/dist/
```

- **Root directory:** `client`
- **Build command:** `npm run build`
- **Output/publish directory:** `dist`

A `vercel.json` at the repo root already points Vercel at the `client/`
directory, so a Vercel project connected to this repo builds the frontend with
no extra dashboard configuration. Point the deployed site's `/api` calls at your
backend URL (host the API behind the same domain or configure the API base URL
for your host).

### Backend → any Node host (Render, Railway, Fly.io, …)

- **Root directory:** `server`
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variables:** copy the keys from `server/.env.example`
  (`MONGODB_URI`, `JWT_SECRET`, `PORT`, `CLIENT_ORIGIN`). Set `CLIENT_ORIGIN`
  to your deployed frontend URL so CORS allows it.

See `server/README.md` for the full data model and API endpoint reference.
