// ====================================== 
// DAY 2 - JAVASCRIPT INTERACTIVITY
// SpecX AI Landing Page
// ====================================== 

// ====================================== 
// 1. VARIABLES - Different ways to declare
// ====================================== 

const APP_NAME = 'SpecX AI Agent';
let currentSection = 'home';
var scrollPosition = 0; // older way, prefer let/const

// ====================================== 
// 2. DOM MANIPULATION - Get Elements
// ====================================== 

// Navigation elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.querySelector('.nav-menu');
const navBrand = document.querySelector('.nav-brand');

// Buttons
const ctaButtons = document.querySelectorAll('.btn');
const heroButtons = document.querySelectorAll('.hero-buttons .btn');

// Cards
const featureCards = document.querySelectorAll('.feature-card');
const capabilityCards = document.querySelectorAll('.capability-card');
const testimonialCards = document.querySelectorAll('.testimonial-card');

// Statistics
const statNumbers = document.querySelectorAll('.stat-number');

// Forms (we'll create this)
const contactForm = document.getElementById('contact-form');

// ====================================== 
// 3. OBJECTS - Store related data
// ====================================== 

const siteData = {
    name: 'SpecX AI Agent',
    version: '1.0.0',
    author: 'IFI Learning',
    sections: ['home', 'about', 'features', 'architecture', 'technologies', 'contact'],
    stats: {
        agents: 10,
        automation: 95,
        speed: 30,
        accuracy: 99
    }
};

const userInteractions = {
    clicks: 0,
    scrolls: 0,
    hoveredCards: [],
    visitedSections: new Set()
};

// ====================================== 
// 4. ARRAYS - Collections of data
// ====================================== 

const navigationItems = ['Home', 'Features', 'Architecture', 'Technologies', 'Contact'];

const techStack = [
    'HTML5', 'CSS3', 'JavaScript', 'Python', 'FastAPI', 
    'Azure OpenAI', 'Azure AI Search', 'Docker', 'React', 'TypeScript'
];

// ====================================== 
// 5. FUNCTIONS - Reusable code blocks
// ====================================== 

// Function Declaration
function logActivity(activity) {
    console.log(`[${new Date().toLocaleTimeString()}] ${activity}`);
}

// Function Expression
const greetUser = function(name = 'User') {
    return `Welcome to ${APP_NAME}, ${name}!`;
};

// Arrow Function (ES6)
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        logActivity(`Navigated to ${sectionId}`);
    }
};

// ====================================== 
// 6. EVENT LISTENERS - Make it interactive!
// ====================================== 

// Sticky Navigation on Scroll
window.addEventListener('scroll', function() {
    scrollPosition = window.pageYOffset;
    userInteractions.scrolls++;
    
    // Add shadow to navbar when scrolled
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Track visible section
    trackVisibleSection();
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Update active nav link
        setActiveNavLink(this);
        userInteractions.clicks++;
    });
});

// Button click tracking
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        userInteractions.clicks++;
        logActivity(`Button clicked: ${this.textContent}`);
        
        // Add ripple effect
        createRippleEffect(e, this);
    });
});

// Feature card hover tracking
featureCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        const cardTitle = this.querySelector('.feature-title').textContent;
        if (!userInteractions.hoveredCards.includes(cardTitle)) {
            userInteractions.hoveredCards.push(cardTitle);
        }
        logActivity(`Hovered: ${cardTitle}`);
    });
});

// Statistics counter animation on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe statistics section
const statsSection = document.querySelector('.statistics-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ====================================== 
// 7. ADVANCED FUNCTIONS
// ====================================== 

// Animate statistics numbers
function animateStatNumbers() {
    statNumbers.forEach(statElement => {
        const targetText = statElement.textContent;
        const isPercentage = targetText.includes('%');
        const isTime = targetText.includes('sec');
        const isPlus = targetText.includes('+');
        
        let targetNumber = parseInt(targetText);
        if (isNaN(targetNumber)) return;
        
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counter);
            }
            
            let displayText = Math.floor(currentNumber).toString();
            if (isPercentage) displayText += '%';
            if (isTime) displayText += ' sec';
            if (isPlus) displayText += '+';
            
            statElement.textContent = displayText;
        }, stepTime);
    });
    
    logActivity('Statistics animated');
}

// Track which section is visible
function trackVisibleSection() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            const sectionId = section.getAttribute('id');
            currentSection = sectionId;
            userInteractions.visitedSections.add(sectionId);
        }
    });
}

// Set active navigation link
function setActiveNavLink(clickedLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// Create ripple effect on button click
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ====================================== 
// 8. MOBILE MENU TOGGLE (Hamburger)
// ====================================== 

// Create mobile menu button
function createMobileMenuButton() {
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-toggle');
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
    menuButton.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    
    navbar.appendChild(menuButton);
    
    menuButton.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        logActivity('Mobile menu toggled');
    });
}

// Initialize mobile menu on smaller screens
if (window.innerWidth <= 768) {
    createMobileMenuButton();
}

// ====================================== 
// 9. FORM VALIDATION (Contact Form)
// ====================================== 

// We'll add this to footer
function createContactForm() {
    const footer = document.querySelector('.footer');
    const formSection = document.createElement('section');
    formSection.id = 'contact-form-section';
    formSection.classList.add('contact-form-section');
    formSection.innerHTML = `
        <div class="container">
            <h3 class="form-title">Get In Touch</h3>
            <form id="contact-form" class="contact-form">
                <div class="form-group">
                    <input type="text" id="name" name="name" placeholder="Your Name" required>
                    <span class="error-message" id="name-error"></span>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="Your Email" required>
                    <span class="error-message" id="email-error"></span>
                </div>
                <div class="form-group">
                    <textarea id="message" name="message" rows="4" placeholder="Your Message" required></textarea>
                    <span class="error-message" id="message-error"></span>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
            <div id="form-success" class="form-success" style="display: none;">
                Thank you! Your message has been sent successfully.
            </div>
        </div>
    `;
    
    footer.parentNode.insertBefore(formSection, footer);
    
    // Add form validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', handleFormSubmit);
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validate name
    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError('name');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }
    
    // Validate message
    if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError('message');
    }
    
    if (isValid) {
        // Simulate form submission
        console.log('Form Data:', { name, email, message });
        
        document.getElementById('contact-form').style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
        
        logActivity('Contact form submitted successfully');
        
        // Reset after 3 seconds
        setTimeout(() => {
            document.getElementById('contact-form').reset();
            document.getElementById('contact-form').style.display = 'block';
            document.getElementById('form-success').style.display = 'none';
        }, 3000);
    }
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    inputElement.classList.add('error');
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = '';
    inputElement.classList.remove('error');
}

// ====================================== 
// 10. THEME TOGGLE (Bonus Feature)
// ====================================== 

function createThemeToggle() {
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('theme-toggle');
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.innerHTML = '🌙';
    
    navbar.appendChild(toggleButton);
    
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
            logActivity('Dark mode enabled');
        } else {
            this.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
            logActivity('Light mode enabled');
        }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.innerHTML = '☀️';
    }
}

// ====================================== 
// 11. INITIALIZE ON PAGE LOAD
// ====================================== 

document.addEventListener('DOMContentLoaded', function() {
    logActivity('Page loaded - JavaScript initialized');
    console.log('Welcome to SpecX AI Agent! 🚀');
    console.log('Site Data:', siteData);
    
    // Initialize features
    createContactForm();
    createThemeToggle();
    
    // Log initial state
    console.log('Tech Stack:', techStack);
    console.log('Navigation:', navigationItems);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
        }
    });
});

// ====================================== 
// 12. WINDOW RESIZE HANDLER
// ====================================== 

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        logActivity(`Window resized to ${window.innerWidth}x${window.innerHeight}`);
        
        // Reinitialize mobile menu if needed
        const existingButton = document.querySelector('.mobile-menu-toggle');
        if (window.innerWidth <= 768 && !existingButton) {
            createMobileMenuButton();
        } else if (window.innerWidth > 768 && existingButton) {
            existingButton.remove();
            navMenu.classList.remove('active');
        }
    }, 250);
});

// ====================================== 
// 13. ANALYTICS HELPER (Console Report)
// ====================================== 

// Report user interactions after 30 seconds
setTimeout(() => {
    console.log('📊 User Interaction Report:');
    console.log('Total Clicks:', userInteractions.clicks);
    console.log('Total Scrolls:', userInteractions.scrolls);
    console.log('Hovered Cards:', userInteractions.hoveredCards);
    console.log('Visited Sections:', Array.from(userInteractions.visitedSections));
    console.log('Current Section:', currentSection);
}, 30000);

// ====================================== 
// 14. EXPORT FOR TESTING (Optional)
// ====================================== 

// Make functions available globally for testing
window.SpecXApp = {
    siteData,
    userInteractions,
    scrollToSection,
    greetUser,
    logActivity
};

console.log('SpecX AI Agent JavaScript loaded successfully! ✅');
