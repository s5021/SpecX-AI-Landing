# 📚 Day 3 - React Basics Guide

## 🎯 Objectives

Convert the SpecX AI landing page into a React application and build a Mini Dashboard with:
- ✅ Components
- ✅ JSX
- ✅ Props
- ✅ State
- ✅ Event Handling
- ✅ Forms
- ✅ Conditional Rendering

---

## 📋 Day 3 Tasks

### Part 1: React Setup (30 minutes)
- [ ] Install Node.js (if not installed)
- [ ] Create React app
- [ ] Understand project structure
- [ ] Run development server

### Part 2: Convert Landing Page to React (2 hours)
- [ ] Break HTML into components
- [ ] Convert CSS to modules or styled-components
- [ ] Implement React Router for navigation
- [ ] Add state management

### Part 3: Build Mini Dashboard (2 hours)
- [ ] Create Header component
- [ ] Create Card component with props
- [ ] Create List component with data mapping
- [ ] Create Form component with controlled inputs
- [ ] Add state and event handling

---

## 🚀 Step 1: React Environment Setup

### Install Node.js

**Check if installed:**
```bash
node --version
npm --version
```

**If not installed:**
- Download from [nodejs.org](https://nodejs.org/)
- Install LTS (Long Term Support) version
- Restart terminal after installation

### Create React App

```bash
# Navigate to your project folder
cd c:\Users\sonu\IFI_Learning

# Create new React app
npx create-react-app specx-ai-react

# Navigate into the new project
cd specx-ai-react

# Start development server
npm start
```

**What happens:**
- React creates a new project with all dependencies
- Development server starts at `http://localhost:3000`
- Browser opens automatically
- Hot reload enabled (changes appear instantly)

### Project Structure

```
specx-ai-react/
├── node_modules/       # Dependencies (don't modify)
├── public/             # Static files
│   ├── index.html      # Main HTML file
│   └── favicon.ico     # Site icon
├── src/                # Source code (you work here)
│   ├── components/     # React components (create this)
│   ├── App.js          # Main app component
│   ├── App.css         # App styles
│   └── index.js        # Entry point
├── package.json        # Dependencies and scripts
└── README.md           # React documentation
```

---

## 🧩 Step 2: Understanding React Concepts

### 1. Components

**What:** Reusable pieces of UI

**Function Component (Modern):**
```jsx
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}
```

**Arrow Function Component:**
```jsx
const Welcome = (props) => {
    return <h1>Hello, {props.name}!</h1>;
};
```

### 2. JSX

**What:** JavaScript XML - HTML-like syntax in JavaScript

```jsx
// JSX allows HTML in JavaScript
const element = <h1>Hello, React!</h1>;

// With JavaScript expressions
const name = 'SpecX AI';
const element = <h1>Welcome to {name}</h1>;

// Multi-line JSX
const card = (
    <div className="card">
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
);
```

**Important JSX Rules:**
- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- All tags must be closed: `<br />`, `<img />`
- Must return single parent element
- Use camelCase for attributes: `onClick`, `onChange`

### 3. Props

**What:** Data passed from parent to child component

```jsx
// Parent component passing props
function App() {
    return <Welcome name="John" age={25} />;
}

// Child component receiving props
function Welcome(props) {
    return (
        <div>
            <h1>Hello, {props.name}!</h1>
            <p>You are {props.age} years old</p>
        </div>
    );
}

// Destructuring props (cleaner)
function Welcome({ name, age }) {
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>You are {age} years old</p>
        </div>
    );
}
```

### 4. State

**What:** Component's internal data that can change

```jsx
import { useState } from 'react';

function Counter() {
    // Declare state variable
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
```

**Multiple State Variables:**
```jsx
function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // ... component code
}
```

### 5. Event Handling

```jsx
function Button() {
    // Event handler function
    const handleClick = () => {
        alert('Button clicked!');
    };
    
    // Inline event handler
    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
            <button onClick={() => console.log('Inline!')}>
                Inline Handler
            </button>
        </div>
    );
}
```

### 6. Forms

**Controlled Components:**
```jsx
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
            />
            <button type="submit">Submit</button>
        </form>
    );
}
```

### 7. Conditional Rendering

```jsx
function Greeting({ isLoggedIn }) {
    // Using if/else
    if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
    }
    return <h1>Please sign in</h1>;
}

// Using ternary operator
function Greeting({ isLoggedIn }) {
    return (
        <h1>
            {isLoggedIn ? 'Welcome back!' : 'Please sign in'}
        </h1>
    );
}

// Using && operator
function Notification({ hasMessage }) {
    return (
        <div>
            {hasMessage && <p>You have new messages!</p>}
        </div>
    );
}
```

---

## 🏗️ Step 3: Convert Landing Page to React

### Create Component Structure

```bash
cd src
mkdir components
cd components
```

**Create these component files:**
```
src/
├── components/
│   ├── Navbar.js
│   ├── Hero.js
│   ├── About.js
│   ├── Features.js
│   ├── Architecture.js
│   ├── Workflow.js
│   ├── Technologies.js
│   ├── Statistics.js
│   ├── Testimonials.js
│   ├── CTA.js
│   └── Footer.js
├── App.js
└── index.js
```

### Example: Navbar Component

**Create `src/components/Navbar.js`:**
```jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.pageYOffset > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup function
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };
    
    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="navbar">
                <div className="nav-brand">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">SpecX AI</span>
                </div>
                
                <button 
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
                
                <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    <li>
                        <a href="#home" className="nav-link" 
                           onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#features" className="nav-link"
                           onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
                            Features
                        </a>
                    </li>
                    {/* Add more nav items */}
                </ul>
                
                <button className="btn btn-primary">Get Started</button>
            </nav>
        </header>
    );
};

export default Navbar;
```

### Example: Feature Card Component with Props

**Create `src/components/FeatureCard.js`:**
```jsx
import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ icon, title, description }) => {
    return (
        <article className="feature-card">
            <div className="feature-icon">{icon}</div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
        </article>
    );
};

export default FeatureCard;
```

**Use in Features Component:**
```jsx
import React from 'react';
import FeatureCard from './FeatureCard';

const Features = () => {
    const features = [
        {
            id: 1,
            icon: '🤖',
            title: 'Azure OpenAI',
            description: 'Leverage GPT-4 for intelligent document generation'
        },
        {
            id: 2,
            icon: '🔎',
            title: 'Azure AI Search',
            description: 'Enterprise-grade search with vector support'
        },
        // Add more features
    ];
    
    return (
        <section className="features-section">
            <div className="container">
                <header className="section-header">
                    <h2 className="section-title">Powerful Features</h2>
                </header>
                
                <div className="features-grid">
                    {features.map(feature => (
                        <FeatureCard
                            key={feature.id}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
```

### Main App Component

**Update `src/App.js`:**
```jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Architecture from './components/Architecture';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Architecture />
            <Statistics />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
}

export default App;
```

---

## 🎨 Step 4: Build Mini Dashboard

Create a new dashboard section with interactive components.

### Create Dashboard Folder Structure

```
src/
├── dashboard/
│   ├── Dashboard.js       # Main dashboard
│   ├── Header.js          # Dashboard header
│   ├── Card.js            # Reusable card
│   ├── List.js            # Data list
│   └── Form.js            # Input form
```

### 1. Dashboard Header Component

**`src/dashboard/Header.js`:**
```jsx
import React from 'react';

const Header = ({ title, userName, onLogout }) => {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                <h1>{title}</h1>
            </div>
            <div className="header-right">
                <span className="user-name">Welcome, {userName}</span>
                <button onClick={onLogout} className="btn btn-secondary">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
```

### 2. Card Component with Props

**`src/dashboard/Card.js`:**
```jsx
import React from 'react';

const Card = ({ title, value, icon, trend, color }) => {
    return (
        <div className="dashboard-card" style={{ borderLeftColor: color }}>
            <div className="card-icon" style={{ color }}>
                {icon}
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-value">{value}</p>
                {trend && (
                    <span className={`card-trend ${trend > 0 ? 'positive' : 'negative'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>
        </div>
    );
};

export default Card;
```

### 3. List Component with Data Mapping

**`src/dashboard/List.js`:**
```jsx
import React, { useState } from 'react';

const List = ({ items, onItemClick, onItemDelete }) => {
    const [filter, setFilter] = useState('');
    
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    return (
        <div className="dashboard-list">
            <div className="list-header">
                <h2>Recent Activities</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="search-input"
                />
            </div>
            
            <ul className="list-items">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <li 
                            key={item.id} 
                            className="list-item"
                            onClick={() => onItemClick(item)}
                        >
                            <div className="item-info">
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <span className="item-date">{item.date}</span>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onItemDelete(item.id);
                                }}
                                className="btn-delete"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="empty-message">No items found</p>
                )}
            </ul>
        </div>
    );
};

export default List;
```

### 4. Form Component with State

**`src/dashboard/Form.js`:**
```jsx
import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        priority: 'medium',
        message: ''
    });
    
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    const validate = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        return newErrors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        onSubmit(formData);
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            priority: 'medium',
            message: ''
        });
    };
    
    return (
        <div className="dashboard-form">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className={errors.message ? 'error' : ''}
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
                
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;
```

### 5. Main Dashboard Component

**`src/dashboard/Dashboard.js`:**
```jsx
import React, { useState } from 'react';
import Header from './Header';
import Card from './Card';
import List from './List';
import Form from './Form';
import './Dashboard.css';

const Dashboard = () => {
    const [userName] = useState('John Doe');
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Project Alpha',
            description: 'Initial setup complete',
            date: '2026-08-05'
        },
        {
            id: 2,
            name: 'Project Beta',
            description: 'In progress',
            date: '2026-08-04'
        }
    ]);
    
    const handleLogout = () => {
        alert('Logging out...');
    };
    
    const handleItemClick = (item) => {
        console.log('Clicked item:', item);
    };
    
    const handleItemDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };
    
    const handleFormSubmit = (formData) => {
        const newItem = {
            id: items.length + 1,
            name: formData.name,
            description: formData.message,
            date: new Date().toISOString().split('T')[0]
        };
        setItems([newItem, ...items]);
        alert('Item added successfully!');
    };
    
    return (
        <div className="dashboard">
            <Header 
                title="SpecX AI Dashboard" 
                userName={userName}
                onLogout={handleLogout}
            />
            
            <div className="dashboard-content">
                <div className="cards-grid">
                    <Card
                        title="Total Projects"
                        value="24"
                        icon="📊"
                        trend={12}
                        color="#6366f1"
                    />
                    <Card
                        title="Active Users"
                        value="1,234"
                        icon="👥"
                        trend={5}
                        color="#10b981"
                    />
                    <Card
                        title="Revenue"
                        value="$45,678"
                        icon="💰"
                        trend={-3}
                        color="#f59e0b"
                    />
                    <Card
                        title="Tasks Completed"
                        value="89%"
                        icon="✅"
                        trend={8}
                        color="#8b5cf6"
                    />
                </div>
                
                <div className="dashboard-main">
                    <div className="dashboard-list-container">
                        <List
                            items={items}
                            onItemClick={handleItemClick}
                            onItemDelete={handleItemDelete}
                        />
                    </div>
                    
                    <div className="dashboard-form-container">
                        <Form onSubmit={handleFormSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
```

---

## 🎨 Dashboard CSS

**Create `src/dashboard/Dashboard.css`:**
```css
.dashboard {
    min-height: 100vh;
    background: #f5f7fa;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-name {
    margin-right: 1rem;
    font-weight: 600;
}

.dashboard-content {
    padding: 2rem;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.dashboard-card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    border-left: 4px solid;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    display: flex;
    gap: 1rem;
    transition: transform 0.3s;
}

.dashboard-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-icon {
    font-size: 2.5rem;
}

.card-value {
    font-size: 2rem;
    font-weight: 700;
    margin: 0.5rem 0;
}

.card-trend {
    font-size: 0.875rem;
    font-weight: 600;
}

.card-trend.positive {
    color: #10b981;
}

.card-trend.negative {
    color: #ef4444;
}

.dashboard-main {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
}

.dashboard-list,
.dashboard-form {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.search-input {
    padding: 0.5rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    width: 200px;
}

.list-items {
    list-style: none;
}

.list-item {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s;
}

.list-item:hover {
    background: #f9fafb;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-family: inherit;
}

.form-group input.error,
.form-group textarea.error {
    border-color: #ef4444;
}

.error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}

@media (max-width: 768px) {
    .dashboard-main {
        grid-template-columns: 1fr;
    }
    
    .cards-grid {
        grid-template-columns: 1fr;
    }
}
```

---

## 📝 Git Workflow for Day 3

```bash
# Create new branch
git checkout -b feature/day3-react-conversion

# Add all changes
git add .

# Commit
git commit -m "Day 3: React conversion and mini dashboard

- Converted landing page to React components
- Created reusable component structure
- Built mini dashboard with Header, Card, List, Form
- Implemented state management and event handling
- Added form validation
- Implemented conditional rendering
"

# Push and create PR
git push origin feature/day3-react-conversion
```

---

## ✅ Day 3 Checklist

### React Concepts
- [ ] Understand components and JSX
- [ ] Use props to pass data
- [ ] Manage state with useState
- [ ] Handle events (onClick, onChange)
- [ ] Create and validate forms
- [ ] Implement conditional rendering
- [ ] Use array methods (map, filter)

### Dashboard Features
- [ ] Header with user info
- [ ] Cards showing statistics
- [ ] List with search filter
- [ ] Form with validation
- [ ] Add/delete functionality
- [ ] Responsive design

---

## 🎓 Practice Exercises

1. **Add Edit Functionality:** Allow editing list items
2. **Sort List:** Add sorting by date or name
3. **Pagination:** Limit items per page
4. **Local Storage:** Persist data across page refreshes
5. **Theme Toggle:** Add light/dark mode to dashboard

---

## 📚 Resources

- [React Official Docs](https://react.dev/)
- [React Tutorial](https://react.dev/learn)
- [useState Hook](https://react.dev/reference/react/useState)
- [Handling Events](https://react.dev/learn/responding-to-events)

---

**Day 3 Complete!** 🎉

You've mastered React basics and built a functional dashboard. Ready for Day 4!
