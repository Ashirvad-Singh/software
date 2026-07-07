# Backend Integration Setup Guide

This guide provides step-by-step instructions to configure your own Firebase (Database & Auth), Cloudinary (Image Hosting), and EmailJS (Automated Emails) accounts for this project.

## 1. Local Environment Setup

1. Make sure you have **Node.js** installed on your system.
2. Open your terminal in the project folder and run:
   ```bash
   npm install
   ```
3. Create a new file named `.env` in the root of your project folder (right next to `package.json`).
4. Add the following empty variables to your `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   
   VITE_CLOUDINARY_CLOUD_NAME=
   VITE_CLOUDINARY_UPLOAD_PRESET=
   
   VITE_EMAILJS_PUBLIC_KEY=
   VITE_EMAILJS_SERVICE_ID=
   VITE_EMAILJS_TEMPLATE_ID=
   ```

---

## 2. Firebase Setup (Database & Authentication)

Firebase handles the admin login, storing contact inquiries, job applications, portfolio projects, and blogs.

### Step 2.1: Create Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add Project"**, give it a name (e.g., "Adat Soft Solutions"), and follow the prompts.
3. Once created, click on the **Web icon (</>)** to register your web app.
4. Copy the `firebaseConfig` keys provided and paste them into your `.env` file for the respective variables created in Step 1.

### Step 2.2: Enable Authentication
1. In the left sidebar of the Firebase console, go to **Build -> Authentication**.
2. Click **"Get Started"**, then go to the **"Sign-in method"** tab.
3. Click on **Email/Password**, enable it, and click Save.
4. Go to the **"Users"** tab and click **"Add User"**.
5. Enter the email and password you want to use for your **Admin Dashboard Login**. 

### Step 2.3: Enable Firestore Database
1. Go to **Build -> Firestore Database**.
2. Click **"Create database"** and start in **Test Mode** (you can update security rules later).
3. The database is now ready to store inquiries, applications, and website content.

---

## 3. Cloudinary Setup (Image Uploads)

Cloudinary handles image uploads from your admin dashboard (for blogs, gallery, etc.).

1. Create a free account at [Cloudinary](https://cloudinary.com/).
2. Go to your **Dashboard** and note down your **Cloud Name**.
3. Go to **Settings -> Upload** and scroll down to **Upload presets**.
4. Click **"Add upload preset"**.
5. Set the **Signing Mode** to **"Unsigned"**.
6. Note down the **Upload preset name**.
7. Add your **Cloud Name** and **Upload Preset** to your `.env` file under `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`.

---

## 4. EmailJS Setup (Automated Emails)

EmailJS sends automated emails to candidates when they apply for a job or when you update their status in the dashboard.

1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. Go to **Email Services** and click **"Add New Service"** (e.g., connect a Gmail account). Note down the **Service ID**.
3. Go to **Email Templates** and create a new template.
   - Use these exact variables in your template body: `{{to_name}}`, `{{position}}`, and `{{message}}`.
   - In the "To Email" setting of the template, put `{{to_email}}`.
   - Save the template and note down the **Template ID**.
4. Go to **Account -> API Keys** and note down your **Public Key**.
5. Add your **Public Key**, **Service ID**, and **Template ID** to your `.env` file under `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, and `VITE_EMAILJS_TEMPLATE_ID`.

---

## 5. Start the Application

Once you have configured the `.env` file, Cloudinary, and EmailJS, run the following command in your terminal:

```bash
npm run dev
```

You can now log in to `/dashboard` using the email and password you created in Firebase!
