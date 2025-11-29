# 🥗 Diet Balance - Advanced Nutrition Analysis System

A comprehensive web application designed to help analyze dietary habits, detect nutrient deficiencies, and provide personalized dietary recommendations, particularly for children and adolescents aged 4-18 years.

## 🌟 Project Overview

Diet Balance is a full-stack nutrition tracking and analysis system that empowers users to monitor their nutritional intake, identify deficiencies, and receive AI-powered recommendations. The application features separate dashboards for users and administrators, with comprehensive analytics and health tracking capabilities.

## ✨ Key Features

### 👤 User Features

1. **Personalized Nutrition Tracking**
   - Log daily meals with detailed nutrient information
   - Track intake of calories, protein, iron, vitamin C, calcium, and vitamin D
   - Real-time comparison with age-appropriate Recommended Daily Allowances (RDA)

2. **Deficit Detection & Alerts**
   - Automatic identification of nutrient deficiencies
   - Visual alerts for critical deficits
   - Color-coded progress indicators

3. **Smart Recommendations**
   - AI-powered food suggestions based on individual nutrient gaps
   - Personalized meal recommendations
   - Priority-based suggestions for critical deficiencies

4. **Personalized Diet Plans**
   - Generate complete daily meal plans
   - Tailored to age group and nutritional needs
   - Expected nutrient totals for each plan

5. **Progress Tracking & Analytics**
   - Overall health score calculation
   - Visual progress charts and graphs
   - Historical health data tracking
   - Nutrient-specific progress bars

6. **Health Insights Dashboard**
   - Comprehensive nutrient breakdown
   - Percentage completion for each nutrient
   - Visual health score indicators

### 👨‍💼 Admin Features

1. **Comprehensive Analytics Dashboard**
   - Overview statistics (total foods, users, health records)
   - Average nutrient deficiency analysis
   - Top critical deficiencies identification
   - User distribution charts

2. **Food Database Management**
   - Add, edit, and delete food items
   - Complete nutrient information per food
   - Searchable food database

3. **RDA Management**
   - Edit Recommended Daily Allowances by age group
   - Inline editing for quick updates
   - Support for ages 4-8, 9-13, and 14-18

4. **User Health Tracking**
   - View all user health records
   - Track user health status
   - Identify users with critical deficiencies
   - Health data analytics

5. **Data Visualization**
   - Bar charts for nutrient deficiencies
   - Doughnut charts for user distribution
   - Interactive data tables
   - Real-time statistics

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI library
- **React Router** - Client-side routing
- **Chart.js** - Data visualization
- **Vite** - Fast build tool
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **RESTful API** - API architecture
- **JSON Storage** - Data persistence

## 📁 Project Structure

```
project/
├── src/
│   ├── App.jsx              # Main app component with routing
│   ├── App.css             # Global styles
│   ├── index.css           # Base styles
│   ├── HomePage.jsx        # Landing page
│   ├── SignIn.jsx          # Sign in component
│   ├── SignUp.jsx          # Sign up component
│   ├── UserDashboard.jsx   # User dashboard with all features
│   ├── AdminDashboard.jsx # Admin dashboard with analytics
│   ├── nutritionData.js   # Nutrition data and RDA definitions
│   └── recommendationEngine.js # AI recommendation algorithms
├── server/
│   ├── index.js            # Express server and API endpoints
│   ├── storage.js          # Data persistence utilities
│   └── data/
│       └── users.json      # User data storage
└── public/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kl2400031790/project.git
cd project/project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
# Recommended: Start both frontend and backend together
npm run dev:full

# Or start separately in different terminals:
# Terminal 1 - Backend:
npm run server   # Backend only (port 5174)

# Terminal 2 - Frontend:
npm run dev      # Frontend only (port 5173)
```

**Important:** The backend server must be running for the application to work properly. If you see `ECONNREFUSED` errors, it means the backend is not running. Use `npm run dev:full` to start both servers together.

4. Open your browser:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5174

## 🔐 Demo Accounts

### User Account
- **Email:** user@example.com
- **Password:** user123

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login

### Foods
- `GET /api/foods` - Get all foods
- `POST /api/foods` - Add new food
- `PUT /api/foods/:id` - Update food
- `DELETE /api/foods/:id` - Delete food

### RDAs
- `GET /api/rdas` - Get all RDAs
- `PUT /api/rdas/:id` - Update RDA

### Meals
- `GET /api/meals/:userId` - Get user meals
- `POST /api/meals/:userId` - Add meal entry

### Health Data
- `POST /api/user/health-data` - Save health data
- `GET /api/user/health-history/:userId` - Get health history
- `GET /api/admin/health-data` - Get all health data (admin)

### Recommendations
- `POST /api/recommendations` - Get personalized recommendations

### Users
- `GET /api/users` - Get all users (admin)

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with gradient accents
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Charts**: Real-time data visualization with Chart.js
- **Glassmorphism Effects**: Modern UI with backdrop blur effects
- **Smooth Animations**: Hover effects and transitions
- **Color-Coded Alerts**: Visual indicators for health status
- **Tabbed Navigation**: Organized content in tabs
- **Progress Indicators**: Visual progress bars and health scores

## 📈 Key Metrics Tracked

1. **Calories** - Daily energy intake
2. **Protein (g)** - Essential for growth
3. **Iron (mg)** - Prevents anemia
4. **Vitamin C (mg)** - Immune system support
5. **Calcium (mg)** - Bone development
6. **Vitamin D (IU)** - Bone health and immunity

## 🎯 Age Groups Supported

- **4-8 years**: Early childhood nutrition
- **9-13 years**: Pre-adolescent nutrition
- **14-18 years**: Adolescent nutrition

## 🔍 Key Algorithms

### Deficit Calculation
- Compares actual intake vs. RDA
- Calculates gaps for each nutrient
- Prioritizes critical deficiencies

### Recommendation Engine
- Scores foods based on nutrient content
- Weighted algorithm for priority nutrients
- Suggests foods that best address deficits

### Health Score
- Calculates overall nutritional health percentage
- Based on completion of all nutrient targets
- Color-coded status indicators

## 🎓 Educational Value

This project demonstrates:
- Full-stack web development
- RESTful API design
- Data visualization
- User authentication
- Real-time analytics
- Responsive design
- Modern React patterns
- State management
- Algorithm implementation

## ⚠️ Troubleshooting

### Backend Connection Errors
If you see `ECONNREFUSED` errors in the console:
1. Make sure the backend server is running on port 5174
2. Use `npm run dev:full` to start both servers together
3. Or start the backend separately: `npm run server`

### Port Already in Use
If port 5174 is already in use:
- Stop the process using that port
- Or change the port in `server/index.js` and update `vite.config.js` proxy target

### Google Password Manager Modal
If you see a modal about password breaches appearing:
- This is from Google's browser extension, not the application
- To disable: Chrome/Edge Settings → Privacy and security → Password Manager → Turn off "Warn you if passwords are exposed in a data breach"
- Or disable the Google Password Manager extension from your browser's extension settings

## 📝 Future Enhancements

- [ ] Mobile app version
- [ ] Meal photo recognition
- [ ] Integration with fitness trackers
- [ ] Multi-language support
- [ ] Export health reports
- [ ] Email notifications
- [ ] Social sharing features
- [ ] Advanced meal planning algorithms

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Developed as a comprehensive nutrition analysis system for educational and healthcare purposes.

---

**Made with ❤️ for better nutrition and health**
