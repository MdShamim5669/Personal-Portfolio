# 📁 Overall Project Structure Guide

This document outlines the complete directory layout and organizational architecture of **Md. Samim's Full-Stack Dynamic Personal Portfolio Application**.

---

## 🏗️ Monorepo Architecture Overview

The workspace is organized into three primary operational pillars:
1. **`client/`**: React.js SPA (Single Page Application) with Tailwind CSS, Shadcn UI components, dynamic Recharts visualization, and an integrated Admin CMS Dashboard.
2. **`server/`**: Express.js REST API server with Prisma ORM, PostgreSQL integration, JWT authentication, Role-Based Access Control (RBAC), and Cloudinary file streaming.
3. **`Docs/`**: Technical documentation, directory guides, database ERD definitions, API contracts, setup guides, and raw CV datasets.

---

## 🌳 Workspace Tree

```text
Personal Portfolio/
│
├── README.md                           # Main repository overview & quick-start guide
│
├── Docs/                               # Project Documentation Directory
│   ├── project_structure.md            # Overall project structure & layout (This file)
│   ├── instruction.md                  # Comprehensive setup, installation & deployment instructions
│   ├── server_folder_structure.md      # Detailed breakdown of backend modules & files
│   ├── client_folder_structure.md      # Detailed breakdown of frontend modules & files
│   ├── database_schema.md              # Prisma ORM schema, entities & ERD definitions
│   ├── api_documentation.md            # Full REST API endpoints reference & RBAC specifications
│   ├── cv_data.json                    # Extracted raw CV data prepared for database seeding
│   └── CV_Shamim.pdf                   # Original CV source file
│
├── server/                             # Express.js REST API Backend
│   ├── prisma/                         # Prisma ORM Configurations
│   │   ├── schema.prisma               # PostgreSQL Schema Definition
│   │   └── seed.js                     # Seed script populating DB from cv_data.json
│   ├── src/
│   │   ├── config/                     # Environment, Prisma & Cloudinary configurations
│   │   │   ├── db.js                   # Prisma Client Singleton
│   │   │   └── cloudinary.js           # Cloudinary SDK setup
│   │   ├── controllers/                # Request handling business logic
│   │   │   ├── authController.js       # Admin Login & Token generation
│   │   │   ├── profileController.js    # Profile bio & resume management
│   │   │   ├── projectController.js    # Projects CRUD
│   │   │   ├── skillController.js      # Skills & categories CRUD
│   │   │   ├── thesisController.js     # Research & thesis CRUD
│   │   │   ├── courseController.js     # Udemy courses CRUD
│   │   │   ├── experienceController.js # Work history CRUD
│   │   │   ├── messageController.js    # Contact submissions & inbox
│   │   │   └── uploadController.js     # Cloudinary media stream uploads
│   │   ├── middlewares/                # Custom express middlewares
│   │   │   ├── authMiddleware.js       # JWT validation & requireAdmin guard
│   │   │   ├── uploadMiddleware.js     # Multer memory storage parser
│   │   │   └── errorHandler.js       # Global error handler
│   │   ├── routes/                     # REST API Routing table
│   │   │   ├── authRoutes.js
│   │   │   ├── profileRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   ├── skillRoutes.js
│   │   │   ├── thesisRoutes.js
│   │   │   ├── courseRoutes.js
│   │   │   ├── experienceRoutes.js
│   │   │   ├── messageRoutes.js
│   │   │   └── uploadRoutes.js
│   │   ├── utils/                      # Helper functions & response formatters
│   │   └── server.js                   # Express application entry point
│   ├── .env.example                    # Sample backend environment variables
│   ├── package.json                    # Backend Node dependencies & scripts
│   └── jsconfig.json                   # Path alias mappings
│
└── client/                             # React Frontend & Admin Portal
    ├── public/                         # Static public assets, favicons, logos
    ├── src/
    │   ├── assets/                     # Images, icons, static data
    │   ├── components/                 # Reusable UI & Layout Components
    │   │   ├── common/                 # Navbar, Footer, Loading Spanners, Modals
    │   │   ├── ui/                     # Shadcn UI primitives (Button, Card, Input, Dialog, Toast)
    │   │   ├── home/                   # Hero, About, SkillCharts, ProjectGrid, ThesisCard, ExperienceTimeline
    │   │   └── admin/                  # Admin Dashboard, ProjectForm, SkillForm, MessageInbox, MediaManager
    │   ├── context/                    # React Contexts (AuthContext, ThemeContext)
    │   ├── hooks/                      # Custom hooks (useAuth, useFetch, useToast)
    │   ├── pages/                      # Page Views
    │   │   ├── HomePage.jsx            # Main Public Portfolio Page
    │   │   ├── AdminLoginPage.jsx      # Admin Authentication Page
    │   │   └── AdminDashboardPage.jsx  # Protected Admin Control Panel
    │   ├── services/                   # Axios API service instances
    │   │   ├── api.js                  # Base Axios instance with auth headers
    │   │   └── portfolioService.js     # Endpoint helper calls
    │   ├── App.jsx                     # Route definitions & app providers
    │   ├── main.jsx                    # React DOM entry point
    │   └── index.css                   # Tailwind CSS global setup & variables
    ├── .env.example                    # Sample frontend environment variables
    ├── index.html                      # HTML entry template
    ├── tailwind.config.js              # Tailwind styling customization
    ├── vite.config.js                  # Vite configuration & dev server options
    └── package.json                    # Frontend Node dependencies & scripts
```

---

## 🎯 Architecture Responsibilities

### 1. Separation of Concerns
- The **Backend (`/server`)** operates statelessly. It handles database persistence via Prisma, validates input schemas, guards protected endpoints using JWT middleware, and interfaces with Cloudinary for file hosting.
- The **Frontend (`/client`)** handles client-side routing, user interface rendering, chart data visualization (Recharts), micro-animations (Framer Motion), interactive forms, and toast notifications (Sonner).

### 2. Security Model
- **Viewer Role**: Unauthenticated guests can view public portfolio data (Profile, Projects, Skills, Research, Courses) and post messages via `/api/messages`.
- **Admin Role**: Admin users log in via `/api/auth/login` to obtain a JWT token. Protected CRUD endpoints (`POST`, `PUT`, `DELETE`) require a valid `Bearer <TOKEN>` with `role === 'ADMIN'`.

---

## 🔗 Related Documentation Files
- [Step-by-Step Setup Instructions](file:///e:/Project/Personal%20Portfolio/Docs/instruction.md)
- [Server Folder Structure](file:///e:/Project/Personal%20Portfolio/Docs/server_folder_structure.md)
- [Client Folder Structure](file:///e:/Project/Personal%20Portfolio/Docs/client_folder_structure.md)
- [Database Schema Guide](file:///e:/Project/Personal%20Portfolio/Docs/database_schema.md)
- [REST API Reference](file:///e:/Project/Personal%20Portfolio/Docs/api_documentation.md)
