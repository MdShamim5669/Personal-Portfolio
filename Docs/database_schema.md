# 🗄️ Database Schema & Prisma ERD Guide

Comprehensive database documentation for **Md. Samim's Dynamic Portfolio Application**. Built with **PostgreSQL** and managed using **Prisma ORM**.

---

## 📐 Entity Relationship Diagram (ERD Overview)

```text
  +------------------+         +------------------+
  |       User       |         |     Profile      |
  +------------------+         +------------------+
  | id (PK)          |         | id (PK)          |
  | email (Unique)   |         | fullName         |
  | password (Hash)  |         | title            |
  | role (Enum)      |         | bio              |
  | createdAt        |         | email, phone     |
  +------------------+         | cgp, university  |
                               | resumeUrl        |
                               +------------------+

  +------------------+         +------------------+
  |     Project      |         |      Skill       |
  +------------------+         +------------------+
  | id (PK)          |         | id (PK)          |
  | title            |         | name             |
  | tagline          |         | category (Enum)  |
  | description      |         | proficiency %    |
  | techStack (Array)|         | iconName         |
  | liveDemoUrl      |         +------------------+
  | clientGithubUrl  |
  | serverGithubUrl  |         +------------------+
  | thumbnailUrl     |         |      Thesis      |
  | isFeatured       |         +------------------+
  +------------------+         | id (PK)          |
                               | title            |
  +------------------+         | accuracy (Float) |
  |    Experience    |         | modelName        |
  | (ALGORIZIN Intern)|        | techStack (Array)|
  +------------------+         | githubUrl        |
  | id (PK)          |         +------------------+
  | role, company    |
  | startDate        |         +------------------+
  | endDate          |         |     Course       |
  | highlights(Array)|         | (Udemy Courses)  |
  +------------------+         +------------------+
                               | id (PK)          |
  +------------------+         | title            |
  |     Message      |         | subtitle         |
  | (Contact Inbox)  |         | courseUrl        |
  +------------------+         +------------------+
  | id (PK)          |
  | name, email      |
  | subject, message |
  | isRead (Bool)    |
  +------------------+
```

---

## 📜 Prisma Schema Definition (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  VIEWER
}

enum SkillCategory {
  LANGUAGES
  FRONTEND
  BACKEND
  DATABASES
  ML_AI
  TOOLS
  AI_TOOLS
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed via bcryptjs
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id          String   @id @default(uuid())
  fullName    String   @default("Md. Samim")
  title       String   @default("AI & Backend Engineer")
  bio         String   @db.Text
  email       String
  phone       String
  location    String   @default("Dhaka, Bangladesh")
  cgpa        Float    @default(3.55)
  university  String   @default("Daffodil International University")
  degree      String   @default("Bachelor of Science in Computer Science & Engineering")
  githubUrl   String?
  linkedinUrl String?
  resumeUrl   String?
  updatedAt   DateTime @updatedAt
}

model Skill {
  id          String        @id @default(uuid())
  name        String
  category    SkillCategory
  proficiency Int           @default(80) // Percentage 0-100
  iconName    String?       // Lucide or React-Icon string identifier
  order       Int           @default(0)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Project {
  id              String   @id @default(uuid())
  title           String
  tagline         String
  description     String   @db.Text
  techStack       String[] // e.g. ["React.js", "Express.js", "PostgreSQL", "Prisma"]
  liveDemoUrl     String?
  clientGithubUrl String?
  serverGithubUrl String?
  thumbnailUrl    String?  // Cloudinary image URL
  videoDemoUrl    String?  // Cloudinary video URL
  isFeatured      Boolean  @default(true)
  order           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Thesis {
  id             String   @id @default(uuid())
  title          String
  summary        String   @db.Text
  accuracy       Float    @default(84.4)
  modelName      String   @default("Random Forest")
  datasetSize    Int      @default(317)
  techStack      String[] // e.g. ["Python", "Scikit-learn", "Pandas", "Flask"]
  githubUrl      String?
  paperUrl       String?
  highlights     String[]
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Experience {
  id           String   @id @default(uuid())
  role         String
  company      String
  location     String?
  startDate    String
  endDate      String
  isCurrent    Boolean  @default(false)
  description  String?  @db.Text
  highlights   String[]
  order        Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Course {
  id          String   @id @default(uuid())
  title       String
  subtitle    String?
  platform    String   @default("Udemy")
  creatorRole String   @default("AI Content Developer at ALGORIZIN")
  courseUrl   String?
  thumbnailUrl String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Message {
  id        String   @id @default(uuid())
  name      String
  email     String
  subject   String?
  message   String   @db.Text
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## 📊 Seed Data Mapping

When `npm run seed` is executed inside the backend:
1. The script wipes existing rows (if development resets are triggered).
2. It parses `Docs/cv_data.json` containing Md. Samim's verified CV parameters.
3. It inserts initial records for `Profile`, `Skill` (over 15 detailed skills with categories), `Project` (SaFus Restaurant, ParCelGo), `Thesis`, `Experience` (ALGORIZIN intern), `Course` (5 Udemy courses), and initial `User` (Admin email: `tamjidulislamsamim@gmail.com`).

---

## 🔗 Related Documentation Files
- [Step-by-Step Setup Instructions](file:///e:/Project/Personal%20Portfolio/Docs/instruction.md)
- [Server Directory Structure](file:///e:/Project/Personal%20Portfolio/Docs/server_folder_structure.md)
- [REST API Reference](file:///e:/Project/Personal%20Portfolio/Docs/api_documentation.md)
