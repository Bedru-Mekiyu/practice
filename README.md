# Role-Based Access Control (RBAC) API

A secure, scalable RESTful API demonstrating **User Authentication** and **Role-Based Access Control (RBAC)** using Node.js, Express, MongoDB (Mongoose), and JSON Web Tokens (JWT).

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture & Structure](#project-architecture--structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [User & Role-Protected Routes](#user--role-protected-routes)
- [CI/CD Workflow](#cicd-workflow)
- [License](#license)

---

## 🎯 Overview

This API implements robust authentication and fine-grained authorization. Users can register with custom roles (`admin`, `manager`, `user`), log in securely using password hashing via `bcrypt`, and receive a signed `JWT` token. Subsequent HTTP requests utilize middleware to verify the JWT and enforce role-based access restrictions on backend resource endpoints.

---

## ✨ Key Features

- **User Authentication**: Secure user registration and authentication flow.
- **Password Hashing**: Uses `bcrypt` with salt rounds to ensure passwords are stored safely.
- **JWT Authorization**: Stateless JWT generation and verification middleware.
- **Role-Based Access Control (RBAC)**: Fine-grained access control supporting `admin`, `manager`, and `user` roles.
- **MongoDB & Mongoose**: Clean, structured schema definition for user persistence.
- **Environment Driven**: Fully configurable port, database connection string, and secret keys via `.env`.

---

## 🛠 Tech Stack

- **Runtime Environment**: Node.js
- **Web Framework**: Express.js (v5)
- **Database**: MongoDB with Mongoose ODM
- **Authentication / Security**: `jsonwebtoken`, `bcrypt`
- **Environment Management**: `dotenv`
- **Dev Tools**: `nodemon`

---

## 📁 Project Architecture & Structure

```
.
├── .env.example              # Template environment variables
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions CI pipeline
├── .gitignore                # Git ignore configuration
├── package.json              # Dependencies and scripts
├── package-lock.json         # Locked dependency graph
└── src/
    ├── config/
    │   └── dbconnect.js      # MongoDB connection initializer
    ├── controllers/
    │   └── authcontroller.js # Auth registration and login handlers
    ├── middlewares/
    │   ├── authmiddleware.js # JWT verification middleware
    │   └── rolemiddleware.js # Role authorization middleware
    ├── models/
    │   └── usermodel.js      # Mongoose User schema & model
    ├── routes/
    │   ├── authRoutes.js     # Express routes for /api/auth
    │   └── userRoutes.js     # Express routes for /api/users
    └── index.js              # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) instance (Local or MongoDB Atlas cluster)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd role-based-access-control-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Variables

Copy `.env.example` to create your own `.env` file:

```bash
cp .env.example .env
```

Configure your `.env` parameters:

```env
PORT=3000
CONNECTION_STRING=mongodb://localhost:27017/express_rbac
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
API_KEY=your_api_key_here
```

### Running the Application

- **Development Mode** (with hot reload via `nodemon`):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access | Body Parameters |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user with role | Public | `{ "username": "john", "password": "secretpassword", "role": "user" }` |
| `POST` | `/api/auth/login` | Authenticate user & return JWT | Public | `{ "username": "john", "password": "secretpassword" }` |

*Note*: Supported roles during registration are `admin`, `manager`, and `user` (default: `user`).

### User & Role-Protected Routes

*Requires HTTP Header*: `Authorization: Bearer <your_jwt_token>`

| Method | Endpoint | Allowed Roles | Description |
|---|---|---|---|
| `GET` | `/api/users/admin` | `admin` | Admin dashboard resource access |
| `GET` | `/api/users/manager` | `admin`, `manager` | Manager dashboard resource access |
| `GET` | `/api/users/user` | `admin`, `manager`, `user` | General user profile access |

---

## 🔄 CI/CD Workflow

Automated testing and validation are performed via GitHub Actions on every push and pull request.

- **Matrix Testing**: Node.js versions `18.x` and `20.x`.
- **Validation**:
  ```bash
  npm test
  ```

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).
