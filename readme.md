# Task & Keep API - Express + MongoDB

This is a backend REST API built with Express, TypeScript, MongoDB, and Passport.js (Google OAuth).

## 🔧 Features

- User authentication with Google using Passport.js
- Task management (CRUD)
- Keep (notes) management (CRUD)
- User-specific data with session-based auth

## 📁 Project Structure

```
├── controllers/
├── models/
├── routes/
├── middlewares/
├── app.ts
├── server.ts
```

## 🌐 Routes Overview

- `/auth/google`
- `/auth/google/callback`
- `/auth/logout`
- `/user` (Get logged-in user)
- `/tasks` (CRUD)
- `/keeps` (CRUD)
