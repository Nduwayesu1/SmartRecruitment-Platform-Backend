# Smart Recruitment Platform

A full-stack recruitment platform built with Node.js, Express, TypeScript, MongoDB. Features user authentication, profile management, resume upload/PDF parsing with AI analysis (OpenAI), admin dashboard, email notifications, Cloudinary storage, Swagger API docs.

## 🚀 Quick Start

1. Clone the repo:
   ```
   git clone <repo-url>
   cd SmartRecruitmentPlatform
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Copy and configure environment variables:
   ```
   cp .env.example .env
   ```
   Edit `.env` with your values (see Environment Variables below).

4. Seed admin user (optional):
   ```
   npm run seed
   ```

5. Run in development:
   ```
   npm run dev
   ```
   Server starts on `http://localhost:3000`

6. Build and production start:
   ```
   npm run build
   npm start
   ```

## 📋 Scripts

- `npm run dev` - Dev server with tsx watch/reload
- `npm run build` - TypeScript build to dist/
- `npm start` - Production server
- `npm run seed` - Seed default admin user

## 🗂️ Project Structure

```
SmartRecruitmentPlatform/
├── src/
│   ├── app.ts              # Express app setup
│   ├── server.ts           # Entry point (DB connect + server start)
│   ├── config/             # DB, Cloudinary, email, Swagger
│   ├── controllers/        # Auth, user logic
│   ├── middleware/         # Auth, multer upload
│   ├── models/             # Mongoose schemas (User)
│   ├── routes/             # Auth, user, admin routes
│   └── service/            # (NLP/AI services?)
├── scripts/
│   └── seedAdmin.ts        # Admin seeder
├── .env.example            # Env template
├── package.json
├── tsconfig.json
└── README.md
```

## 📖 API Documentation

Interactive Swagger UI at `http://localhost:3000/api-docs`

- Auth: `/api/auth/register`, `/api/auth/login`
- User: `/api/users/profile`, `/api/users/resume-upload`
- Admin: Dashboard routes

## 🔑 Environment Variables

Create `.env` from `.env.example`:

```
MONGO_URI=mongodb://localhost:27017/recruitmentdb
JWT_SECRET=your-super-secret-jwt-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-admin-pass

# Cloudinary (for resume images/files)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Email (nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-password

# OpenAI (AI resume analysis?)
OPENAI_API_KEY=sk-...

PORT=3000
```

## ✨ Features

- JWT Authentication & Authorization
- User CRUD, profile/resume upload (PDF parse, Cloudinary)
- Admin panel
- Email notifications
- Swagger/OpenAPI docs
- NLP (natural), OpenAI integration for resume scoring
- TypeScript, ESM modules

## 📝 TODOs & Previous Tasks

Completed tasks tracked in:
- [TODO.md](TODO.md) - MongoDB fixes
- [TODO-DB-Fix.md](TODO-DB-Fix.md)
- [TODO-UserSupport.md](TODO-UserSupport.md)

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **DB**: MongoDB (Mongoose)
- **Auth**: JWT, bcryptjs
- **File Upload**: Multer, Cloudinary
- **Email**: Nodemailer
- **PDF**: pdf-parse, mammoth
- **AI/NLP**: OpenAI, natural
- **Docs**: Swagger
- **Dev**: tsx, tsc

## 🤝 Contributing

1. Fork & clone
2. `npm install`
3. Create feature branch
4. `npm run dev` for testing
5. PR to main

## 📄 License

MIT

