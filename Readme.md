# Notes Creator App

A beginner full-stack backend practice project built using Node.js, Express.js, EJS, and the File System module.

This project allows users to create, read, and rename notes dynamically using text files as storage.

---

# Features

* Create notes with title and description
* Store notes as `.txt` files
* Display all existing notes dynamically
* Read complete note content
* Rename existing notes
* Dynamic routing using Express
* EJS templating for dynamic frontend rendering
* Tailwind CSS based UI
* Static file serving using Express

---

# Tech Stack

* Node.js
* Express.js
* EJS
* Tailwind CSS
* File System Module (`fs`)
* Path Module (`path`)

---

# Concepts Practiced

This project helped in understanding:

* Express routing
* Middleware
* Form handling
* `req.body`
* `req.params`
* Dynamic routing
* EJS templating
* Static file serving
* CRUD-like operations
* File handling using `fs`
* Request-response cycle

---

# Project Structure

```text
project/
│
├── files/              # Stores all notes as txt files
├── public/             # Static files (CSS, images, JS)
├── views/              # EJS templates
│   ├── index.ejs
│   ├── show.ejs
│   └── edit.ejs
│
├── app.js
├── package.json
└── README.md
```

---

# Routes

| Route             | Method | Purpose           |
| ----------------- | ------ | ----------------- |
| `/`               | GET    | Display all notes |
| `/create`         | POST   | Create new note   |
| `/file/:filename` | GET    | Read note content |
| `/edit/:filename` | GET    | Open edit page    |
| `/edit`           | POST   | Rename note       |

---

# Installation

Clone the repository:

```bash
git clone <your-repo-link>
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node app.js
```

Open browser:

```text
http://localhost:3000
```

---

# Future Improvements

* Delete notes functionality
* Edit note descriptions
* MongoDB integration
* Authentication
* Better UI animations
* Search functionality
* Proper MVC architecture

---

# Learning Outcome

This project was built as part of backend learning practice to understand how frontend and backend interact together using Express.js and EJS.
