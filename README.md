# E-Club Membership System

A university club management project with a static frontend and a Django REST backend.

## System Overview

This repository contains:
- A vanilla JavaScript frontend with HTML pages and CSS styles
- A Django backend API in `e_club_membership_system/`
- Data models for students, clubs, applications, events, and announcements
- Client-side localStorage usage for session state, theme, and fallback data

## Project Structure

```
E-Club-Membership-System/
├── admin-applications.html       # Static admin review page
├── admin.html                    # Static admin UI template
├── announcements.html            # Announcements page
├── apply.html                    # Club application page
├── clubs.html                    # Club browsing page
├── club-details.html             # Club detail page
├── dashboard.html                # Student dashboard
├── events.html                   # Events page
├── index.html                    # Landing/home page
├── login.html                    # Student login page
├── register.html                 # Student registration page
├── status.html                   # Application status page
├── css/
│   ├── admin.css
│   ├── dashboard.css
│   └── style.css
├── js/
│   ├── app.js
│   ├── application.js
│   ├── auth.js
│   ├── clubs.js
│   ├── dashboard.js
│   ├── storage.js
│   └── ...
├── e_club_membership_system/
│   ├── blog/
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── e_club_membership_system/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
├── manage.py
├── db.sqlite3                    # Local database file
└── e-Clubvenv/                   # Python virtual environment
```

## Key Features

### Student Features
- Register and login through backend API
- Browse clubs and search/filter by category
- View club details, announcements, and events
- Apply for club membership with a motivation statement
- Track application status on the status page
- Access a student dashboard with summary stats
- Remember login email and theme preference using localStorage

### Backend Features
- Django REST API endpoints for student auth and data
- Models for `Student`, `Club`, `Application`, `Event`, and `Announcement`
- Admin routes available via Django admin (`/admin/`)
- JWT token endpoints configured in settings (`/api/token/`, `/api/token/refresh/`)

### Technical Details
- Frontend: HTML, CSS, JavaScript
- Backend: Django, Django REST Framework, `django-cors-headers`
- LocalStorage used for theme, session, and some fallback data
- Club data is fetched from backend API at `http://127.0.0.1:8000`

## API Endpoints

- `POST /api/register/` — create student account
- `POST /api/login/` — login
- `GET /api/clubs/` — list clubs
- `POST /api/apply/` — submit application
- `GET /api/my-applications/?student_id=<id>` — get student applications
- `GET /api/applications/` — list all applications
- `POST /api/application/<id>/approve/` — approve application
- `POST /api/application/<id>/reject/` — reject application
- `GET /api/events/` — list events
- `GET /api/announcements/` — list announcements
- `GET /api/dashboard/` — summary counts

## Required Setup

### Prerequisites
- Python 3
- Browser (Chrome, Firefox, Edge, Safari)
- PostgreSQL if using the current Django database settings, or update `DATABASES` in `e_club_membership_system/e_club_membership_system/settings.py`

### Run Backend Server
1. Activate the virtual environment:
   - PowerShell: `.
   e-Clubvenv\Scripts\Activate.ps1`
   - Command Prompt: `.
   e-Clubvenv\Scripts\activate.bat`
2. Install requirements if needed:
   - `pip install django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary`
3. Run the Django server:
   - `python manage.py runserver`
4. Confirm backend is available at `http://127.0.0.1:8000`

### Open Frontend
- Open `index.html` in your browser
- For full functionality, keep the Django backend running

## Pages

### Public
- `index.html` — Home/landing page
- `clubs.html` — Club listings and search
- `club-details.html` — Club detail view
- `events.html` — Events listing
- `announcements.html` — Announcements listing

### Authentication
- `register.html` — Registration page
- `login.html` — Login page

### Protected
- `dashboard.html` — Student dashboard
- `apply.html` — Apply for club membership
- `status.html` — View your application status

### Admin
- `admin.html` / `admin-applications.html` — Frontend admin UI templates
- `/admin/` — Django backend admin panel

## Data Storage Notes

- Backend stores actual student, club, application, event, and announcement data
- Frontend stores session and preference data in browser localStorage:
  - `student` — logged-in user session
  - `rememberedEmail` — saved login email
  - `theme` — dark/light theme selection
- `StorageManager` initializes default club, event, and announcement data in localStorage when missing

## How to Use

### Register
1. Open `register.html`
2. Enter name, email, password, confirm password, and year of study
3. Submit to create a backend user

### Login
1. Open `login.html`
2. Enter email and password
3. On success, the student is saved in localStorage and redirected to `dashboard.html`

### Apply
1. Open `apply.html`
2. Select a club and enter motivation
3. Submit to send the application to the backend

### Track Status
- Open `status.html` to load applications from the backend

### Dashboard
- Open `dashboard.html` to view club counts and application summary

## Notes and Known Behavior

- Some frontend pages use fetch requests to `http://127.0.0.1:8000`
- The Django settings file is currently configured for PostgreSQL
- Static admin pages are present, but backend data management is best done through Django admin
- The project is a demonstration and not production-ready

## Suggested Improvements

- Wire the static admin pages to backend API endpoints
- Add proper token/auth handling for all frontend pages
- Use a shared backend data source instead of mixed localStorage fallback
- Add a `requirements.txt` for reproducible installs
- Improve validation and error handling in frontend forms

## License

This repository is provided for educational purposes.

