Here’s the updated README with the additional note about running the frontend and backend simultaneously:

---

# 📸 MagNetJobs - Backend Configuration

Welcome to **MagNetJobs**, an innovative platform where users can share their job experiences through photos and comments, akin to a hybrid of LinkedIn and Instagram. This project enables you to share experiences, receive likes, and gain followers, creating a social networking environment tailored for professionals.

## 🗂️ Index

- [📸 MagNetJobs - Backend Configuration](#-magnetjobs---backend-configuration)
  - [🗂️ Index](#️-index)
  - [🔍 Overview](#-overview)
  - [⚙️ Backend Environment Setup](#️-backend-environment-setup)
    - [Step 1: Setting Up a Virtual Environment](#step-1-setting-up-a-virtual-environment)
    - [Step 2: Creating the `.env` File](#step-2-creating-the-env-file)
    - [Step 3: Installing Dependencies](#step-3-installing-dependencies)
    - [Step 4: Running the Django Server](#step-4-running-the-django-server)
  - [⚛️ Frontend Environment Setup](#️-frontend-environment-setup)
  - [📝 Important Note: Running Frontend with Backend](#-important-note-running-frontend-with-backend)
  
---

## 🔍 Overview

The **MagNetJobs** backend is powered by a **Django REST API**, which forms the backbone of this app by managing data interactions between the frontend and the database.

In this guide, we'll walk you through setting up the backend environment, from creating a virtual environment to running the Django server. This setup assumes you are familiar with Python and have **Django** installed. If not, instructions will be provided where necessary.

---

## ⚙️ Backend Environment Setup

### Step 1: Setting Up a Virtual Environment

We strongly recommend using a virtual environment to manage your Python packages and dependencies to avoid conflicts. Follow these steps to create and activate your virtual environment:

1. **Create a Virtual Environment:**

   ```bash
   python -m venv venv
   ```

2. **Activate the Virtual Environment:**

   - On **Windows**:

     ```bash
     venv\Scripts\activate
     ```

   - On **macOS/Linux**:

     ```bash
     source venv/bin/activate
     ```

3. **Ensure Virtual Environment Remains Active:**

   - To avoid any disconnections or potential issues with the virtual environment, always activate it before running any commands.
   - If you're using **VSCode**, set the Python interpreter to the virtual environment (install the Python extension if you haven't already):
     - Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS).
     - Select `Python: Select Interpreter`.
     - Choose the interpreter inside your `venv`.

   Make sure your terminal indicates that the virtual environment is active before proceeding (you’ll see `(venv)` before the prompt).

---

### Step 2: Creating the `.env` File

To connect to the **PostgreSQL database**, you need to create an `.env` file with the appropriate environment variables.

1. In the root of your project directory, create a `.env` file:

   ```bash
   touch .env
   ```

2. Add the following database connection details to the `.env` file:

   ```bash
   PGHOST='ep-little-firefly-a57rqv5w.us-east-2.aws.neon.tech'
   PGDATABASE='neondb'
   PGUSER='neondb_owner'
   PGPASSWORD='7H8sGizhtpBy'
   ```

3. Save the `.env` file. Ensure this file is listed in your `.gitignore` to avoid exposing sensitive information.

---

### Step 3: Installing Dependencies

Once the virtual environment is activated and the `.env` file is set up, you need to install the required packages. These dependencies are listed in the `requirements.txt` file.

To install the dependencies, run the following command:

```bash
pip install -r requirements.txt
```

Ensure all packages are installed successfully. If any issues arise, double-check your Python version and package compatibility.

---

### Step 4: Running the Django Server

Now that everything is configured, it's time to start your **Django development server**.

1. Run the server using the following command:

   ```bash
   python manage.py runserver
   ```

2. If the server starts successfully, you’ll see output similar to the following:

   ```
   Watching for file changes with StatReloader
   Performing system checks...

   System check identified no issues (0 silenced).
   September 12, 2024 - 10:00:00
   Django version 4.0, using settings 'MagNetJobs.settings'
   Starting development server at http://127.0.0.1:8000/
   ```

3. You can now access the **MagNetJobs** backend at `http://127.0.0.1:8000/`.

---

## ⚛️ Frontend Environment Setup

For setting up the frontend, refer to the frontend-specific README instructions. Remember, the frontend interacts with this backend to retrieve and send data.

---

## 📝 Important Note: Running Frontend with Backend

Both the **frontend** and **backend** need to be running simultaneously for the **MagNetJobs** application to function properly. Ensure that:

- The **backend** server is running at `http://localhost:8000`.
- The **frontend** server (Next.js) is running at `http://localhost:3000`.

Without both servers running, the full functionality of the application will not be available.

---

