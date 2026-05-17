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
git clone https://github.com/YOUR_GITHUB_USERNAME/careercraft-ai.git
cd careercraft-ai
```

### 2. Configure Environment Variables
Create a `.env` file inside the `Backend` directory using the provided template:
```bash
cp .env.example Backend/.env
```
Open `Backend/.env` and fill in your details:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interview_ai
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_GENAI_API_KEY=AIzaSy...your_gemini_api_key_here
INTERVIEW_REPORT_URL=sumanta795/interviewprep-ai
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

## 🚀 Production Deployment on Render

This repository is pre-configured to build, compile, and run out-of-the-box on Render's free tier as a single unified service.

### Service Settings on Render
1.  Create a **New Web Service** and connect your GitHub repository.
2.  Set the following configuration variables:
    *   **Root Directory**: *(leave blank)*
    *   **Runtime**: `Node`
    *   **Build Command**: `npm run build`
    *   **Start Command**: `npm start`
3.  Add the following **Environment Variables** in Render's Advanced settings:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Activates secure cross-origin HTTP cookies |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Connection URI |
| `JWT_SECRET` | `your_secret_string` | Secure string used for signing user sessions |
| `GOOGLE_GENAI_API_KEY` | `AIzaSy...` | Your Google Gemini API Key |
| `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` | `false` | Commands Puppeteer to download Chromium on build |
| `PUPPETEER_CACHE_DIR` | `/opt/render/project/src/.cache/puppeteer` | Prevents cache corruption on subsequent deploys |

4.  Configure MongoDB Atlas Network Access: Add IP `0.0.0.0/0` (Allow access from anywhere) to allow Render's dynamic web instances to connect securely to your database.
5.  Click **Create Web Service**! Your unified full-stack application will build, compile, and serve automatically.

---

## 🛡️ License

This project is licensed under the MIT License - see the LICENSE file for details.

*Developed with ❤️ as a resume showcase application.*
