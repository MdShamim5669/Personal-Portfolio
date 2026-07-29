# 📖 Comprehensive Setup & Operating Instructions

This document provides step-by-step instructions for installing, configuring, running, seeding, and deploying **Md. Samim's Dynamic Personal Portfolio & Admin Portal**.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Environment Configuration](#2-environment-configuration)
3. [Database & Prisma Setup](#3-database--prisma-setup)
4. [Cloudinary Integration Setup](#4-cloudinary-integration-setup)
5. [Backend Installation & Execution](#5-backend-installation--execution)
6. [Frontend Installation & Execution](#6-frontend-installation--execution)
7. [Admin User & Role-Based Access Control](#7-admin-user--role-based-access-control)
8. [Production Build & Deployment](#8-production-build--deployment)

---

## 1. Prerequisites

Before installing the project, ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (Download: https://nodejs.org/)
- **npm**: `v9.0.0` or higher
- **PostgreSQL**: Local PostgreSQL installation (e.g. v14+) OR a cloud PostgreSQL instance from services like [Supabase](https://supabase.com/), [Neon.tech](https://neon.tech/), or [Render](https://render.com/).
- **Cloudinary Account**: Free account for storing portfolio images, video previews, and PDFs (Register: https://cloudinary.com/).

---

## 2. Environment Configuration

### Backend Environment Variables (`/server/.env`)
Create a file named `.env` inside the `server/` directory:

```env
# Server Port & Node Env
PORT=5000
NODE_ENV=development

# PostgreSQL Database Connection URL (Prisma)
# Example for Local DB: postgresql://postgres:password@localhost:5432/samim_portfolio?schema=public
# Example for Cloud DB: postgresql://username:password@ep-sample-123456.us-east-1.aws.neon.tech/samim_portfolio?sslmode=require
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/samim_portfolio?schema=public"

# JWT Authentication Secret
JWT_SECRET="super_secret_jwt_key_samim_portfolio_2026_xyz"
JWT_EXPIRES_IN="7d"

# Cloudinary Credentials (For Media & File Uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Admin Initial Credentials (Used during seeding)
ADMIN_NAME="Md. Samim"
ADMIN_EMAIL="tamjidulislamsamim@gmail.com"
ADMIN_PASSWORD="AdminSecurePassword123!"

# CORS Allowed Origin
CLIENT_URL="http://localhost:5173"
```

### Frontend Environment Variables (`/client/.env`)
Create a file named `.env` inside the `client/` directory:

```env
# Backend API Base URL
VITE_API_BASE_URL="http://localhost:5000/api"
```

---

## 3. Database & Prisma Setup

1. **Open terminal inside the `server/` directory**:
   ```bash
   cd server
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Run Prisma Database Migrations**:
   This command applies the PostgreSQL schema defined in `prisma/schema.prisma` and creates all necessary tables (`User`, `Profile`, `Skill`, `Project`, `Experience`, `Course`, `Thesis`, `Message`).
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed Database with Initial CV Data**:
   This populates the database using `Docs/cv_data.json` and creates the default Admin account.
   ```bash
   npm run seed
   ```

5. **(Optional) Open Prisma Studio**:
   To visually inspect and edit database records in your web browser:
   ```bash
   npx prisma studio
   ```

---

## 4. Cloudinary Integration Setup

1. Log into your [Cloudinary Console](https://console.cloudinary.com/).
2. Copy your **Cloud Name**, **API Key**, and **API Secret** from the dashboard.
3. Paste these values into `server/.env`.
4. Cloudinary is automatically initialized by `server/src/config/cloudinary.js`.
5. The Admin Dashboard includes a drag-and-drop file upload component that sends images, videos, and PDFs directly to Cloudinary via `POST /api/upload` and returns public secure URLs to embed in portfolio items.

---

## 5. Backend Installation & Execution

```bash
# Navigate to server directory
cd server

# Install dependencies (if not already done)
npm install

# Start Backend in Development Mode (Nodemon auto-reload)
npm run dev

# Server will run at http://localhost:5000
```

---

## 6. Frontend Installation & Execution

```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Start Frontend Vite Server
npm run dev

# Frontend app will run at http://localhost:5173
```

---

## 7. Admin User & Role-Based Access Control

### Role Permissions

| Action | Viewer / Guest | Admin |
|---|---|---|
| View Profile, Bio & Skills | ✅ Yes | ✅ Yes |
| View Projects & Research Thesis | ✅ Yes | ✅ Yes |
| View Udemy Courses & Timeline | ✅ Yes | ✅ Yes |
| Submit Contact Message | ✅ Yes | ✅ Yes |
| Create / Edit / Delete Projects | ❌ Restricted (403) | ✅ Yes |
| Create / Edit / Delete Skills & Thesis | ❌ Restricted (403) | ✅ Yes |
| View Received Messages Inbox | ❌ Restricted (403) | ✅ Yes |
| Upload Images/Videos via Cloudinary | ❌ Restricted (403) | ✅ Yes |

### How to Access Admin Panel
1. Open frontend in browser: `http://localhost:5173`.
2. Click the **"Admin Portal"** button in the footer or navigate directly to `http://localhost:5173/admin/login`.
3. Use the credentials configured in `.env` (or default seeded credentials):
   - **Email**: `tamjidulislamsamim@gmail.com`
   - **Password**: `AdminSecurePassword123!`
4. Upon successful login, a JWT token is stored in `localStorage`, giving you full access to the Admin Dashboard CRUD features.

---

## 8. Production Build & Deployment

### Building Backend
The Express server can be deployed directly to platforms like **Render**, **Railway**, **Vercel**, or **AWS EC2**.
- Set production environment variables in your hosting provider configuration.
- Run `npx prisma migrate deploy` in your production build script.

### Building Frontend
To generate an optimized production bundle:
```bash
cd client
npm run build
```
The output files will be generated in `client/dist/`. This static folder can be hosted on **Vercel**, **Netlify**, **Cloudflare Pages**, or served by the Express backend.

---

## 🔗 Additional References
- [Project Directory Architecture](file:///e:/Project/Personal%20Portfolio/Docs/project_structure.md)
- [Server Folder Details](file:///e:/Project/Personal%20Portfolio/Docs/server_folder_structure.md)
- [Client Folder Details](file:///e:/Project/Personal%20Portfolio/Docs/client_folder_structure.md)
- [Database Schema Guide](file:///e:/Project/Personal%20Portfolio/Docs/database_schema.md)
- [REST API Reference](file:///e:/Project/Personal%20Portfolio/Docs/api_documentation.md)
