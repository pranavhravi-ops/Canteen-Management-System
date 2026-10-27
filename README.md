<<<<<<< HEAD
# Canteen Management System

React frontend + Flask API + PostgreSQL database.

## Requirements
- Node.js LTS with npm
- Python 3.10+
- PostgreSQL

## 1. Configure PostgreSQL
Create a database named `canteen`. The original archive does not include the SQL schema or a database dump, so use the schema supplied by your project/course if you have it. The Flask code expects these tables/columns: `cart(name, price, quantity)`, `orders(id, name, price, quantity, order_time)`, `customers(id, name, email, phone, gender, location, created_at)`, `feedback(id, feedback, submitted_at)`, and `food(name, category)`. Ensure the column types match your data.

## 2. Run the Flask backend (Windows PowerShell)
From this project folder:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:DB_NAME="canteen"
$env:DB_USER="postgres"
$env:DB_PASSWORD="YOUR_LOCAL_POSTGRES_PASSWORD"
$env:DB_HOST="localhost"
$env:DB_PORT="5432"
$env:FRONTEND_ORIGIN="http://localhost:3000"
$env:FLASK_DEBUG="true"
python app.py
```

Backend runs at `http://localhost:5000`. Keep this terminal open.

## 3. Run the React frontend
Open a second terminal in the project folder:

```powershell
Copy-Item .env.example .env
npm ci
npm start
```

React opens at `http://localhost:3000`. If `npm ci` fails, try `npm install` and check that you have a supported Node.js LTS version.

## 4. Before pushing to GitHub
- Never commit `.env`, passwords, tokens, or private database URLs.
- Rotate any database password or API key that was previously committed or shared.
- Review the project for other credentials.
- Create an empty GitHub repository, then run from the project folder:

```bash
git init
git add .
git status
git commit -m "Prepare canteen management system"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## 5. Deployment outline
1. Create a managed PostgreSQL database with your hosting provider and create the required tables.
2. Deploy this Flask API as a Python web service. Build/install command: `pip install -r requirements.txt`. Start command: `gunicorn app:app`.
3. Set the backend environment variables in the hosting dashboard: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_SSLMODE=require`, and `FRONTEND_ORIGIN` (your deployed frontend URL).
4. Deploy the React app as a static site. Build command: `npm ci && npm run build`; publish directory: `build`.
5. Set `REACT_APP_API_URL` to the deployed Flask API base URL before building the frontend. If using weather, set `REACT_APP_OPENWEATHER_API_KEY` and restrict that key to your frontend domain.
6. Redeploy the frontend after setting its environment variables. Test adding a customer, cart/order, feedback, dashboard analytics, and browser console/network errors.

The frontend must be rebuilt after changing `REACT_APP_*` variables. Database tables and production data are not included in this source archive.
=======
# Canteen-Management-System
>>>>>>> 9bc11ee (Initial commit)
