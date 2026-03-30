# SmartRecruitment Platform - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-red.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green.svg)](https://mongodb.com/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-yellow.svg)](https://swagger.io/)

## 🚀 Overview

**SmartRecruitment Platform** is a modern, scalable backend API for AI-powered recruitment solutions. It enables:

- **User Management**: Registration, login (JWT), profile updates
- **Admin Panel**: Full user oversight and management
- **Resume Processing**: PDF uploads (Multer/Cloudinary), parsing (pdf-parse), NLP analysis (Natural/OpenAI)
- **Email Integration**: Nodemailer for notifications
- **API Documentation**: Interactive Swagger UI

Built with TypeScript, Express, MongoDB. Production-ready with error handling and CORS.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Runtime | Node.js 20+, TypeScript 5+ |
| Framework | Express 5 |
| Database | MongoDB (Mongoose 8+) |
| Auth | JWT, bcrypt |
| File Upload | Multer, Cloudinary |
| AI/NLP | OpenAI API, Natural |
| Docs | Swagger/OpenAPI |
| Email | Nodemailer |
| Others | dotenv, CORS, lodash, uuid |

## 📋 Prerequisites

1. **Node.js** >= 20
2. **MongoDB** (local or Atlas)
3. Accounts:
   - [Cloudinary](https://cloudinary.com) (file uploads)
   - [OpenAI API Key](https://platform.openai.com)
   - SMTP (Gmail/Outlook for emails)

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repo-url>
cd SmartRecruitmentPlatform
npm install
```

### 2. Environment Setup
Create `.env` file in root:
```env
# Server
PORT=3000
NODE_ENV=development

# Database (MongoDB Atlas recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recruitment_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Admin (auto-seeded)
ADMIN_EMAIL=admin@smartrecruit.com
ADMIN_PASSWORD=Admin@Pass123!
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=System

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenAI
OPENAI_API_KEY=sk-your-openai-key

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Tip**: Admin auto-creates on first `npm run dev`!

### 3. Development Mode
```bash
npm run dev
```
- Hot reload via `tsx watch`
- Access: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api-docs
- **Health**: http://localhost:3000/health

### 4. Production Build
```bash
npm run build  # tsc -> dist/
npm run start  # node dist/server.js
```

### 5. Seed Admin **Securely**
```bash
# 1. Copy .env.example → .env
# 2. Edit ADMIN_* vars (generate strong pw!)
# 3. Run (no pw exposure)
npm run seed
```

**Note**: Only runs if ADMIN_EMAIL not exists, updates otherwise. Logs safe.


## 📁 Project Structure
```
SmartRecruitmentPlatform/
├── src/
│   ├── app.ts              # Express app setup
│   ├── server.ts           # Server entry
│   ├── config/             # DB, Swagger, Cloudinary, Email
│   ├── controllers/        # Auth, User logic
│   ├── middleware/         # Auth, Multer
│   ├── models/             # User schema
│   └── routes/             # API routes
├── scripts/                # seedAdmin.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🔗 API Endpoints (Swagger)
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Users**: `/api/users/profile`, `/api/users/resume`
- **Admin**: `/api/admin/users`, `/api/admin/analytics`

Full docs at `/api-docs`.

## 🧪 Testing
```bash
# Health check
curl http://localhost:3000/health

# Swagger ready when server logs "Server running..."
```

## 🔧 Troubleshooting
- **DB Connection**: Verify `MONGODB_URI`, run `npm run dev`
- **Cloudinary Errors**: Check creds, upload limits
- **JWT Issues**: Regenerate `JWT_SECRET`
- **Port Busy**: Change `PORT` in .env

See TODO files for ongoing tasks:
- [TODO-DB-Fix.md]
- [TODO-Documentation.md]
- [TODO-UserSupport.md]

## 🤝 Contributing
1. Fork & PR
2. Follow TypeScript strict mode
3. Update Swagger for new endpoints

## 📄 License
MIT - see LICENSE (add if needed)

---

**Built with ❤️ for smart hiring!** 🚀

