# AnywhereSoftware Project

This project is a full-stack application designed to manage student quizzes and announcements. It consists of a NestJS backend and a Next.js (React) frontend.

## Project Overview

### Backend (NestJS)

- **Framework:** NestJS
- **Database:** MongoDB (via Prisma ORM)
- **Features:**
    - **Authentication:**
        - User registration, login, and logout.
        - JWT-based authentication with HTTP-only cookies for secure token storage.
        - Token refresh mechanism.
        - Protected routes using JWT guards.
    - **Announcements Module:**
        - CRUD (Create, Read, Update, Delete) operations for announcements.
        - Pagination and sorting for retrieving announcements.
        - User-specific announcement retrieval.
        - Global exception handling for consistent error responses.
    - **Quizzes Module:**
        - CRUD (Create, Read, Update, Delete) operations for quizzes.
        - Nested question management within quizzes.
        - Pagination and sorting for retrieving quizzes.

### Frontend (Next.js/React)

- **Framework:** Next.js (App Router)
- **UI Library:** Material-UI
- **State Management:** Redux Toolkit
- **Features:**
    - **Authentication:**
        - Login and Registration pages with Zod validation.
        - Redux store for managing user authentication state.
        - `ProtectedRoute` for securing dashboard routes, handling session persistence and token refresh.
        - `PublicRoute` for redirecting authenticated users from login/register pages.
        - Dynamic redirection on the home page based on authentication status.
        - Global error notification system for API failures.
    - **Announcements:**
        - Display of all announcements and user-created announcements.
        - Integration with backend CRUD and pagination APIs.
    - **Quizzes:**
        - Display of all quizzes.
        - Integration with backend CRUD and pagination APIs.

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm (v10 or higher recommended)
- MongoDB instance (local or cloud-hosted)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/AnywhereSoftware.git
    cd AnywhereSoftware
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    # Create a .env file based on .env.template and configure your DATABASE_URL
    # Example .env:
    # DATABASE_URL="mongodb+srv://<user>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority"
    # JWT_SECRET="your_jwt_secret_key"
    # JWT_ACCESS_TOKEN_EXPIRATION_TIME=3600 # in seconds
    # JWT_REFRESH_TOKEN_EXPIRATION_TIME=604800 # in seconds
    npx prisma generate
    # Manually ensure your MongoDB schema matches prisma/schema.prisma
    # (Prisma Migrate is not supported for MongoDB)
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../client
    npm install
    # Create a .env.local file based on your backend URL
    # Example .env.local:
    # NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd server
    npm run start:dev
    ```

2.  **Start the Frontend Development Server:**
    ```bash
    cd ../client
    npm run dev
    ```

Open your browser and navigate to `http://localhost:3000` (or your configured frontend port).

## Testing

### Backend Tests

```bash
cd server
npm test
```

### Frontend Tests

(To be implemented)

## Project Structure

- `server/`: NestJS backend application
- `client/`: Next.js frontend application

## Technologies Used

- **Backend:** NestJS, Prisma ORM, MongoDB, JWT, bcrypt, Swagger
- **Frontend:** Next.js, React, Material-UI, Redux Toolkit, Zod, next-intl
