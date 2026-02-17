# 🗺️ LakbayAR — Web-Based AR Tourism Platform

<<<<<<< HEAD
![LakbayAR](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhG0ICGMxoLE3kSKJ3AsOiYuxeW88pcAIPuMceoh7uSUCLzX2OI4Ngp5dO9qSsyGz7ecZ_O70qr7Lw4na-P4JpUzPn5sg7EBbT5WxxoVzGJ0hK3abuVo5vLknCbWk6tfcqoRwm8ezVpMkUl9vWConAtYInwq5Ro9Bx2rrXbvu3KxAOI1fDngFsXfg0S/s1169/Gingoog.png)
=======
![LakbayAR]([https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhG0ICGMxoLE3kSKJ3AsOiYuxeW88pcAIPuMceoh7uSUCLzX2OI4Ngp5dO9qSsyGz7ecZ_O70qr7Lw4na-P4JpUzPn5sg7EBbT5WxxoVzGJ0hK3abuVo5vLknCbWk6tfcqoRwm8ezVpMkUl9vWConAtYInwq5Ro9Bx2rrXbvu3KxAOI1fDngFsXfg0S/s1169/Gingoog.png))

>>>>>>> 790acb75c6b2f80f19a81a41793afdc312e74876

**LakbayAR** is a modern, web-based Augmented Reality (AR) tourism platform designed for **Gingoog City, Misamis Oriental**. It allows tourists to discover local landmarks, view historical information via AR overlays, and earn points through a gamified visitation system — all without installing a native app.

🔗 **Live Demo**: Coming Soon  
📍 **Focus Area**: Gingoog City, Misamis Oriental, Philippines

---

## ✨ Key Features

- **📍 Geolocation Discovery**: Automatically finds tourist spots near you using the Haversine formula.
- **📱 WebAR Experience**: Marker-based AR overlays directly in the browser (no app download required) using AR.js.
- **🏆 Gamification**: Earn points for visiting spots and climb the local leaderboard.
- **🧭 Navigation**: Seamless integration with Google Maps for turn-by-turn directions.
- **⚡ PWA Ready**: Installable as a progressive web app with offline support.
- **🎨 Modern UI**: Glassmorphism design system built with TailwindCSS.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **AR Engine**: [AR.js](https://ar-js-org.github.io/AR.js-Docs/)
- **State/Routing**: React Router v6
- **HTTP Client**: Axios

### Backend
- **Framework**: [Laravel 11](https://laravel.com/) (API)
- **Database**: MySQL
- **ORM**: Eloquent
- **Authentication**: Laravel Sanctum (configured)

---

## 🚀 Installation & Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js v18+
- MySQL Server

### 1️⃣ Backend Setup (Laravel)

```bash
# Clone the repository
git clone https://github.com/SVNFNTYDEV/LakbayAR.git
cd LakbayAR/backend

# Install PHP dependencies
composer install

# Configure environment
cp .env.example .env
# Edit .env and set DB_DATABASE=lakbayar, DB_USERNAME, DB_PASSWORD

# Generate app key
php artisan key:generate

# Run migrations and seed data (Gingoog City spots)
php artisan migrate:fresh --seed

# Start the development server
php artisan serve
```

### 2️⃣ Frontend Setup (React)

```bash
# Navigate to frontend directory
cd ../frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

---

## 📚 API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/spots` | Get all tourist spots |
| `GET` | `/api/spots/nearby` | Get spots near user (requires `lat`, `lng`) |
| `GET` | `/api/spots/{slug}` | Get specific spot details |
| `POST` | `/api/spots/{id}/visit` | Record a visit & award points |
| `GET` | `/api/leaderboard` | Get top users by points |

---

## 📸 Screenshots

| Landing Page | Explore Grid |
| :---: | :---: |
| ![Landing](https://placehold.co/600x400/0f172a/0ea5e9?text=Landing+Page) | ![Explore](https://placehold.co/600x400/0f172a/0ea5e9?text=Explore+Page) |

| AR Mode | Detail View |
| :---: | :---: |
| ![AR Mode](https://placehold.co/600x400/0f172a/0ea5e9?text=AR+Experience) | ![Detail](https://placehold.co/600x400/0f172a/0ea5e9?text=Detail+View) |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with 💙 by SVNFNTYDEV for Gingoog City Tourism.
