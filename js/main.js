// Main JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                navLinks.forEach(nl => nl.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mobile navigation toggle
    const createMobileNav = () => {
        const nav = document.querySelector('nav .nav-links');
        const navContainer = document.querySelector('.nav-container');

        // Check if hamburger already exists
        if (document.querySelector('.hamburger')) return;

        // Create hamburger menu
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        navContainer.appendChild(hamburger);

        // Add click event to hamburger
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.toggle('mobile-active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-active');
                hamburger.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('mobile-active');
                hamburger.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            }
        });
    };

    createMobileNav();

    // Form validation and submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Scroll animations and effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Typing effect for hero subtitle
    const typewriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';

        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typewriter(heroSubtitle, originalText, 80);
        }, 1000);
    }

    // Project slideshow functionality
    const initSlideshows = () => {
        const slideshows = document.querySelectorAll('.slideshow');

        slideshows.forEach(slideshow => {
            const slides = slideshow.querySelectorAll('.slide');
            let currentSlide = 0;

            if (slides.length > 1) {
                const showSlide = (index) => {
                    slides.forEach(slide => slide.classList.remove('active'));
                    slides[index].classList.add('active');
                };

                // Show first slide
                showSlide(0);

                // Auto-advance slides
                setInterval(() => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                }, 4000);

                // Add navigation dots
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'slideshow-dots';

                slides.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.className = 'dot';
                    if (index === 0) dot.classList.add('active');

                    dot.addEventListener('click', () => {
                        currentSlide = index;
                        showSlide(currentSlide);

                        // Update active dot
                        dotsContainer.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
                        dot.classList.add('active');
                    });

                    dotsContainer.appendChild(dot);
                });

                slideshow.parentElement.appendChild(dotsContainer);
            }
        });
    };

    initSlideshows();

    // Skill cards hover effects
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });

    // Dynamic background particles
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    };

    createParticles();

    // Welcome message animation
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        setTimeout(() => {
            welcomeMessage.classList.add('fade-out');
            setTimeout(() => {
                welcomeMessage.style.display = 'none';
            }, 1000);
        }, 3000);
    }

    // Back to top button
    const createBackToTop = () => {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    createBackToTop();

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Theme toggle functionality
    const createThemeToggle = () => {
        // Check if theme toggle already exists
        if (document.querySelector('.theme-toggle')) return;

        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle theme');

        const nav = document.querySelector('nav .nav-container');
        nav.appendChild(themeToggle);

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Toggle theme on document element instead of body
            document.documentElement.classList.toggle('light-theme');
            document.body.classList.toggle('light-theme');

            const isLight = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');

            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-theme');
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    };

    createThemeToggle();

    // Page loading animation
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    document.body.appendChild(pageLoader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoader.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(pageLoader);
            }, 500);
        }, 1000);
    });
});