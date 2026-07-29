# 🔌 REST API Specification & Endpoint Documentation

Full API reference for **Md. Samim's Dynamic Personal Portfolio Backend**.

---

## 🌐 Base URL
- **Local Development**: `http://localhost:5000/api`
- **Production**: `https://your-portfolio-backend.onrender.com/api`

---

## 🔑 Authentication & Headers

Protected endpoints require a JWT bearer token passed in the `Authorization` header:
```text
Authorization: Bearer <YOUR_JWT_ADMIN_TOKEN>
Content-Type: application/json
```

---

## 📑 Endpoints Summary Table

| Category | Endpoint | Method | Role Required | Description |
|---|---|---|---|---|
| **Auth** | `/api/auth/login` | `POST` | Public | Admin login & JWT token retrieval |
| **Auth** | `/api/auth/me` | `GET` | Admin | Get authenticated user info |
| **Profile** | `/api/profile` | `GET` | Public | Fetch profile info & bio |
| **Profile** | `/api/profile` | `PUT` | Admin | Update profile bio & URLs |
| **Skills** | `/api/skills` | `GET` | Public | Fetch grouped skills by category |
| **Skills** | `/api/skills` | `POST` | Admin | Create a new skill item |
| **Skills** | `/api/skills/:id` | `PUT` | Admin | Update skill details |
| **Skills** | `/api/skills/:id` | `DELETE` | Admin | Delete a skill |
| **Projects** | `/api/projects` | `GET` | Public | List portfolio projects |
| **Projects** | `/api/projects` | `POST` | Admin | Add a new project |
| **Projects** | `/api/projects/:id` | `PUT` | Admin | Update existing project |
| **Projects** | `/api/projects/:id` | `DELETE` | Admin | Delete a project |
| **Thesis** | `/api/thesis` | `GET` | Public | Fetch research thesis data |
| **Thesis** | `/api/thesis` | `POST` | Admin | Add/update thesis details |
| **Courses** | `/api/courses` | `GET` | Public | List Udemy courses |
| **Courses** | `/api/courses` | `POST` | Admin | Create a new course record |
| **Courses** | `/api/courses/:id` | `DELETE` | Admin | Delete a course record |
| **Experience**| `/api/experience` | `GET` | Public | Fetch work experience timeline |
| **Experience**| `/api/experience` | `POST` | Admin | Add work experience entry |
| **Messages** | `/api/messages` | `POST` | Public | Send message via contact form |
| **Messages** | `/api/messages` | `GET` | Admin | View received contact inbox |
| **Messages** | `/api/messages/:id` | `DELETE` | Admin | Delete message entry |
| **Upload** | `/api/upload` | `POST` | Admin | Upload image/video/file to Cloudinary |

---

## 🔍 Endpoint Details & Payloads

### 1. Authentication

#### `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "tamjidulislamsamim@gmail.com",
    "password": "AdminSecurePassword123!"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "u-12345",
        "email": "tamjidulislamsamim@gmail.com",
        "role": "ADMIN"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

---

### 2. Contact Messages

#### `POST /api/messages` (Public)
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Inquiry regarding AI Integration",
    "message": "Hi Samim, I checked your portfolio and would like to discuss a project."
  }
  ```
- **Success Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "Message sent successfully!"
  }
  ```

---

### 3. Projects Management (Admin CRUD)

#### `POST /api/projects` (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "SaFus Restaurant",
    "tagline": "FullStack Restaurant & Order Management Platform",
    "description": "Designed and developed a full-stack restaurant platform featuring dual payment gateways...",
    "techStack": ["MongoDB", "Express.js", "React.js", "Node.js", "TypeScript", "Tailwind CSS", "JWT", "Stripe API"],
    "liveDemoUrl": "https://safus-restaurant.example.com",
    "clientGithubUrl": "https://github.com/samim/safus-client",
    "serverGithubUrl": "https://github.com/samim/safus-server",
    "thumbnailUrl": "https://res.cloudinary.com/demo/image/upload/v12345/safus.png"
  }
  ```

---

### 4. Cloudinary File Upload

#### `POST /api/upload` (Admin Only)
- **Headers**: `Authorization: Bearer <token>`
- **Form-Data**: `file`: [Binary Image / Video / PDF File]
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "File uploaded successfully to Cloudinary",
    "data": {
      "url": "https://res.cloudinary.com/samim-cloud/image/upload/v1722100/portfolio_asset.jpg",
      "public_id": "portfolio_asset",
      "format": "jpg",
      "bytes": 245000
    }
  }
  ```

---

## 🔗 Related Documentation Files
- [Step-by-Step Setup Instructions](file:///e:/Project/Personal%20Portfolio/Docs/instruction.md)
- [Database Schema Guide](file:///e:/Project/Personal%20Portfolio/Docs/database_schema.md)
