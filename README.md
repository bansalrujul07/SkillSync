# SkillSync — Service Marketplace

SkillSync is a web-based service marketplace that connects people offering services with people looking for them. Users can publish services, discover available listings, submit service requests, manage incoming requests, and communicate through request-based real-time chat.

## Problem Statement

Finding suitable services and coordinating with service providers can involve scattered information and disconnected communication. SkillSync brings service discovery, request management, and communication together in one application.

## Target Users

- **Service providers:** People who want to publish their services and manage requests from potential customers.
- **Service seekers:** People who want to browse services, request them, and communicate with providers.

## Key Features

- **Authentication:** Register, log in, access protected routes, and log out.
- **Service listings:** Browse available services, view service details, and create service listings.
- **Service management:** View your own listings.
- **Service requests:** Submit requests for services and manage incoming requests.
- **Request status management:** Update the status of a service request.
- **Dashboard:** Access a summary of marketplace activity.
- **Real-time chat:** Exchange messages associated with service requests.
- **Persistent data:** Store users, services, requests, and messages in MongoDB.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Routing | React Router |
| API communication | Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens, HTTP-only cookies, bcryptjs |
| Real-time communication | Socket.IO |
| Deployment | Vercel (frontend), Render (backend) |

## Architecture

SkillSync uses a frontend/backend architecture.

1. The React frontend provides the user interface and communicates with the backend through HTTP API requests.
2. The Express backend handles authentication, service listings, service requests, dashboards, and message history.
3. MongoDB stores application data through Mongoose models.
4. Protected API routes use authentication middleware to identify logged-in users.
5. Socket.IO provides real-time messaging. The backend authenticates socket connections and checks service-request access before allowing users to join a chat or send messages.

### Main API Routes

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register an account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Retrieve the current authenticated user |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/services` | Browse service listings |
| GET | `/api/services/:id` | Retrieve service details |
| GET | `/api/services/mine` | Retrieve your own services (protected) |
| POST | `/api/services` | Create a service listing (protected) |
| GET | `/api/service-requests` | Retrieve incoming requests (protected) |
| POST | `/api/service-requests/:serviceId` | Request a service (protected) |
| PATCH | `/api/service-requests/:requestId/status` | Update a request's status (protected) |
| GET | `/api/dashboard/summary` | Retrieve dashboard summary (protected) |
| GET | `/api/messages/:requestId` | Retrieve messages for a request (protected) |

Real-time chat events are handled through Socket.IO.

## Local Setup

### Prerequisites

- Node.js and npm
- A MongoDB database, such as a MongoDB Atlas cluster
- Git

### 1. Clone the repository

```bash
git clone https://github.com/bansalrujul07/SkillSync.git
cd SkillSync
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=8081
db_url=your_mongodb_connection_string
jwt_secret=your_long_random_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Use your own MongoDB connection string and a strong, private JWT secret. Never commit real credentials to GitHub.

### 3. Start the backend

From the `backend` directory, run:

```bash
npm run dev
```

The backend uses port `8081` by default.

### 4. Configure the frontend

Open a second terminal at the repository root:

```bash
cd frontend/frontend
npm install
```

Create a `.env` file inside `frontend/frontend`:

```env
VITE_API_URL=http://localhost:8081
```

The frontend API client uses this value as the backend base URL and appends `/api` to it.

### 5. Start the frontend

From `frontend/frontend`, run:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Keep both the backend and frontend running while using the local application.

## Environment Variables

| Variable | Location | Purpose |
|---|---|---|
| `PORT` | Backend | Backend port; defaults to `8081` |
| `db_url` | Backend | MongoDB connection string |
| `DB_URL` | Backend, if configured in the application | Alternative database variable supported by the connection code |
| `jwt_secret` | Backend | Secret used to sign and verify authentication tokens |
| `NODE_ENV` | Backend | Runtime environment |
| `CLIENT_URL` | Backend | Frontend origin configuration |
| `VITE_API_URL` | Frontend | Backend base URL, without the `/api` suffix |

Use environment variables in the deployment dashboard for production. Do not expose database credentials or JWT secrets in frontend variables or commit them to the repository.

## Deployment

- **Frontend:** Deployed on Vercel.
- **Backend:** Deployed on Render.
- **Database:** MongoDB Atlas.

Production deployments require the correct frontend API URL, backend environment variables, database access configuration, and compatible CORS and cookie settings.

## Project Structure

```text
SkillSync/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
└── frontend/
    └── frontend/
        └── src/
            ├── api/
            ├── components/
            ├── pages/
            ├── App.jsx
            └── main.jsx
```

## Future Improvements

- Add automated tests for authentication, service requests, and chat permissions.
- Improve validation and error handling across API endpoints.
- Add more detailed filtering and discovery options for services.
- Improve monitoring and reliability for production deployments.

## Demo Video

Watch the SkillSync project demonstration:

[**View SkillSync Demo Video on Google Drive**](https://drive.google.com/file/d/17etWldH52z-ZEcB02Ya7AqLaYdVsOTA2/view?usp=sharing)


## Live Application

- **Frontend:** https://skill-sync-ps9m83v7s-bansalrujul07s-projects.vercel.app
- **Backend:** https://skillsync-backend-4raz.onrender.com
- **Source Code:** https://github.com/bansalrujul07/SkillSync

