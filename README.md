# 🎯 Remote Interview Platform

> A real-time collaborative coding interview platform with live video, chat, and a Monaco-powered code editor.

**🌐 Live Demo:** [https://remote-interview-platform-xwwk.onrender.com](https://remote-interview-platform-xwwk.onrender.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Frontend](#frontend)
  - [Pages & Routes](#pages--routes)
  - [Components](#components)
  - [Hooks](#hooks)
  - [Environment Variables (Frontend)](#environment-variables-frontend)
- [Backend](#backend)
  - [API Reference](#api-reference)
  - [Data Models](#data-models)
  - [Middleware](#middleware)
  - [Environment Variables (Backend)](#environment-variables-backend)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

---

## Overview

**Remote Interview Platform** is a full-stack web application that enables interviewers and candidates to conduct live technical interviews. It combines real-time video calling, instant messaging, and a collaborative code editor — all in one seamless interface.

Hosts can create sessions with a selected problem and difficulty level. Participants can browse active sessions and join them. Both parties get a split-panel workspace featuring a problem description panel, a multi-language code editor, an output console, and a live video + chat sidebar.

---

## Features

- 🔐 **Clerk Authentication** — Secure sign-up/sign-in with Clerk. Users are synced to MongoDB via Inngest background jobs.
- 📹 **Live Video Calling** — Powered by Stream Video SDK with automatic call creation and cleanup.
- 💬 **Real-time Chat** — In-session messaging via Stream Chat SDK.
- 💻 **Monaco Code Editor** — VS Code-grade editor with multi-language support (syntax highlighting, autocomplete).
- ⚙️ **Code Execution** — Run code against the Piston API and see output instantly.
- 📚 **Problem Library** — Curated coding problems with descriptions, examples, and constraints.
- 📊 **Dashboard** — View active sessions, recent session history, and user stats.
- 🎛️ **Resizable Panels** — Drag-to-resize layout (problem panel, code editor, output, video).
- 🚀 **Production-ready** — Single-process deployment: Express serves the built React SPA.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 6 | Bundler & dev server |
| TailwindCSS v4 + DaisyUI v5 | Styling & component theme |
| React Router DOM v7 | Client-side routing |
| @tanstack/react-query | Server state, caching, mutations |
| @clerk/clerk-react | Authentication UI |
| @stream-io/video-react-sdk | Video calling |
| stream-chat-react | Real-time chat |
| @monaco-editor/react | Code editor |
| axios | HTTP client |
| react-toastify | Toast notifications |
| date-fns | Date formatting |
| lucide-react | Icons |
| react-resizable-panels | Draggable split panels |
| canvas-confetti | Session completion celebration effect |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| @clerk/express | Request authentication (JWT validation) |
| @stream-io/node-sdk | Stream Video call management |
| stream-chat | Stream Chat channel management |
| Inngest | Background job queue (user sync on sign-up) |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |

---

## Project Structure

```
RemoteInterview/
├── package.json              # Root – shared scripts
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js         # App entry point
│       ├── config/
│       │   ├── db.js         # MongoDB connection
│       │   ├── stream.js     # Stream client setup
│       │   └── inngest.js    # Inngest client & functions
│       ├── controller/
│       │   ├── sessionController.js
│       │   └── chatControllers.js
│       ├── routes/
│       │   ├── sessionRoutes.js
│       │   └── chatRoutes.js
│       ├── model/
│       │   ├── Session.js
│       │   └── User.js
│       ├── middleware/
│       │   └── protectRoute.js
│       └── helper/
│           └── env.js        # Validated env variables
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx           # Router root
        ├── main.jsx          # React entry, QueryClient, Toastify
        ├── api/
        │   └── sessions.js   # Axios API calls
        ├── data/
        │   └── problem.js    # Static problem definitions
        ├── hooks/
        │   ├── useSessions.js        # React Query hooks for sessions
        │   └── useStreamClient.js    # Stream video + chat init hook
        ├── lib/
        │   ├── piston.js     # Code execution via Piston API
        │   ├── stream.js     # Stream client connect/disconnect
        │   ├── utils.js      # Helpers (badge class, etc.)
        │   └── axios.js      # Configured axios instance
        ├── pages/
        │   ├── HomePage.jsx
        │   ├── DashboardPage.jsx
        │   ├── ProblemsPage.jsx
        │   ├── ProblemPage.jsx
        │   └── SessionPage.jsx
        └── components/
            ├── Navbar.jsx
            ├── WelcomeSection.jsx
            ├── StatsCards.jsx
            ├── ActiveSessions.jsx
            ├── RecentSessions.jsx
            ├── CreateSessionModal.jsx
            ├── CodeEditorPanel.jsx
            ├── OutputPanel.jsx
            ├── ProblemDescription.jsx
            └── VideoCallUI.jsx
```

---

## Architecture

```
Browser (React SPA)
       │
       │  HTTPS / REST
       ▼
Express Server (Node.js)
       │
       ├──► MongoDB Atlas   (sessions, users)
       ├──► Clerk           (auth token validation)
       ├──► Stream Video    (video call create/join/end)
       ├──► Stream Chat     (messaging channel create/delete)
       └──► Inngest         (background: user sync on webhook)

Code Execution:
Browser ──► Piston Public API (external, no backend proxy)
```

- **Authentication flow:** Clerk issues a JWT on sign-in. `@clerk/express` middleware validates it on every protected request and attaches `req.auth`. The `protectRoute` middleware then resolves the Clerk user to the MongoDB `User` document.
- **User sync:** An Inngest function listens for Clerk's `user.created` webhook event and upserts the user into MongoDB automatically.
- **Video + Chat lifecycle:** On session create, both a Stream Video call and a Stream Chat channel are provisioned with the same `callId`. On session end, both are hard-deleted.

---

## Frontend

### Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/` | `HomePage` | Public (redirects to `/dashboard` if signed in) |
| `/dashboard` | `DashboardPage` | Auth required |
| `/problem` | `ProblemsPage` | Auth required |
| `/problems/:id` | `ProblemPage` | Auth required |
| `/session/:id` | `SessionPage` | Auth required |

### Pages Detail

#### `HomePage`
Landing page with product intro, feature highlights, and Clerk sign-in/sign-up buttons.

#### `DashboardPage`
Shows:
- Welcome section with user info
- Stats cards (sessions hosted, joined, etc.)
- Active sessions list (browse & join)
- Recent completed sessions history
- "Create Session" button that opens a modal

#### `ProblemsPage`
Lists all available coding problems with difficulty badges. Clicking a problem navigates to the full problem page.

#### `ProblemPage`
Full problem view with description, examples, constraints, and an embedded Monaco editor for solo practice with Piston code execution.

#### `SessionPage`
The core interview workspace — a fully resizable three-panel layout:

```
┌─────────────────────────────────┬──────────────────────────────┐
│  Problem Description Panel      │  Video Call / Chat Sidebar   │
│  (scrollable)                   │  (Stream Video + Chat)       │
├─────────────────────────────────┤                              │
│  Code Editor (Monaco)           │                              │
├─────────────────────────────────┤                              │
│  Output Panel                   │                              │
└─────────────────────────────────┴──────────────────────────────┘
```

- Host can end the session via the "End Session" button.
- Participant joins using "Join Session".
- Language selector with multi-language support.
- Code is executed via Piston public API.

---

### Components

| Component | Description |
|---|---|
| `Navbar` | Top navigation with user avatar (Clerk `UserButton`) |
| `WelcomeSection` | Personalized greeting on Dashboard |
| `StatsCards` | Session stat counters |
| `ActiveSessions` | Grid of joinable active interview sessions |
| `RecentSessions` | Table of past completed sessions |
| `CreateSessionModal` | Modal form to pick a problem & difficulty and POST to `/api/sessions` |
| `CodeEditorPanel` | Monaco editor + language selector + Run Code button |
| `OutputPanel` | Displays stdout/stderr from Piston code execution |
| `ProblemDescription` | Renders problem text, examples, and constraints |
| `VideoCallUI` | Stream Video + Chat UI wrapper used inside `SessionPage` |

---

### Hooks

#### `useSessions.js`
React Query hooks wrapping all session API calls:

| Hook | Method | Description |
|---|---|---|
| `useCreateSession` | `POST /api/sessions` | Create a new session |
| `useActiveSessions` | `GET /api/sessions/active` | Fetch all active sessions |
| `useMyRecentSessions` | `GET /api/sessions/my-recent` | Fetch user's past sessions |
| `useSessionsById(id)` | `GET /api/sessions/:id` | Fetch a single session |
| `useJoinSession` | `POST /api/sessions/:id/join` | Join a session as participant |
| `useEndSession` | `POST /api/sessions/:id/end` | End a session (host only) |

#### `useStreamClient.js`
Manages the full Stream Video + Chat lifecycle for a session:
1. Fetches a user token from `GET /api/chat/token`
2. Initializes the Stream Video client and joins the call
3. Connects the Stream Chat client and watches the channel
4. Cleans up on unmount (leaves call, disconnects chat, disconnects video client)

---


## Backend

### API Reference

All routes are prefixed with `/api`. Protected routes require a valid Clerk JWT in the `Authorization: Bearer <token>` header.

---

#### Session Routes — `/api/sessions`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/sessions` | ✅ | Create a new interview session |
| `GET` | `/api/sessions/active` | ✅ | Get all active sessions (max 20) |
| `GET` | `/api/sessions/my-recent` | ✅ | Get current user's completed sessions (max 20) |
| `GET` | `/api/sessions/:id` | ✅ | Get a single session by ID |
| `POST` | `/api/sessions/:id/join` | ✅ | Join a session as participant |
| `POST` | `/api/sessions/:id/end` | ✅ | End a session (host only) |

**`POST /api/sessions`**
```json
// Request body
{ "problem": "Two Sum", "difficulty": "Easy" }

// Response 201
{ "message": "Session created successfully", "sessionId": "..." }
```

**`POST /api/sessions/:id/join`**
```json
// Response 200
{ "session": { ...sessionObject } }
```
_Errors:_ `400` session not found / already completed / host trying to join own session, `409` already has a participant.

**`POST /api/sessions/:id/end`**
```json
// Response 200
{ "session": { ...sessionObject }, "message": "Session ended successfully" }
```
_Errors:_ `403` if caller is not the host, `400` if already completed.

---

#### Chat Routes — `/api/chat`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/chat/token` | ✅ | Get a Stream Chat/Video user token |

**`GET /api/chat/token`**
```json
// Response 200
{
  "token": "stream_user_token",
  "userId": "clerk_user_id",
  "userName": "John Doe",
  "userImage": "https://..."
}
```

---

#### Inngest Route — `/api/inngest`

Handles Clerk webhook events (e.g., `user.created`) to sync new users into MongoDB automatically.

---

#### Health Check

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | ❌ | Returns `{ "message": "Server is healthy" }` |

---

### Data Models

#### `User`

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | String | ✅ | Display name from Clerk |
| `email` | String | ✅ | Unique |
| `profileImage` | String | ❌ | Avatar URL, defaults to `""` |
| `clerkId` | String | ✅ | Unique Clerk user ID |
| `createdAt` | Date | auto | Mongoose timestamps |
| `updatedAt` | Date | auto | Mongoose timestamps |

#### `Session`

| Field | Type | Required | Notes |
|---|---|---|---|
| `problem` | String | ✅ | Problem name/title |
| `difficulty` | String | ✅ | Enum: `"Easy"`, `"Medium"`, `"Hard"` |
| `host` | ObjectId | ✅ | Ref: `User` |
| `participant` | ObjectId | ❌ | Ref: `User`, set when someone joins |
| `status` | String | auto | Enum: `"active"` (default), `"completed"` |
| `callId` | String | auto | Stream Video call ID, unique per session |
| `createdAt` | Date | auto | Mongoose timestamps |
| `updatedAt` | Date | auto | Mongoose timestamps |

---

### Middleware

#### `protectRoute`
Located at `src/middleware/protectRoute.js`. Applied to all session and chat routes.

1. Reads `req.auth` populated by `clerkMiddleware()`.
2. Looks up the corresponding `User` document in MongoDB by `clerkId`.
3. Attaches the full user document to `req.user`.
4. Returns `401` if not authenticated or user not found in DB.



## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- MongoDB Atlas account
- [Clerk](https://clerk.com) account
- [Stream](https://getstream.io) account
- [Inngest](https://inngest.com) account

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/remote-interview-platform.git
cd remote-interview-platform

# 2. Install root dependencies
npm install

```

### Running Locally

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

The project is deployed as a **monorepo on Render** using a single web service.

### Build Command
```bash
npm run build
```
_(Defined in root `package.json` — installs backend deps, builds frontend with Vite, outputs to `frontend/dist`)_

### Start Command
```bash
node backend/src/server.js
```
## License

MIT
