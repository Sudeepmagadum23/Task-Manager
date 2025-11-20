1) Project Overview

This is a MERN stack Task Manager application built as part of an internship assignment.
The app includes a login page, task creation, task listing, editing, deleting, pagination, and status filtering.

Key Features:

Login (dummy authentication: admin / 12345)

Create, View, Edit, Delete tasks

Filter tasks by status

Pagination (5 tasks per page)

Protected routes (cannot access tasks without login)

MongoDB database storage

 2) Tech Stack Used
Frontend

React.js

Vite

React Router DOM

Axios

Custom CSS

Backend

Node.js

Express.js

Mongoose

CORS

dotenv

Database

MongoDB (Local)

3) How to Run Backend

1️.Navigate to backend folder

cd backend


2️. Install dependencies

npm install


3️. Create .env file inside /backend

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager


4️. Start the backend server

npm run dev


Backend runs at: http://localhost:5000/

 4) How to Run Frontend

1️. Navigate to frontend folder

cd frontend


2️. Install dependencies

npm install


3️. Start the frontend development server

npm run dev


Frontend runs at: http://localhost:5173/
