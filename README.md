# MERN Social Media App

A full-stack social media application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It allows users to register, log in, create posts, update profiles, and view other users' profiles.  
Only the logged-in user can delete their own posts.

---

## Features

- **User Authentication**
  - Register new users
  - Login and JWT-based authentication
  - Auth middleware to protect routes

- **User Profiles**
  - View your own profile
  - Update profile info (name, email, bio, profile image)
  - View other users' profiles and posts

- **Posts**
  - Create new posts
  - View all posts
  - View posts by a specific user
  - Only logged-in user can delete their own posts

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Context API for state management
- Tailwind CSS / Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

---

## 🛠Installation Steps

### 1. Clone the Repository
```bash
git https://github.com/Inshiya1904/Mini-LinkedIn.git
cd Mini-LinkedIn
```

### 2. Install Client Dependencies
```bash
cd Frontend
npm install
```

### 4. Install Server Dependencies
```bash
cd Backend
npm install
```
### 5. Start Servers
```bash
# Start Backend
cd Backend
npm run dev
```
### 6. start Frontend
```bash
cd Frontend
npm run dev
```


