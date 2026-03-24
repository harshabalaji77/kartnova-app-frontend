## Kartnova Frontend

A modern, responsive e-commerce frontend application built with React and Vite. Kartnova provides a seamless shopping experience with customer and admin interfaces, featuring product browsing, cart management, order processing, and administrative controls.

### 🚀 Features

#### Customer Experience
- **User Authentication**: Secure login and registration system
- **Product Browsing**: Browse products with intuitive category navigation
- **Shopping Cart**: Add/remove items, update quantities in real-time
- **Order Management**: View order history and track delivery status
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
│   ├── AdminDashboard.jsx     # Admin main interface
│   ├── AdminLogin.jsx         # Admin authentication
│   ├── CartPage.jsx           # Shopping cart page
│   ├── CustomerHomePage.jsx   # Customer main interface
│   ├── LoginPage.jsx          # Customer authentication
│   ├── OrderPage.jsx          # Order management
│   └── RegistrationPage.jsx   # New user registration
├── styles/             # Global and component styles
│   └── styles.css             # Main stylesheet
├── assets/             # Static assets and images
├── App.jsx             # Main application component
├── Routes.jsx          # Application routing configuration
└── main.jsx            # Application entry point
```

### 🌐 Application Routes

#### Customer Routes
- `/` - Customer login page (default entry point)
- `/register` - New user registration
- `/home` - Customer homepage with product listings
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

### 📝 Development Guidelines

- Follow React best practices and modern hooks patterns
- Use semantic HTML5 elements for better accessibility
- Maintain consistent naming conventions across the codebase
- Write clean, well-commented code for future maintenance
- Ensure responsive design works across all device sizes
- Test thoroughly before submitting changes

### 🐛 Troubleshooting

#### Common Development Issues

**Port Already in Use**
```bash
# Kill the process using the port
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

**Dependency Issues**
```bash
# Clear cache and reinstall dependencies
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
# Check for linting issues
npm run lint

# Clear build cache
npm run build -- --force
```

---

**Built with ❤️ using React and Vite**
