# Mentimeter Clone — Quiz Management Application
A full-stack quiz application inspired by Mentimeter, enabling admins to create and edit quizzes, and users to attempt quizzes and view leaderboards.
Built with React, Node.js, Express, MongoDB, and Zod validation.



## ✨Features
- *Admin panel for creating, editing, and managing quizzes*
- *User interface to view, attempt quizzes, and see leaderboards*
- *User authentication & role-based access control (admin/user)*
- *Real-time input validation with Zod on backend*
- *Responsive UI built with React and Tailwind CSS*
- *Secure API endpoints with JWT authentication*




## 🛠️Technologies Used
### Frontend
  + React (with Hooks & React Router)
  + Tailwind CSS for styling and responsive design
  + Axios for API calls
### Backend
  + Node.js with Express.js
  + MongoDB + Mongoose for data storage
  + Zod for schema validation
  + JWT-based authentication and middleware
  + dotenv for environment configuration



## 🚀Getting Started
### Prerequisites
+ Node.js v14+
+ MongoDB database (local or cloud)
+ npm

## 📝Installation
### 📥Clone the repo
```
git clone https://github.com/Aparnamol-KS/Mentimeter.git
cd Mentimeter
```
### ⚙️Backend SetUp
1. Navigate to backend folder 
2. Install dependencies:

```
npm install
```
3. Create .env file with required environment variables:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
4. Start backend server

```
node server.js
```

### 🌐Frontend Setup
1. Go to frontend directory (e.g., /client or root if combined)

2. Install dependencies

```
npm install
```
3. Start the React development server

```
npm start
```

## 📡API Overview

- `POST /signup` — Register a new user  
- `POST /login` — Authenticate and obtain JWT token  

- **Admin routes (require admin token):**  
  - `POST /admin/createQuiz`  
  - `POST /admin/updateQuiz/:quizId`  
  - `GET /admin/quiz/:quizId`  
  - `GET /admin/viewQuizzes`  

- **User routes (require user token):**  
  - `GET /user/view_quiz`  
  - `GET /user/attempt_quiz/:quizId`  
  - `POST /user/attempt_quiz/:quizId`  
  - `GET /leaderboard/:quizId`  




