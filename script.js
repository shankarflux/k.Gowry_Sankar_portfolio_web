// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_e43xp1m';
const EMAILJS_TEMPLATE_ID = 'template_6d4ryy1';
const EMAILJS_PUBLIC_KEY = 'vo_j34f8fxjinLTt5';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Typing animation quotes
const quotes = [
    '"The best way to predict the future is to invent it." – Alan Kay',
    '"Cybersecurity is not a product, but a process." – Bruce Schneier',
    '"AI is likely to be either the best or worst thing to happen to humanity." – Stephen Hawking',
    '"First, solve the problem. Then, write the code." – John Johnson',
    '"Any sufficiently advanced technology is indistinguishable from magic." – Arthur C. Clarke'
];

// Theme management
let isDark = true;

function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('light', !isDark);
    document.documentElement.classList.toggle('dark', isDark);
    
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDark = savedTheme === 'dark';
    } else {
        // Default to dark theme
        isDark = true;
    }
    
    document.documentElement.classList.toggle('light', !isDark);
    document.documentElement.classList.toggle('dark', isDark);
}

// Mobile navigation
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.remove('active');
    menuBtn.classList.remove('active');
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
}

// Navigation link click handlers
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
});

// Typing animation
class TypingAnimation {
    constructor(element, quotes, options = {}) {
        this.element = element;
        this.quotes = quotes;
        this.speed = options.speed || 50;
        this.delay = options.delay || 25000;
        this.currentQuoteIndex = 0;
        this.currentText = '';
        this.isTyping = true;
        this.timeoutId = null;
        
        this.start();
    }
    
    start() {
        this.typeText();
    }
    
    typeText() {
        const currentQuote = this.quotes[this.currentQuoteIndex];
        
        if (this.isTyping) {
            if (this.currentText.length < currentQuote.length) {
                this.currentText = currentQuote.slice(0, this.currentText.length + 1);
                this.element.textContent = this.currentText;
                this.timeoutId = setTimeout(() => this.typeText(), this.speed);
            } else {
                this.timeoutId = setTimeout(() => {
                    this.isTyping = false;
                    this.typeText();
                }, this.delay);
            }
        } else {
            if (this.currentText.length > 0) {
                this.currentText = this.currentText.slice(0, -1);
                this.element.textContent = this.currentText;
                this.timeoutId = setTimeout(() => this.typeText(), this.speed / 2);
            } else {
                this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
                this.isTyping = true;
                this.typeText();
            }
        }
    }
    
    destroy() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.card, .project-card, .interest-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Toast notification
function showToast() {
    const toast = document.getElementById('success-toast');
    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('success-toast');
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hidden');
}

// Contact form handling
class ContactForm {
    constructor(formElement) {
        this.form = formElement;
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.errorElement = this.form.querySelector('#error-message');
        this.isSubmitting = false;
        
        this.bindEvents();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Clear errors when user starts typing
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.clearError());
        });
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showError(message) {
        this.errorElement.textContent = message;
        this.errorElement.classList.add('show');
    }
    
    clearError() {
        this.errorElement.classList.remove('show');
    }
    
    setLoading(loading) {
        this.isSubmitting = loading;
        this.submitBtn.disabled = loading;
        this.submitBtn.classList.toggle('loading', loading);
    }
    
    resetForm() {
        this.form.reset();
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        this.clearError();
        
        const formData = new FormData(this.form);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();
        
        // Validation
        if (!name) {
            this.showError('Please enter your name');
            return;
        }
        
        if (!email) {
            this.showError('Please enter your email');
            return;
        }
        
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }
        
        if (!message) {
            this.showError('Please enter your message');
            return;
        }
        
        this.setLoading(true);
        
        try {
            const result = await this.sendEmail({ name, email, message });
            
            if (result.success) {
                showToast();
                this.resetForm();
                console.log('Email sent successfully!');
            } else {
                this.showError(result.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error in form submission:', error);
            this.showError('An unexpected error occurred. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async sendEmail(formData) {
        try {
            console.log('Sending email via EmailJS...');
            
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: 'Kosuri Gowry Sankar',
                reply_to: formData.email,
            };
            
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );
            
            console.log('Email sent successfully:', response);
            
            if (response.status === 200) {
                return { success: true };
            } else {
                return { success: false, error: `Failed to send email. Status: ${response.status}` };
            }
        } catch (error) {
            console.error('Error sending email:', error);
            
            let errorMessage = 'Failed to send email. Please try again.';
            
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            
            return { success: false, error: errorMessage };
        }
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.backgroundColor = `rgba(${isDark ? '20, 20, 20' : '248, 248, 248'}, 0.95)`;
        } else {
            navbar.style.backgroundColor = `rgba(${isDark ? '20, 20, 20' : '248, 248, 248'}, 0.8)`;
        }
        
        lastScrollY = currentScrollY;
    });
}

// Active navigation link highlighting
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '-20% 0px -70% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        new TypingAnimation(typingElement, quotes, {
            speed: 50,
            delay: 25000
        });
    }
    
    // Initialize contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        new ContactForm(contactForm);
    }
    
    // Initialize animations
    animateProgressBars();
    initScrollAnimations();
    handleNavbarScroll();
    highlightActiveNavLink();
    
    // Handle navbar background on theme change
    const navbar = document.querySelector('.navbar');
    const observer = new MutationObserver(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        navbar.style.backgroundColor = `rgba(${isDarkMode ? '20, 20, 20' : '248, 248, 248'}, 0.8)`;
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
});

// Handle clicks outside mobile menu to close it
document.addEventListener('click', function(e) {
    const mobileNav = document.getElementById('mobile-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav.classList.contains('active') && 
        !mobileNav.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
        hideToast();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(function() {
    // Any additional scroll-based functionality can go here
}, 100));

// Error handling for EmailJS
window.addEventListener('error', function(e) {
    if (e.message.includes('emailjs')) {
        console.error('EmailJS Error:', e.error);
        // Could show a user-friendly message here
    }
});

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active,
    .mobile-nav-link.active {
        color: var(--primary) !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

console.log('Portfolio website initialized successfully!');
