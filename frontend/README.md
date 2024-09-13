Here’s the detailed and professional README for the frontend configuration of the **MagNetJobs** project:

---

# 🌐 MagNetJobs - Frontend Configuration

Welcome to **MagNetJobs**, a platform where users can share their job experiences through photos, comments, likes, and followers. In this guide, we will walk you through setting up the **Next.js** frontend environment to work with the **Django REST API** backend.

## 🗂️ Index

- [🌐 MagNetJobs - Frontend Configuration](#-magnetjobs---frontend-configuration)
  - [🗂️ Index](#️-index)
  - [🔍 Overview](#-overview)
  - [⚛️ Frontend Environment Setup](#️-frontend-environment-setup)
    - [Step 1: Installing Dependencies](#step-1-installing-dependencies)
    - [Step 2: Creating the `.env.local` File](#step-2-creating-the-envlocal-file)
    - [Step 3: Running the Development Server](#step-3-running-the-development-server)
    - [📝 Important Note: Running Frontend with Backend](#-important-note-running-frontend-with-backend)

---

## 🔍 Overview

The **MagNetJobs** frontend is built using **Next.js**, a powerful React framework. This frontend interacts with the backend **Django REST API** to create a seamless user experience. In this guide, you will learn how to set up the frontend environment and run it in development mode.

---

## ⚛️ Frontend Environment Setup

### Step 1: Installing Dependencies

To get started with the frontend, first install all the necessary dependencies. Ensure you are in the frontend project directory, then run the following command:

```bash
npm install
```

This will install all the packages listed in `package.json`, ensuring that your frontend environment is set up with all the tools needed to run the project.

---

### Step 2: Creating the `.env.local` File

Next, you'll need to create a `.env.local` file to store your environment variables for local development. This file will contain the URLs for interacting with the backend API.

1. In the root of your frontend project directory, create a `.env.local` file:

   ```bash
   touch .env
   ```

2. Add the following content to the `.env` file:

   ```bash
   LOCAL_API_URL=http://localhost:8000
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Save the file. These URLs point to your local Django server, which should be running simultaneously with the frontend.

---

### Step 3: Running the Development Server

Now that your environment is set up, you can run the **Next.js** development server. You have two options:

1. **Run with Turbo Mode** *(Experimental)*:
   
   ```bash
   npm run dev --turbo
   ```

   The `--turbo` flag enables **Turbo Mode**, which offers faster build times. However, this feature is still experimental, so if you encounter any issues, try running the server without it.

2. **Run without Turbo Mode**:

   ```bash
   npm run dev
   ```

Once the server is running, you should see an output similar to this:

```
ready - started server on http://localhost:3000
```

The frontend will be accessible at `http://localhost:3000`.

---

### 📝 Important Note: Running Frontend with Backend

Both the **frontend** and **backend** need to be running simultaneously for the **MagNetJobs** app to function correctly. Make sure the Django backend server is up and running before you start the frontend. You can refer to the backend setup instructions for starting the server if needed.

- **Backend**: Runs at `http://localhost:8000`
- **Frontend**: Runs at `http://localhost:3000`

Ensure both are running to achieve seamless communication between the two parts of the app.

---

With the frontend environment now set up, you’re ready to build out the user-facing components of **MagNetJobs**. Happy coding!

---

