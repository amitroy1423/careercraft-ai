# 🤖 Interview AI - Full-Stack AI Interview Preparation Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75C2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)](https://pptr.dev/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

> An advanced, production-ready, full-stack web application designed to help job seekers master their mock interviews. Driven by state-of-the-art **Google Gemini Gen AI** models, it provides dynamic, personalized, role-based interview prep, skill gap analysis, and generates professional feedback reports.

🌐 **Live Production Demo**: [https://careercraft-ai-6stn.onrender.com](https://careercraft-ai-6stn.onrender.com)

---

## 🌟 Core Features

*   **🔒 Secure Role-Based Authentication**: Custom robust authentication flow using secure HTTP-only cookies, token-based session persistence, and dynamic CORS domain whitelisting.
*   **🤖 AI-Powered Interview Simulation**: Generates custom, relevant, role-specific questions based on the candidate's target job description, resume, and experience level using Google Gemini AI.
*   **📊 Dynamic Evaluation Dashboard**: Presents visual match scores (%), detailed question-by-question feedback, and analytical performance metrics.
*   **🔍 Skill Gap Analysis**: Identifies exact tech stack deficiencies and provides hyper-personalized, actionable roadmaps for upskilling.
*   **📄 PDF Report Generator**: Candidates can instantly export a professionally formatted, highly detailed PDF prep report powered by headless Puppeteer servers.
*   **✨ Sleek Glassmorphic Dark UI**: Premium user interface crafted with Sass, interactive micro-animations, structured layouts, and modern accessibility standards.

---

## 🏗️ Architecture & Monorepo Structure

The project is structured as a coordinated **monorepo** utilizing single-service unified builds. The Node/Express backend serves both the RESTful API endpoints and the compiled React production assets statically.

```text
InterviewAI/
├── Frontend/               # React Client (Vite, Sass, Axios)
│   ├── public/             # Branding icons & global assets
│   ├── src/                # Component architecture, routers, & hooks
│   └── package.json        # Frontend dependencies
│
├── Backend/                # Express API Server (Node, Mongoose)
│   ├── src/
│   │   ├── config/         # Database and third-party setups
│   │   ├── controllers/    # API endpoint controllers
│   │   ├── middlewares/    # Authentication & file processing middlewares
│   │   ├── models/         # Mongoose DB Schemas
│   │   └── services/       # Google Gemini AI & Puppeteer compilers
│   └── server.js           # Express main server entrypoint
│
├── package.json            # Monorepo task orchestrator (builds & runs both apps)
└── README.md               # Documentation
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Axios, React Router, Sass (Dart Sass), CSS Flexbox/Grid |
| **Backend** | Node.js, Express 5, MongoDB, Mongoose, Cookie-Parser, Multer |
| **Generative AI** | Google Gemini Developer API SDK, custom prompt engineering |
| **Reporting / PDF** | Headless Puppeteer (Linux Container optimized) |
| **Security** | HTTP-Only Cookies, JWT tokens, secure same-site policies, Dynamic CORS whitelisting |

---

## 💻 Local Installation & Setup

### Prerequisites
*   Node.js (v22.0.0 or higher recommended)
*   MongoDB Atlas cluster (or local MongoDB database instance)
*   Google Gemini API Key

### 1. Clone & Navigate
```bash
git clone https://github.com/amitroy1423/careercraft-ai.git
cd careercraft-ai
```

### 2. Configure Environment Variables
Create a `.env` file inside the `Backend` directory using the provided template:
```bash
cp .env.example Backend/.env
```
Open `Backend/.env` and fill in your details:
```env
PORT=XXXX
MONGO_URI=XXXXXXXXXXXX
JWT_SECRET=XXXXXXXXXXXX
GOOGLE_GENAI_API_KEY=XXXXXXXXXXXXX
INTERVIEW_REPORT_URL=XXXXXXXXXXXX
```

### 3. Run One-Step Monorepo Installer
Use our pre-configured script from the repository root to automatically install dependencies for both the frontend and backend:
```bash
npm run install-all
```

### 4. Start Local Development
Run the development servers:
*   **Backend Server**: `npm start` (Runs API at `http://localhost:5000`)
*   **Frontend Client**: `cd Frontend && npm run dev` (Runs React at `http://localhost:5173`)

---

