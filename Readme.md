# Notes Creator App
https://notes-app-07.onrender.com/

A full-stack Notes Management Application built using Node.js, Express.js, MongoDB, Mongoose, EJS, JWT Authentication, and Tailwind CSS.

The application allows users to register, log in securely, create personal notes, edit existing notes, read note details, and delete notes. Each user can access only their own notes through authentication and protected routes.

---

## Features

### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT-based Authentication
* Protected Routes
* Logout Functionality

### Notes Management

* Create Notes
* View All Personal Notes
* Read Individual Notes
* Edit Existing Notes
* Delete Notes
* User-Specific Notes Storage

### Deployment

* MongoDB Atlas Database
* Render Deployment
* GitHub Version Control

---

## Tech Stack

### Frontend

* EJS
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Authentication

* JWT (JSON Web Token)
* bcrypt

### Deployment & Tools

* Git
* GitHub
* Render

---

## Concepts Practiced

This project helped me understand:

* Express Routing
* Middleware
* Authentication & Authorization
* JWT Token Generation & Verification
* Password Hashing with bcrypt
* MongoDB CRUD Operations
* Database Relationships & Referencing
* Mongoose Models & Schemas
* Protected Routes
* Form Handling
* Request & Response Cycle
* Cookie Handling
* Deployment using Render
* Git & GitHub Workflow

---

## Project Structure

```text
project/
│
├── models/
│   ├── User.js
│   └── Notes.js
│
├── views/
│   ├── LandingPage.ejs
│   ├── Registration.ejs
│   ├── Login.ejs
│   ├── index.ejs
│   ├── show.ejs
│   └── edit.ejs
│
├── public/
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

## Routes

| Route              | Method | Purpose            |
| ------------------ | ------ | ------------------ |
| /                  | GET    | Landing Page       |
| /register          | GET    | Registration Page  |
| /register          | POST   | Register New User  |
| /loginPage         | GET    | Login Page         |
| /login             | POST   | Authenticate User  |
| /logout            | GET    | Logout User        |
| /indexpage/:userid | GET    | Display User Notes |
| /create            | POST   | Create New Note    |
| /file/:id          | GET    | Read Note          |
| /edit/:id          | GET    | Edit Page          |
| /edit              | POST   | Update Note        |
| /delete/:id        | GET    | Delete Note        |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/atharv7237/Notes_app_07.git
```

### Install Dependencies

```bash
npm install
```

### Create .env File

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

### Start Server

```bash
node app.js
```

### Open Browser

```text
http://localhost:3000
```

---

## Screenshots

### Landing Page

![Landing page](<public/images/Screenshot 2026-06-04 221314.png>)

### Registration Page

![Registration](<public/images/Screenshot 2026-06-04 221332.png>)

### Login Page

![Login](<public/images/Screenshot 2026-06-04 221348.png>)

### Notes Dashboard

![Notes](<public/images/Screenshot 2026-06-04 221421.png>)

### Read Note

![Read](<public/images/Screenshot 2026-06-04 221516.png>)

### Edit Note

![Edit](<public/images/Screenshot 2026-06-04 221459.png>)

---

## Future Improvements

* Profile Pictures
* User Profile Page
* Authorization Checks
* Search Notes
* Tags & Categories
* Rich Text Editor
* Dark Mode
* Pagination
* REST API Version
* MVC Architecture Refactor

---

## Learning Outcome

This project started as a simple file-system based notes application and gradually evolved into a full-stack web application with authentication, database integration, deployment, and user-specific data management.

Through this project, I gained practical experience with Express.js, MongoDB, JWT Authentication, bcrypt, deployment workflows, GitHub version control, and building complete CRUD applications from scratch.

## Project Journey

This project holds special significance for me because it is the first complete web application that I designed, built, debugged, and deployed largely on my own while learning backend development.

The project began as a simple file-system based Notes application where notes were stored as text files. As I continued learning, I gradually expanded it by integrating MongoDB Atlas, Mongoose, user authentication with JWT, password hashing using bcrypt, protected routes, and deployment on Render.

Since this project was developed during my learning phase, I intentionally focused on understanding core backend concepts and implementing features step-by-step rather than following every industry-standard practice from the beginning. For example, the application currently does not use a complete MVC architecture and some areas can be further refactored as my knowledge grows.

Rather than being a finished product, this project represents my learning journey from basic CRUD operations to building and deploying a full-stack application with authentication and database integration.

It serves as a milestone in my development journey and demonstrates my ability to learn new technologies, solve real-world problems, debug issues independently, and continuously improve my codebase over time.
