# To-Do Application

## Overview
This is a full-stack To-Do application built with **React** on the front-end and **Node.js with Express** on the back-end. It allows users to add, edit, delete, and mark tasks as completed, along with setting due dates. The backend uses **Firebase Firestore** as the database.

## Features
- Add tasks with due dates
- Edit tasks
- Mark tasks as completed
- Delete tasks
- Fetch and display tasks from Firestore
- User-friendly UI with **Material-UI**

## Tech Stack
### Frontend
- React
- Material-UI

### Backend
- Node.js
- Express.js
- Firebase Firestore

## Installation
### Prerequisites
- **Node.js** installed on your system
- **Firebase account** (if using Firestore as a database)

### Setup Instructions
1. **Clone the Repository**
```bash
git clone https://github.com/Dipti-gogoi/TodoApp.git
cd react_node
```

2. **Install Dependencies**
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

3. **Set Up Firebase**
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
- Enable Firestore and generate your service account key
- Add the Firebase Admin SDK configuration to the backend

4. **Run the Application**
- Keep both server running
#### Start Backend Server
```bash
cd backend
npx nodemon index.js
```
The frontend application should now be running on `http://localhost:3000`.

#### Start Frontend (Open another terminal)
```bash
cd frontend
npm start
```

The backend application should now be running on `http://localhost:4000`.

- refresh the frontend application browser if you see "No tasks to show" message.
## API Endpoints
### Task Management
| Method | Endpoint | Description |
|--------|------------|-------------|
| GET | `/tasks` | Retrieve all tasks |
| POST | `/tasks` | Add a new task |
| PUT | `/tasks/:id` | Update a task (mark as completed) |
| DELETE | `/tasks/:id` | Delete a task |

## Project Structure
### **Frontend (React)**
```
frontend/
│── src/
│   ├── components/
│   │   ├── AddTodo.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   ├── App.js
│   ├── index.js
│   ├── App.css
│── package.json
│── README.md
```
### **Backend (Node.js + Express)**
```
backend/
│── config/
│   ├── config.js
|   ├── firebase.json
│── middleware/
|   ├── handleRoutes.js
|   ├── setupMiddleware.js
│── public/
|   ├── index.html
│── package.json
│── index.js
│── package.json
```

## Known Issues & Troubleshooting
- **Tasks not updating in UI?** Ensure backend API is correctly updating Firestore.
- **CORS issues?** Make sure `cors()` is enabled in `index.js`.
- **Date Picker not working?** Update `@mui/x-date-pickers` package to the latest version.


