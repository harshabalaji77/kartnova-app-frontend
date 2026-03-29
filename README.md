## Kartnova Frontend

A modern, responsive e-commerce frontend application built with React and Vite. Kartnova provides a seamless shopping experience with customer and admin interfaces, featuring product browsing, cart management, order processing, and administrative controls.

### 🚀 Features

#### Customer Experience
- **User Authentication**: Secure login and registration system
- **Product Browsing**: Browse products with intuitive category navigation
- **Shopping Cart**: Add/remove items, update quantities in real-time
- **Order Management**: View order history and track delivery status
- **Product Discovery**: Explore dedicated products section
- **About Section**: Learn more about the platform
- **Responsive Design**: Optimized experience across desktop, tablet, and mobile

#### Admin Dashboard
- **Admin Interface**: Comprehensive dashboard for store management
- **Secure Admin Access**: Separate authentication for administrators
- **Product Management**: Add, edit, and remove products efficiently
- **Order Oversight**: View and manage customer orders

### 🛠️ Tech Stack

- **Frontend**: React 19.2.0 with modern hooks and patterns
- **Build Tool**: Vite 7.3.1 for lightning-fast development and builds
- **Routing**: React Router DOM 7.13.0 for seamless navigation
- **Styling**: CSS3 with modular, component-based architecture
- **Code Quality**: ESLint with React-specific rules and best practices
- **Development**: Hot Module Replacement (HMR) for instant updates

### 📦 Quick Start

#### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

#### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd kartnova-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser
# Navigate to http://localhost:5173
```

### 🎯 Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build optimized production version
npm run preview  # Preview production build locally
npm run lint     # Run ESLint for code quality checks
```

### 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CartIcon.jsx           # Shopping cart indicator
│   ├── CategoryNavigation.jsx # Product category browser
│   ├── CustomModal.jsx        # Reusable modal component
│   ├── Footer.jsx             # Application footer
│   ├── Header.jsx             # Application header
│   ├── Logo.jsx               # Brand logo component
│   ├── ProductList.jsx        # Product grid display
│   └── ProfileDropdown.jsx    # User profile menu
├── pages/              # Page-level components
│   ├── AboutPage.jsx          # About the platform information
│   ├── AdminDashboard.jsx     # Admin main interface
│   ├── AdminLogin.jsx         # Admin authentication
│   ├── CartPage.jsx           # Shopping cart page
│   ├── HomePage.jsx           # Customer main interface
│   ├── LoginPage.jsx          # Customer authentication
│   ├── OrderPage.jsx          # Order management
│   ├── ProductsPage.jsx      # Products browsing section
│   └── RegistrationPage.jsx   # New user registration
├── styles/             # Global and component styles
│   └── styles.css             # Main stylesheet
├── assets/             # Static assets and images
├── App.jsx             # Main application component
├── Routes.jsx          # Application routing configuration
└── main.jsx            # Application entry point
```

### �️ Architecture Overview

Kartnova follows a modern React architecture with clear separation of concerns:

- **Component-Based Architecture**: Reusable UI components with single responsibility
- **Route-Driven Navigation**: Client-side routing with React Router DOM
- **State Management**: React hooks for local state and component communication
- **Modular Styling**: CSS modules and component-specific stylesheets
- **Responsive Design**: Mobile-first approach with fluid layouts

### 🔧 Development Environment

- **Hot Module Replacement**: Instant development feedback
- **ESLint Integration**: Code quality and consistency enforcement
- **Modern JavaScript**: ES6+ features and async/await patterns
- **Component Lifecycle**: React 19 hooks-based development

### � Application Routes

#### Customer Routes
- `/` - Customer login page (default entry point)
- `/register` - New user registration
- `/home` - Customer homepage with product listings
- `/products` - Dedicated products browsing section
- `/about` - About the platform information
- `/cart` - Shopping cart management interface
- `/orders` - Order history and tracking

#### Admin Routes
- `/admin` - Administrator login page
- `/admin/dashboard` - Admin dashboard with management tools

### 🎨 Design & Styling

- **Responsive Design**: Mobile-first approach with adaptive breakpoints
- **Component Architecture**: Modular CSS for maintainability and scalability
- **Modern UI**: Clean, intuitive interface with smooth interactions
- **Accessibility**: Semantic HTML5 and ARIA considerations for inclusivity

### 🚀 Deployment

#### Production Build
```bash
npm run build
```

Build artifacts are generated in the `dist/` directory, ready for deployment to any static hosting service.

#### Recommended Hosting Platforms
- **Vercel**: Zero-config deployment with automatic HTTPS
- **Netlify**: Continuous deployment and form handling
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3 + CloudFront**: Scalable cloud hosting solution

### 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository to your GitHub account
2. **Clone** your forked repository locally
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Commit** your changes: `git commit -m 'Add some amazing feature'`
5. **Push** to your branch: `git push origin feature/amazing-feature`
6. **Open** a Pull Request with a clear description


If you like this repository, give it a star! ⭐