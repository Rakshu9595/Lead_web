Smart Leads Dashboard

A full-stack Lead Management System built with the MERN stack, enabling users to manage, track, and organize leads with secure authentication and REST APIs.

Live Demo

Frontend: https://lead-web-three.vercel.app
Backend: https://lead-web.onrender.com

Features

Authentication

User Registration
User Login
JWT Authentication
Secure Password Hashing

Lead Management

Create Leads
View Leads
Update Leads
Delete Leads

Dashboard

Clean UI
Easy navigation
Lead tracking

Backend

REST APIs
Middleware error handling
Protected routes

Tech Stack

Frontend: React.js, Axios, Bootstrap
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT
Deployment: Vercel (Frontend), Render (Backend)

Project Structure

smart-leads-dashboard/

client/ -> React frontend
server/ -> Node backend
modules/ -> Feature modules (auth, leads)
middleware/ -> Error handling
config/ -> DB config
dist/ -> Compiled backend

Setup Instructions

Clone Repository

git clone https://github.com/your-username/smart-leads-dashboard.git
cd smart-leads-dashboard

Backend Setup

cd server
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://lead-web-three.vercel.app

Run backend:

npm run dev

Frontend Setup

cd client
npm install
npm start

API Documentation

Auth Routes
POST /api/auth/register -> Register user
POST /api/auth/login -> Login user

Lead Routes
GET /api/leads -> Get all leads
POST /api/leads -> Create lead
PUT /api/leads/:id -> Update lead
DELETE /api/leads/:id -> Delete lead

Environment Variables (.env.example)

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=https://lead-web-three.vercel.app

CORS Configuration

Use this in backend:

app.use(cors({
origin: "https://lead-web-three.vercel.app",
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true
}));

Deployment

Frontend (Vercel)

Connect GitHub repo
Auto deploy

Backend (Render)

Create Web Service
Add environment variables
Deploy latest commit
