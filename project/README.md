# Express.js Project Setup Guide

## Directory Structure
```
project/
├── app.js
├── package.json
└── public/
    ├── index.html
    ├── about.html
    ├── contact.html
    └── 404.html
```

## What You Have

### 1. **app.js** - Express Server
- Sets up your Node.js/Express application
- Serves static files from the `public/` folder
- Handles routing for Home, About, and Contact pages
- Catches 404 errors and serves a custom error page

### 2. **package.json** - Dependencies
- Lists Express.js as a dependency
- Includes nodemon for development (auto-restart on file changes)
- Defines npm scripts: `npm start` and `npm run dev`

### 3. **public/ folder** - Static Files
All HTML files served here:
- **index.html** - Home page
- **about.html** - About page
- **contact.html** - Contact page with a form
- **404.html** - Custom 404 error page

---

## Quick Start

### Step 1: Initialize the Project
```bash
npm install
```
This installs Express and nodemon.

### Step 2: Start the Server
```bash
npm start
```
Or for development with auto-reload:
```bash
npm run dev
```

### Step 3: Open in Browser
Visit: `http://localhost:3000`

---

## How It Works

### Static File Serving (Part 3)
In `app.js`:
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```
This line serves all files in the `public/` folder directly. You can access:
- `/public/about.html` → `http://localhost:3000/public/about.html`
- CSS files, images, JS files from public folder automatically

### Route Handling (Part 2)
Routes are explicitly defined:
```javascript
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
```

### 404 Handler
```javascript
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
```
Any undefined route shows the custom 404.html page.

---

## Customization Tips

- **Change port**: Edit `const PORT = 3000;` in app.js
- **Add more routes**: Follow the pattern for `/about` and `/contact`
- **Add CSS/JS files**: Put them in the `public/` folder and reference them in HTML
- **Handle form submissions**: Add POST routes in app.js for form data

---

## File Locations
All files are ready in `/home/claude/`:
- app.js
- package.json
- public/index.html
- public/about.html
- public/contact.html
- public/404.html
