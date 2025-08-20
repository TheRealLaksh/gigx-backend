# 🎯 GigX Platform – Fullstack (Backend + Frontend)

The **GigX Platform** is a fullstack web application designed for connecting **job seekers (freelancers)** and **job providers (clients/companies)** in a streamlined way.  

It is built with a **Django REST Framework backend** that powers authentication, user management, and gig CRUD operations,  
and a **modern frontend (HTML, CSS, JavaScript)** that consumes these APIs to deliver a clean, interactive, and professional user experience.  

This project is structured and implemented following **industry-standard best practices** to demonstrate:
- How to design a **scalable Django backend** with modular apps (`users` and `gigs`)
- How to implement **secure JWT-based authentication**
- How to handle **role-based access control** (Seeker vs. Provider)
- How to integrate a **frontend client** with REST APIs for seamless end-to-end functionality
- How to add a **CLI testing utility** for developers to quickly test APIs without Postman
- How to prepare a project for **deployment** with Gunicorn, PostgreSQL, and static file handling

Use Cases:
- 👤 A **Seeker** can register, browse gigs, and apply.
- 🏢 A **Provider** can register (with company name), create gigs, edit/update them, and delete gigs they posted.
- 🖥️ Admin can manage users and gigs via Django Admin.
- 🎯 Developers can test all endpoints using **curl**, **Postman**, or the provided **cli_test.py script**.

Key highlights:
- 🔐 User registration, login, JWT authentication  
- 👥 Custom roles (Seeker & Provider)  
- 💼 CRUD operations for gigs (create, read, update, delete)  
- 🔎 Search & filter gigs by title  
- 🖥️ CLI testing tool for developers  
- 🌐 Responsive frontend integrated with backend APIs  

---

## 📂 Project Structure
gigx_platform_backend/

├── gigs/               
├── users/              
├── gigx_platform/      
├── staticfiles/         
├── venv/               
├── db.sqlite3          
├── manage.py           
├── cli_test.py         
├── requirements.txt    
└── runtime.txt         

frontend/

├── css/

│   ├── create-gig.css

│   ├── dashboard.css

│   ├── gig_detail.css

│   └── index.css

├── js/

│   ├── app.js

│   ├── create-gig.js

│   ├── dashboard.js

│   └── gig_detail.js

├── templates/

│   ├── create-gig.html

│   ├── dashboard.html

│   └── gig_detail.html

└── index.html


---


## ⚙️ Setup Instructions

1️⃣ Clone the Repository
git clone https://github.com/TheRealLaksh/User-Registration-Authentication.git
cd User-Registration-Authentication/gigx_platform_backend

2️⃣ Create Virtual Environment
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux / Mac)
source venv/bin/activate

3️⃣ Install Dependencies
pip install -r requirements.txt

📦 requirements.txt includes:
Django==5.0.6  
djangorestframework==3.15.2  
djangorestframework-simplejwt==5.3.1  
gunicorn  
psycopg2-binary  
dj-database-url  
requests  
django-cors-headers  

4️⃣ Run Migrations
python manage.py makemigrations  
python manage.py migrate  

5️⃣ Create Superuser (Admin)
python manage.py createsuperuser  

6️⃣ Start the Server
python manage.py runserver  

👉 Server runs at: http://127.0.0.1:8000

---

## 🔑 API Endpoints

Users:
POST   /api/users/register/   → Register  
POST   /api/users/login/      → Login & get JWT  
POST   /api/users/logout/     → Logout (blacklist refresh token)  
DELETE /api/users/delete/     → Delete own account  

Gigs:
GET    /gigs/           → List all gigs  
GET    /gigs/<id>/      → Get single gig  
POST   /gigs/           → Create gig (auth required)  
PUT    /gigs/<id>/      → Update gig (creator only)  
DELETE /gigs/<id>/      → Delete gig (creator only)  
GET    /gigs/?search=   → Filter gigs by title  

---

## 📝 Example Requests

Register User:
POST /api/users/register/
{
  "name": "Laksh Pradhwani",
  "email": "laksh@example.com",
  "phone": "9876543210",
  "city": "Varanasi",
  "password": "TestPass123",
  "role": "provider",
  "company_name": "Acme Pvt Ltd"
}

Login:
POST /api/users/login/
{
  "email": "laksh@example.com",
  "password": "TestPass123"
}

Create Gig:
POST /gigs/
Authorization: Bearer <access_token>
{
  "title": "Website Development",
  "description": "Build a portfolio site in React",
  "amount": 500
}

Update Gig:
PUT /gigs/1/
Authorization: Bearer <access_token>
{
  "title": "Updated Website Development",
  "description": "Modern responsive portfolio with animations",
  "amount": 750
}

Delete Gig:
DELETE /gigs/1/
Authorization: Bearer <access_token>

---

## 🖥️ CLI Testing

We provide a script `cli_test.py` that allows you to test all Gig APIs directly from the terminal using Python’s `requests` library.

Run CLI Test:
python cli_test.py

It will:
- Register/Login a user
- Create a gig
- List gigs
- Update a gig
- Delete a gig

---

## 🎨 Frontend (Static HTML/CSS/JS)

Frontend lives inside `/frontend` and connects with the backend APIs.

Run Frontend:
Just open `frontend/index.html` in a browser.  
By default, it points to:
- `http://127.0.0.1:8000` (when running locally)
- `https://user-registration-authentication.lakshp.live` (when deployed)

Pages:
- `index.html` → Login/Register
- `dashboard.html` → List & manage gigs
- `create-gig.html` → Create a new gig
- `gig_detail.html` → View gig details (+ edit/delete if owner)

---

## ✅ Submission Checklist
- [x] Gig model with all fields
- [x] CRUD APIs implemented
- [x] Filtering implemented
- [x] Gigs linked to users
- [x] APIs tested with Postman & CLI
- [x] Frontend integrated
