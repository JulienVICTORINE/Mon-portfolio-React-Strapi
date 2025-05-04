![Carte projets](./img/capture-exercice-Mon-portfolio.png)

# 🎨 Portfolio with Strapi Backend & ReactJS

## 📝 1. Project Description

This project is a personal portfolio built with **React.js** on the frontend and **Strapi** on the backend.
It displays a list of projects dynamically retrieved from a Strapi API, filterable by technology, and includes a functional **contact form** that:

- Stores messages in Strapi
- Sends an email via **EmailJS**

This combination allows for both instant communication and persistent data storage in your CMS.

## 🎯 Objectives

- Enable project consultation via a custom API
- Provide a seamless and responsive user experience
- Offer dynamic filtering by technology used
- Integrate a secure contact form connected to a database and email system

## 🧠 Key Features

- Dynamic project display with cover image and technology badges
- Real-time project filtering by selected technology
- Contact form :
  - Field validation
  - Save to Strapi database
  - Automatic email notification (via EmailJS)
- Responsive interface suitable for desktop, tablet, and mobile devices

---

## 🏗️ 2. Technical architecture
```txt
📁 docs/ # Auto-generated documentation (JSDoc)
📁 public/
📁 src/
├── App.jsx         	    # Main component
├── ContactForm.jsx 	    # React component for the contact form
└── ...
📄 jsdoc.json 				    # JSDoc configuration
📄 jsdoc.conf.json		    # A tool that automatically generates HTML documentation
📄 .env 						      # Environment variables for EmailJS
📁 strapi/ 						    # Strapi backend project (optional)
```

**Data flow:**

1. User submits the contact form
2. `ContactForm.jsx`:
   - Sends form data to Strapi: `POST /api/contacts`
   - Sends an email using `emailjs.sendForm(...)`
3. Displays success/error feedback to the user

Key components :
- `App.jsx` : Retrieves and displays projects with filters by technology.
- `ContactForm.jsx` : Manages form submission to Strapi and EmailJS.

---

## ⚙️ 3. Technologies used

| Layer             | Technology        | Part / Description                                                     |
|-------------------|------------------ |------------------------------------------------------------------------|
| Frontend UI       | **React**         | JavaScript library for building the user interface                     |
| Frontend UI       | **CSS**           | Manual formatting with CSS files                                       |
| Contact Workflow  | **EmailJS**       | Client-side email sending service without SMTP server                  |
| Backend CMS       | **Strapi**        | Headless CMS used as a backend to manage projects and contacts         |
| Backend CMS       | **Node.js**       | JavaScript runtime used by Vite and to run Strapi                      |
| Backend CMS       | **SQLite**        | Strapi default database                                                |
| Documentation     | **JSDoc**         | Documentation generator form code comments                             |
| Build Tool        | **Vite**          | Ultra-fast build tool for React development                            |

---

## 🚀 4. Installation Guide

### ✅ Prerequisites

- Node.js ≥ 18.x
- npm ≥ 9.x
- EmailJS account → [https://www.emailjs.com](https://www.emailjs.com)
- (Optional) Strapi CLI: `npm install -g create-strapi-app`

---

### 🧪 Frontend setup

```bash
# 1. Clone the repository
git clone https://github.com/JulienVICTORINE/Mon-portfolio-React-Strapi

# 2. Move into the folder
cd your-portfolio

# Install dependencies
npm install

🔐 EmailJS environment variables
Create a .env file at the root:

VITE_EMAILJS_SERVICE_ID=#######
VITE_EMAILJS_TEMPLATE_ID=#######
VITE_EMAILJS_PUBLIC_KEY=#######

# 3. Launch the frontend
npm run dev

The application will be available at http://localhost:5173
```

### 🧪 Backend setup

🗂️ Strapi setup (optional backend)
If using Strapi for data storage :

# Create your Strapi backend (if not already done)
```bash
cd strapi/
npm install
npm run dev

By default, Strapi runs on http://localhost:1337
```

---

## 🌍 5. Deployment Procedure

**Backend (Strapi)**
- Host on: Render, Railway, VPS, DigitalOcean App Platform, etc.
- Define the necessary environment variables.
- Don't forget to configure public permissions for `GET /api/projects` and `GET /api/technologies`.
- Ensure that permissions for the contact collection type are enabled.
- Configure CORS to allow requests from your frontend domain.

**Frontend (React)**
- Build du projet
```bash
npm run build
```
- Deployment on: Netlify, Vercel, GitHub Pages, etc.
- Set environment variables (EmailJS keys) in the platform settings

---

## 🗃️ 6. Data structure (Strapi tables)

🧱 Collection : `project`

| Field        | Type      | Relational database                   |
| ------------ | --------- | ------------------------------------- |
| title        | Text      | -                                     |
| description  | Text      | -                                     |
| link         | Text      | -                                     |
| cover        | Media     | -                                     |
| technologies | Relation  | Several `technology` (many-to-many)   |


🧱 Collection : `technology`

| Field        | Type     |
| ------------ | -------- |
| name         | Text     | 


🧱 Collection : `contact`

| Field        | Type          | Required     | Notes                                 |
| ------------ | ------------- | ------------ | ------------------------------------- |
| name         | Text          | ✅          | formData.name                         |
| email        | Email         | ✅          | formData.email                        |
| subject      | Text          | ✅          | formData.subject                      |
| message      | Rich text     | ✅          | formData.message                      |
| datecreation | DateTime      | ✅          | Generated via JavaScript              |

Make sure to allow the create permission for the Public role in Strapi → Settings → Users & Permissions → Roles.

---

## 📄 Documentation

La commande permettant de générer une documentation JSDoc dans un dossier [`docs/`] : 
```bash
npm run docs
```

![Contenu contactForm](./img/capture-contactForm-mon-portfolio.png)
