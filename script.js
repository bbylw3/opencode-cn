// Enhanced Navigation and Theme Management
class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupTheme();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupAnimations();
        this.setupIntersectionObserver();
    }

    setupNavigation() {
        // Smooth scroll for navigation links
        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        this.scrollToSection(href.substring(1));
                    }
                });
            });
        });
    }

    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'light';

        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeIcons(currentTheme);

        // Theme toggle event
        themeToggle?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcons(newTheme);

            // Add transition effect
            this.animateThemeChange();
        });
    }

    updateThemeIcons(theme) {
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');

        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    animateThemeChange() {
        const body = document.body;
        body.style.transition = 'background-color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const currentScrollY = window.scrollY;

            // Navbar scroll effect
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (optional enhancement)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuToggle?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks?.classList.contains('mobile-active')) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks?.classList.contains('mobile-active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (navLinks) {
            const isActive = navLinks.classList.contains('mobile-active');
            if (isActive) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
    }

    openMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        navLinks.classList.add('mobile-active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        navLinks.classList.remove('mobile-active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Close mobile menu if open
            this.closeMobileMenu();

            // Scroll to target section
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setupAnimations() {
        // Add click animations to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
            });
        });

        // Add hover effects to cards
        const cards = document.querySelectorAll('.feature-card, .tip-card, .install-card, .quickstart-step, .vscode-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Add terminal typing effect
        this.setupTerminalEffect();
    }

    setupTerminalEffect() {
        const terminalOutput = document.querySelector('.terminal-output');
        if (!terminalOutput) return;

        const text = terminalOutput.textContent;
        terminalOutput.textContent = '';

        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                terminalOutput.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect when terminal is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 1000);
                    observer.disconnect();
                }
            });
        });

        observer.observe(terminalOutput);
    }

    setupIntersectionObserver() {
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add stagger animation to child elements
                    const children = entry.target.querySelectorAll('.feature-card, .tip-card, .install-card, .quickstart-step, .vscode-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
            // Initially hide cards for animation
            const children = section.querySelectorAll('.feature-card, .tip-card, .install-card, .quickstart-step, .vscode-card');
            children.forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        });
    }

    // Performance optimization: Debounce scroll events
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Performance optimization: Throttle animations
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Error handling
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        // Could send to error reporting service here
    }

    // Accessibility improvements
    setupAccessibility() {
        // Add focus management for mobile menu
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuToggle?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleMobileMenu();
            }
        });

        // Trap focus in mobile menu when open
        const focusableElements = navLinks?.querySelectorAll('a, button');
        if (focusableElements) {
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            navLinks?.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && navLinks.classList.contains('mobile-active')) {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }
    }

    // Performance monitoring (optional)
    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            });
        }
    }
}

// Initialize the app with error handling
let app;
try {
    app = new App();
    console.log('App initialized successfully');

    // Make scrollToSection globally available for button onclick handlers
    window.scrollToSection = (sectionId) => {
        app.scrollToSection(sectionId);
    };

} catch (error) {
    console.error('Failed to initialize app:', error);
}
