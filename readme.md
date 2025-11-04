## AWDQuiz – Full-Stack Auth (Registration, Login, Dashboard)

This project implements client-side and server-side validation for Registration and Login, saves users in MongoDB, issues JWTs on successful login, and protects a Dashboard page. The UI is consistent with your existing design and includes light/dark theme support.
### How to Run
Run these two processes (server and client) in two terminals.

```bash
# Terminal 1 – Backend API
cd server
npm install
npm run dev

# Terminal 2 – Frontend
cd client
npm install
npm run dev
```

Then open the Vite URL shown in the terminal (commonly `http://localhost:5173`). The server runs on `http://localhost:5000`.

### What’s included
- **Client**: React + Vite, pages for Landing, Signup, Login, Dashboard, and a `ProtectedRoute` guard. Axios interceptor attaches JWT automatically.
- **Server**: Express + MongoDB + JWT + bcrypt. Endpoints for `register`, `login`, and a protected `dashboard` route.
- **No .env required**: The server has safe defaults for `MONGO_URI`, `JWT_SECRET`, and `PORT`. You can still add a `.env` if you want custom values.


### Optional: .env (if you want custom values)
Create `server/.env` (not required by default):

```bash
MONGO_URI=mongodb://127.0.0.1:27017
JWT_SECRET=super_secret_quiz_key
PORT=5000
```

### Features (Quiz Requirements)
- **Client-side validation (Signup & Login)**
  - Signup: full name (min 3 chars), valid email, password (min 6), matching confirm password.
  - Login: valid email format, password length check.
- **Server-side validation**
  - Signup: required fields, name length, email format, unique email, password length.
  - Login: required fields, user existence, password match.
- **Saving to Database**
  - Users saved in MongoDB (`quizdb.users`) with hashed password.
- **Redirects**
  - Signup success → Login page.
  - Login success → Dashboard.
- **JWT & Protected Routes**
  - Server issues JWT on login; client stores token in LocalStorage.
  - Axios interceptor adds `Authorization: Bearer <token>` automatically.
  - Protected `dashboard` endpoint validates JWT and returns user + sample protected data.
- **Dashboard Guard & Logout**
  - `ProtectedRoute` blocks access when not authenticated (no token).
  - Dashboard fetches protected data; Logout clears token and returns to Login.

### API Endpoints
- `POST /api/auth/register`
  - Body: `{ name, email, password }`
  - Responses: `201 Created` on success; `400` on validation; `500` on server error.
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Responses: `200` with `{ token, user, dashboard }`; `401` incorrect credentials; `400/500` on errors.
- `GET /api/auth/dashboard`
  - Header: `Authorization: Bearer <token>`
  - Responses: `200` with `{ message, data, lastLogin, activeTasks, subscriptionStatus }`; `401/404/500` otherwise.

### Directory Structure (simplified)
```text
AWDQuiz/
  client/            # React app (Vite)
    src/
      contexts/
        AuthContext.jsx  # token storage + axios interceptor + session check
      pages/
        Auth/
          Signup.jsx     # client-side validation + register
          Login.jsx      # client-side validation + login
        Dashboard/
          Dashboard.jsx  # protected fetch + logout
      App.jsx            # routes + ProtectedRoute
  server/
    server.js          # Express API (register/login/dashboard)
    package.json
README.md
```

### How to Self-Test
1. Register a new user → verify success redirect to Login.
2. Login with the same email/password → you should land on Dashboard.
3. Check MongoDB – the user should be saved with hashed password.
4. Copy the Dashboard URL, open in a different browser/profile → it should redirect to Login (no token).

### Troubleshooting
- If the server can’t connect to MongoDB, ensure MongoDB is running locally, or set `MONGO_URI` in `server/.env` to a valid connection string.
- If the Dashboard shows 401/Invalid token, log out and log in again (token may be expired/invalidated).
- If ports are busy, change `PORT` in `server/.env`, and ensure client calls `http://localhost:<your-port>/api/auth`.
How to run

1) Server
- cd server
- npm install
- npm run dev

2) Client
- cd client
- npm install
- npm run dev

Notes
- Server runs on http://localhost:5000
- Frontend runs on the Vite URL shown (commonly http://localhost:5173)
- MongoDB should be running locally (defaults to mongodb://127.0.0.1:27017)

Features
- Registration with client-side validation
- Registration with server-side validation and DB save (MongoDB)
- Redirect to Login after successful registration
- Login with client-side validation
- Login with server-side validation and credential check
- JWT issued on login and stored in LocalStorage
- Protected Dashboard fetch using the token
- Dashboard shows user data and protected data
- Direct Dashboard access without token redirects to Login
- Logout clears token and redirects to Login


