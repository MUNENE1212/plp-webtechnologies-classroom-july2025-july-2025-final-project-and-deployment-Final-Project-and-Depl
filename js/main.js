// Main JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {

    // Interactive transition messages for navigation
    const transitionMessages = {
        'home': { text: "Returning Home", icon: "fas fa-home" },
        'about': { text: "Learning About Me", icon: "fas fa-user" },
        'skills': { text: "Exploring Skills", icon: "fas fa-code" },
        'projects': { text: "Viewing Projects", icon: "fas fa-folder-open" },
        'contact': { text: "Getting In Touch", icon: "fas fa-envelope" }
    };

    const showTransitionMessage = (sectionId) => {
        const message = transitionMessages[sectionId];
        if (!message) return;

        const transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'transition-overlay';
        transitionOverlay.innerHTML = `
            <div class="transition-content">
                <div class="transition-icon">
                    <i class="${message.icon}"></i>
                </div>
                <div class="transition-text">${message.text}</div>
            </div>
        `;

        document.body.appendChild(transitionOverlay);

        // Show transition
        setTimeout(() => {
            transitionOverlay.classList.add('show');
        }, 10);

        // Hide transition
        setTimeout(() => {
            transitionOverlay.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(transitionOverlay)) {
                    document.body.removeChild(transitionOverlay);
                }
            }, 300);
        }, 800);
    };

    // Smooth scrolling for navigation links with transition messages
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Show transition message
                showTransitionMessage(targetId);

                // Delay scroll to allow transition to show
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update active nav link
                    navLinks.forEach(nl => nl.classList.remove('active'));
                    this.classList.add('active');
                }, 200);
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

    // Enhanced form validation and submission with interactive messages
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

            // Show sending message animation
            showInteractiveMessage('Sending Message', 'Your message is being delivered...', 'fas fa-paper-plane');

            // Simulate form submission with delay
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                this.reset();
            }, 2000);
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Interactive message system for user actions
    function showInteractiveMessage(title, subtitle, icon) {
        const messageOverlay = document.createElement('div');
        messageOverlay.className = 'interactive-message-overlay';
        messageOverlay.innerHTML = `
            <div class="interactive-message-content">
                <div class="interactive-message-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="interactive-message-title">${title}</div>
                <div class="interactive-message-subtitle">${subtitle}</div>
                <div class="interactive-message-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;

        document.body.appendChild(messageOverlay);

        // Show message
        setTimeout(() => {
            messageOverlay.classList.add('show');
        }, 10);

        // Hide message after delay
        setTimeout(() => {
            messageOverlay.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(messageOverlay)) {
                    document.body.removeChild(messageOverlay);
                }
            }, 300);
        }, 2000);
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

    // Interactive loading experience with rotating messages
    const loadingMessages = [
        { main: "Initializing Experience", sub: "Setting up the digital workspace...", icon: "fas fa-cog" },
        { main: "Loading Skills", sub: "Compiling technical expertise...", icon: "fas fa-code" },
        { main: "Preparing Projects", sub: "Organizing portfolio showcase...", icon: "fas fa-folder-open" },
        { main: "Optimizing Performance", sub: "Fine-tuning user experience...", icon: "fas fa-rocket" },
        { main: "Almost Ready", sub: "Final touches in progress...", icon: "fas fa-check-circle" }
    ];

    let currentMessageIndex = 0;
    let messageInterval;

    const createInteractiveLoader = () => {
        const pageLoader = document.createElement('div');
        pageLoader.className = 'page-loader';
        pageLoader.innerHTML = `
            <div class="loader-content">
                <div class="interactive-loader">
                    <div class="loading-animation">
                        <div class="pulse-rings">
                            <div class="pulse-ring"></div>
                            <div class="pulse-ring"></div>
                            <div class="pulse-ring"></div>
                        </div>
                        <div class="loading-icon">
                            <i class="${loadingMessages[0].icon}"></i>
                        </div>
                    </div>
                    <div class="loading-message">${loadingMessages[0].main}</div>
                    <div class="loading-subtitle">${loadingMessages[0].sub}</div>
                    <div class="loading-progress">
                        <div class="progress-bar"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(pageLoader);
        return pageLoader;
    };

    const updateLoadingMessage = (loader) => {
        const messageElement = loader.querySelector('.loading-message');
        const subtitleElement = loader.querySelector('.loading-subtitle');
        const iconElement = loader.querySelector('.loading-icon i');

        const message = loadingMessages[currentMessageIndex];

        // Add fade effect
        messageElement.style.opacity = '0';
        subtitleElement.style.opacity = '0';
        iconElement.style.opacity = '0';

        setTimeout(() => {
            messageElement.textContent = message.main;
            subtitleElement.textContent = message.sub;
            iconElement.className = message.icon;

            messageElement.style.opacity = '1';
            subtitleElement.style.opacity = '1';
            iconElement.style.opacity = '1';
        }, 300);

        currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
    };

    const startLoadingSequence = () => {
        const pageLoader = createInteractiveLoader();

        // Update messages every 800ms
        messageInterval = setInterval(() => {
            updateLoadingMessage(pageLoader);
        }, 800);

        window.addEventListener('load', () => {
            // Let the last message play for a bit
            setTimeout(() => {
                clearInterval(messageInterval);

                // Final message before completion
                const messageElement = pageLoader.querySelector('.loading-message');
                const subtitleElement = pageLoader.querySelector('.loading-subtitle');
                const iconElement = pageLoader.querySelector('.loading-icon i');

                messageElement.style.opacity = '0';
                subtitleElement.style.opacity = '0';
                iconElement.style.opacity = '0';

                setTimeout(() => {
                    messageElement.textContent = "Welcome!";
                    subtitleElement.textContent = "Portfolio loaded successfully";
                    iconElement.className = "fas fa-check";

                    messageElement.style.opacity = '1';
                    subtitleElement.style.opacity = '1';
                    iconElement.style.opacity = '1';
                }, 300);

                // Fade out after showing success
                setTimeout(() => {
                    pageLoader.classList.add('fade-out');
                    setTimeout(() => {
                        if (document.body.contains(pageLoader)) {
                            document.body.removeChild(pageLoader);
                        }
                    }, 500);
                }, 1000);
            }, 2000);
        });

        return pageLoader;
    };

    startLoadingSequence();
});