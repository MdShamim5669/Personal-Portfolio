# 🖥️ Server Folder Structure Guide

Detailed architectural documentation for the Express.js + Prisma ORM + PostgreSQL backend located in `/server`.

---

## 📂 Directory Tree Layout

```text
server/
├── prisma/
│   ├── schema.prisma           # Prisma Data Schema & Database Enums
│   └── seed.js                 # Seeding script populating PostgreSQL from Docs/cv_data.json
│
├── src/
│   ├── config/                 # Service & Database Initializations
│   │   ├── db.js               # PrismaClient instance export
│   │   └── cloudinary.js       # Cloudinary SDK v2 configuration
│   │
│   ├── controllers/            # Controller layer containing route handlers
│   │   ├── authController.js   # Admin Login, Token refresh, Current User Info
│   │   ├── profileController.js# Profile GET & UPDATE (Bio, CGPA, Resume URL)
│   │   ├── projectController.js# Projects GET (public), POST/PUT/DELETE (admin)
│   │   ├── skillController.js  # Skills GET (public), POST/PUT/DELETE (admin)
│   │   ├── thesisController.js # Research Thesis GET (public), POST/PUT/DELETE (admin)
│   │   ├── courseController.js # Udemy Courses GET (public), POST/PUT/DELETE (admin)
│   │   ├── experienceController.js # Experience Timeline GET (public), POST/PUT/DELETE (admin)
│   │   ├── messageController.js# Contact form POST (public), Inbox GET/DELETE (admin)
│   │   └── uploadController.js # File/Image/Video Upload handler to Cloudinary
│   │
│   ├── middlewares/            # Express Middleware functions
│   │   ├── authMiddleware.js   # JWT authentication & requireAdmin role guard
│   │   ├── uploadMiddleware.js # Multer memory storage file extractor
│   │   └── errorHandler.js     # Standardized JSON error response handler
│   │
│   ├── routes/                 # REST API Endpoint Routers
│   │   ├── authRoutes.js       # /api/auth
│   │   ├── profileRoutes.js    # /api/profile
│   │   ├── projectRoutes.js    # /api/projects
│   │   ├── skillRoutes.js      # /api/skills
│   │   ├── thesisRoutes.js     # /api/thesis
│   │   ├── courseRoutes.js     # /api/courses
│   │   ├── experienceRoutes.js # /api/experience
│   │   ├── messageRoutes.js    # /api/messages
│   │   └── uploadRoutes.js     # /api/upload
│   │
│   ├── utils/                  # Helper Utilities
│   │   ├── apiResponse.js      # Standardized JSON response envelope generator
│   │   └── seedHelper.js       # Data parsing helper for JSON CV content
│   │
│   └── server.js               # Main Express application server bootstrap file
│
├── .env.example                # Template for server environment variables
├── package.json                # Dependencies and script definitions
└── jsconfig.json               # Path aliases configuration
```

---

## 🛠️ Key Module Explanations

### 1. Prisma Layer (`server/prisma/`)
- `schema.prisma`: Configures PostgreSQL provider and defines all model schema entities (`User`, `Profile`, `Skill`, `Project`, `Experience`, `Course`, `Thesis`, `Message`).
- `seed.js`: Node.js script executed via `npm run seed`. Reads `Docs/cv_data.json` and populates initial portfolio data into PostgreSQL tables using Prisma transactions.

### 2. Controllers (`server/src/controllers/`)
Each controller module implements clean error handling with try-catch blocks and standardized response outputs:
- **`authController.js`**: Validates admin email and password against hashed database records using `bcryptjs`. Generates signed JWT tokens.
- **`projectController.js`**: Handles listing projects with optional category filtering for public visitors, and handles creation, updating, and deletion for Admin users.
- **`uploadController.js`**: Receives binary files via Multer memory buffer and streams them to Cloudinary storage buckets. Returns secure CDN URLs.

### 3. Middlewares (`server/src/middlewares/`)
- **`authMiddleware.js`**:
  - `verifyToken`: Extracts `Authorization: Bearer <token>` header, verifies signature with `JWT_SECRET`, and attaches decoded user to `req.user`.
  - `requireAdmin`: Checks if `req.user.role === 'ADMIN'`. Responds with `403 Forbidden` if user is a viewer or unauthenticated.
- **`uploadMiddleware.js`**: Configures Multer to store uploaded file buffers in RAM prior to Cloudinary streaming.

### 4. Application Bootstrap (`server/src/server.js`)
- Configures CORS options allowing cross-origin requests from the React client.
- Registers JSON and URL-encoded body parsers.
- Mounts API router endpoints under `/api`.
- Sets up global error handling and 404 fallbacks.

---

## 🔗 Related Documentation Files
- [Main Project README](file:///e:/Project/Personal%20Portfolio/README.md)
- [Client Folder Details](file:///e:/Project/Personal%20Portfolio/Docs/client_folder_structure.md)
- [Database Schema Guide](file:///e:/Project/Personal%20Portfolio/Docs/database_schema.md)
- [REST API Reference](file:///e:/Project/Personal%20Portfolio/Docs/api_documentation.md)
