# DevPulse

A developer stats dashboard that aggregates your **GitHub** and **LeetCode** activity into one clean view. Enter your usernames and get an instant overview of your contributions, repositories, coding streaks, and problem-solving stats.

## Features

- **GitHub Stats** — contribution heatmap, top repositories, language breakdown
- **LeetCode Stats** — difficulty chart, submission history, badges, activity heatmap
- **Combined Dashboard** — profile overview and stats summary in one place
- **Caching** — Upstash Redis caching to avoid rate limits and speed up repeated lookups
- **Dark / Light theme** — persistent theme toggle

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, Tailwind CSS, Recharts, React Router |
| Backend | Node.js, Express 5 |
| Cache | Upstash Redis |
| Deployment | Vercel (frontend), Railway / Render (backend) |

## Project Structure

```
DevPulse/
├── frontend/          # React + Vite app
│   └── src/
│       ├── components/
│       │   ├── dashboard/   # GitHub & LeetCode widgets
│       │   ├── home/        # Landing page components
│       │   ├── layout/      # Header & Footer
│       │   └── shared/      # Reusable UI components
│       ├── hooks/           # useDashboard, useTheme
│       ├── pages/           # Home, Dashboard, About
│       └── services/        # API calls
└── backend/           # Express API server
    ├── routes/
    │   ├── github.js
    │   ├── leetcode.js
    │   └── dashboard.js
    └── server.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- An [Upstash Redis](https://upstash.com) database (free tier works)
- A GitHub Personal Access Token (for higher API rate limits)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev            # starts on port 3000
```

**Environment variables (`backend/.env`):**

```env
PORT=3000
GITHUB_TOKEN=your_github_personal_access_token
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
FRONTEND_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev            # starts on http://localhost:5173
```

**Environment variables (`frontend/.env`):**

```env
VITE_API_URL=http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/github/:username` | GitHub profile & repo data |
| GET | `/api/leetcode/:username` | LeetCode stats & submissions |
| GET | `/api/dashboard/:githubUsername/:leetcodeUsername` | Combined dashboard data |
| GET | `/health` | Server health check |

## Deployment

- **Frontend** is deployed on Vercel — push to `main` and Vercel auto-deploys.
- **Backend** can be deployed on Railway, Render, or any Node.js host. Set the environment variables in the platform dashboard.

## License

MIT
