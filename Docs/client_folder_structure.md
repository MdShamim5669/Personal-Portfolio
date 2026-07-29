# 💻 Client Folder Structure Guide

Detailed architectural documentation for the React.js + Vite + Tailwind CSS + Shadcn UI frontend located in `/client`.

---

## 📂 Directory Tree Layout

```text
client/
├── public/                     # Static public assets (favicon, site preview images, icons)
│   ├── favicon.ico
│   └── resume_sample.pdf
│
├── src/
│   ├── assets/                 # Images, SVGs, static data files
│   │   ├── profile.jpg         # Profile avatar placeholder/image
│   │   └── project-defaults/   # Default fallback thumbnails
│   │
│   ├── components/             # Component Hierarchy
│   │   ├── common/             # Global Layout Components
│   │   │   ├── Navbar.jsx      # Navigation header with dark mode & admin quick-link
│   │   │   ├── Footer.jsx      # Footer with social links, copyright & admin login link
│   │   │   ├── LoadingSpinner.jsx # Smooth loading spinner for async operations
│   │   │   └── Modal.jsx       # Reusable accessible dialog modal
│   │   │
│   │   ├── ui/                 # Shadcn UI Primitives & Tailwind Elements
│   │   │   ├── button.jsx      # Customizable Shadcn button component
│   │   │   ├── card.jsx        # Shadcn card container (Header, Content, Footer)
│   │   │   ├── input.jsx       # Styled input primitive
│   │   │   ├── textarea.jsx    # Styled multi-line textarea primitive
│   │   │   ├── dialog.jsx      # Shadcn modal overlay & portal primitives
│   │   │   ├── badge.jsx       # Tech stack & category pill badges
│   │   │   └── toast.jsx       # Sonner / Radix toast provider & hooks
│   │   │
│   │   ├── home/               # Portfolio Public Page Sections
│   │   │   ├── HeroSection.jsx # Executive summary, interactive headline, CV download
│   │   │   ├── SkillsSection.jsx # Skills tab filter & Recharts proficiency bar charts
│   │   │   ├── ProjectsSection.jsx # Project cards grid with GitHub/Live links & details modal
│   │   │   ├── ThesisSection.jsx # Research metrics, Random Forest accuracy & methodology
│   │   │   ├── TimelineSection.jsx # ALGORIZIN internship & Udemy courses timeline
│   │   │   └── ContactSection.jsx # Contact form submitting directly to Express backend
│   │   │
│   │   ├── admin/              # Protected Admin CMS Components
│   │   │   ├── AdminSidebar.jsx# Dashboard navigation tabs (Projects, Skills, Thesis, Inbox)
│   │   │   ├── ProjectManager.jsx # Project CRUD modal & datatable
│   │   │   ├── SkillManager.jsx   # Skill item & percentage proficiency manager
│   │   │   ├── ThesisManager.jsx  # Research thesis details editor
│   │   │   ├── CourseManager.jsx  # Udemy course items & link editor
│   │   │   ├── MessageInbox.jsx   # Inbox viewer with message read status & delete controls
│   │   │   └── CloudinaryUploader.jsx # Drag-and-drop image/video file uploader
│   │   │
│   │   └── charts/             # Recharts Data Visualizations
│   │       ├── SkillRadarChart.jsx # Radar chart showcasing domain expertise balances
│   │       └── ModelPerformanceChart.jsx # Bar/Line graph for ML Thesis model comparisons
│   │
│   ├── context/                # React Context Providers
│   │   ├── AuthContext.jsx     # Admin authentication state, token persistence & logout
│   │   └── ThemeContext.jsx    # Dark/Light mode theme state manager
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useAuth.js          # Convenient hook accessing AuthContext
│   │   ├── useFetch.js         # Automated data fetching hook with loading & error handling
│   │   └── useToast.js         # Wrapper around Sonner toast notifications
│   │
│   ├── pages/                  # Top-Level Page Views
│   │   ├── HomePage.jsx        # Public interactive portfolio view aggregating home components
│   │   ├── AdminLoginPage.jsx  # Secure login view with form validation
│   │   └── AdminDashboardPage.jsx # Protected CMS control panel view
│   │
│   ├── services/               # API Communication Layer
│   │   ├── api.js              # Base Axios client with authorization interceptors
│   │   └── portfolioService.js # Specific endpoint functions (getProjects, createProject, etc.)
│   │
│   ├── App.jsx                 # Main application component & React Router configuration
│   ├── main.jsx                # React DOM render root
│   └── index.css               # Tailwind CSS imports & theme CSS variables
│
├── .env.example                # Sample frontend environment file
├── index.html                  # HTML entry point template
├── tailwind.config.js          # Tailwind CSS theme customization & extensions
├── vite.config.js              # Vite compiler config & path aliases
└── package.json                # NPM dependency manifest
```

---

## 🎨 UI & Design Systems

### 1. Design Tokens & Styling
- Built using **Tailwind CSS** paired with **Shadcn UI** design primitives.
- Dark theme default with sleek glassmorphism panels, subtle glowing gradients, dynamic hover states, and smooth CSS transitions.

### 2. Interactive Charts (Recharts)
- **Skill Proficiency Visualization**: Renders progress bars and radial/radar charts mapping domain proficiencies (Backend, Frontend, Databases, ML/AI, AI Tools).
- **Thesis Performance Visualizer**: Highlights model comparison metrics (Random Forest 84.4% vs. XGBoost / Logistic Regression) using comparative column charts.

### 3. Notification & Feedback System
- Powered by **Sonner / Radix Toast notifications**.
- Instant user feedback for contact form submissions, login authentication results, and Admin CRUD operations.

---

## 🔗 Related Documentation Files
- [Main Project README](file:///e:/Project/Personal%20Portfolio/README.md)
- [Project Architecture Guide](file:///e:/Project/Personal%20Portfolio/Docs/project_structure.md)
- [Server Folder Details](file:///e:/Project/Personal%20Portfolio/Docs/server_folder_structure.md)
- [Database Schema Guide](file:///e:/Project/Personal%20Portfolio/Docs/database_schema.md)
- [REST API Reference](file:///e:/Project/Personal%20Portfolio/Docs/api_documentation.md)
