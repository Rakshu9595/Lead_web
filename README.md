📌 Smart Leads Dashboard

A full-stack Lead Management System built using the MERN stack, designed to manage, track, and analyze leads efficiently with authentication and secure APIs.

🚀 Live Demo
🌐 Frontend: https://lead-web-three.vercel.app
⚙️ Backend: https://lead-web.onrender.com
🧠 Features
🔐 Authentication
User Registration
User Login
JWT-based Authentication
Secure password hashing
📊 Lead Management
Create Leads
View Leads
Update Leads
Delete Leads
🎯 Dashboard
Clean UI
Lead tracking
Status-based management
🌐 API Integration
RESTful APIs
Secure endpoints
Error handling middleware
🏗️ Tech Stack
Frontend
React.js
Axios
CSS / Bootstrap
Backend
Node.js
Express.js
MongoDB
Mongoose
Deployment
Frontend: Vercel
Backend: Render
📁 Project Structure
smart-leads-dashboard/
│
├── client/                 # React Frontend
│   ├── src/
│   └── public/
│
├── server/                 # Node Backend
│   ├── modules/
│   │   ├── auth/
│   │   └── leads/
│   ├── middleware/
│   ├── config/
│   └── dist/
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/smart-leads-dashboard.git
cd smart-leads-dashboard
2️⃣ Backend Setup
cd server
npm install
Create .env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLIENT_URL=https://lead-web-three.vercel.app
Run Backend
npm run dev
3️⃣ Frontend Setup
cd client
npm install
npm start
🌍 API Endpoints
Auth Routes
POST /api/auth/register
POST /api/auth/login
Lead Routes
GET    /api/leads
POST   /api/leads
PUT    /api/leads/:id
DELETE /api/leads/:id
🔥 CORS Configuration (Important)
app.use(cors({
  origin: "https://lead-web-three.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
🚀 Deployment
Frontend (Vercel)
Connect GitHub repo
Deploy automatically
Backend (Render)
Create Web Service
Add environment variables
Deploy latest commit
