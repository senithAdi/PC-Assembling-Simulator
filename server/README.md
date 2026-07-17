# PC Assembly Simulator — API (Express + MongoDB)

REST API backing the simulator. Stores **users, their saved builds, and their
progress/achievements** in MongoDB (via Mongoose). The component catalog,
motherboard drop-zone data, and quizzes are fixed reference data and live in the
**frontend code**, not the database.

## Setup

```bash
cd server
npm install
cp .env.example .env      # then edit .env with your MongoDB URI + JWT secret
npm run dev               # nodemon, or: npm start
```

Requires a running MongoDB (local `mongod`, Docker, or a free MongoDB Atlas
cluster — set `MONGODB_URI` accordingly). Collections and indexes are created
automatically by Mongoose on first use; there is no SQL schema to run.

## Data model (MongoDB collections)

```
users
  _id            ObjectId           (returned to the client as user_id)
  username       String
  email          String  (unique, lowercased)
  passwordHash   String  (bcrypt)
  level          Number  (default 1)
  xp             Number  (default 0)
  totalPoints    Number  (default 0)
  achievements   [ { code, title, description, xpReward, unlockedAt } ]
  createdAt / updatedAt   (timestamps)

builds
  _id               ObjectId        (returned as build_id)
  user              ObjectId  → users._id   (indexed)
  buildName         String
  scenarioId        String | null
  scenarioTitle     String | null
  difficulty        String | null
  completionStatus  String  (default "In Progress")
  score             Number
  completionTime    Number | null
  components        [ { componentId, name, category, manufacturer,
                        model, motherboardSlot, correctlyInstalled } ]
  createdAt / updatedAt
```

`components[].componentId` references a catalog id from the frontend data
(e.g. `cpu_intel_i5_13600k`) — the catalog itself is not stored in the DB.

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | – | Create account, returns JWT + user |
| POST | `/api/auth/login` | – | Log in, returns JWT + user |
| GET | `/api/users/:id` | ✔ | Get profile (xp, level, points) |
| PATCH | `/api/users/:id/xp` | ✔ | Award XP, auto level-up |
| GET | `/api/builds?userId=:id` | ✔ | List a user's builds |
| POST | `/api/builds` | ✔ | Save a build |
| DELETE | `/api/builds/:id` | ✔ | Delete own build |
| GET | `/api/achievements` | – | All achievement definitions |
| GET | `/api/achievements/:userId` | ✔ | A user's unlocked achievements |
| POST | `/api/achievements/unlock` | ✔ | Unlock an achievement (idempotent) |
| GET | `/api/health` | – | Health check |
```
