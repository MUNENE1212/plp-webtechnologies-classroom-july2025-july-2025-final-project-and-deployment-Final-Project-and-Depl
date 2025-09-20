// Blog-specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {

    // Blog category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    const blogCards = document.querySelectorAll('.blog-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update active category
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // Filter blog posts
            blogCards.forEach(post => {
                if (post.getAttribute('data-category') === category) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    post.style.display = 'none';
                }
            });

            // Scroll to blog grid
            document.querySelector('.recent-posts').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Show all posts button
    const showAllBtn = document.createElement('button');
    showAllBtn.textContent = 'Show All Posts';
    showAllBtn.className = 'show-all-btn';
    showAllBtn.addEventListener('click', function() {
        categoryCards.forEach(c => c.classList.remove('active'));
        blogCards.forEach(post => {
            post.style.display = 'block';
            post.style.animation = 'fadeInUp 0.5s ease forwards';
        });
    });

    const categoriesGrid = document.querySelector('.categories-grid');
    categoriesGrid.parentNode.insertBefore(showAllBtn, categoriesGrid.nextSibling);

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate newsletter subscription
            const submitBtn = this.querySelector('.subscribe-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Successfully subscribed to newsletter!', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
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

    // Tag cloud functionality
    const tags = document.querySelectorAll('.tags-cloud .tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const tagName = this.getAttribute('data-tag');

            // Filter posts by tag
            blogCards.forEach(post => {
                const postTags = Array.from(post.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
                const postContent = post.textContent.toLowerCase();

                if (postContent.includes(tagName) || postTags.includes(tagName)) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    post.style.display = 'none';
                }
            });

            // Update active tag
            tags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Scroll to posts
            document.querySelector('.recent-posts').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Blog search functionality
    const createBlogSearch = () => {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'blog-search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" placeholder="Search articles..." class="blog-search-input">
                <button class="search-btn"><i class="fas fa-search"></i></button>
            </div>
        `;

        const recentPostsSection = document.querySelector('.recent-posts .container');
        recentPostsSection.insertBefore(searchContainer, recentPostsSection.querySelector('h2').nextSibling);

        const searchInput = searchContainer.querySelector('.blog-search-input');
        const searchBtn = searchContainer.querySelector('.search-btn');

        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase();

            blogCards.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const content = post.querySelector('p').textContent.toLowerCase();
                const category = post.querySelector('.blog-category').textContent.toLowerCase();

                const matches = title.includes(searchTerm) ||
                              content.includes(searchTerm) ||
                              category.includes(searchTerm);

                if (matches || searchTerm === '') {
                    post.style.display = 'block';
                    post.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    post.style.display = 'none';
                }
            });
        };

        searchInput.addEventListener('input', performSearch);
        searchBtn.addEventListener('click', performSearch);
    };

    createBlogSearch();

    // Reading time estimation
    const estimateReadingTime = (text) => {
        const wordsPerMinute = 200;
        const words = text.split(' ').length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    };

    // Blog card hover effects
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(255, 87, 34, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            progressBar.style.width = scrollPercent + '%';
        });
    };

    createScrollProgress();

    // Dark mode toggle for blog
    const blogThemeToggle = () => {
        const isDarkMode = localStorage.getItem('blogTheme') === 'dark';

        if (isDarkMode) {
            document.body.classList.add('dark-theme');
        }

        // Theme toggle would be implemented here
        // This is a placeholder for blog-specific theme handling
    };

    blogThemeToggle();

    // Blog sharing functionality
    const addSharingButtons = () => {
        blogCards.forEach(card => {
            const shareContainer = document.createElement('div');
            shareContainer.className = 'blog-share';
            shareContainer.innerHTML = `
                <button class="share-btn" title="Share">
                    <i class="fas fa-share-alt"></i>
                </button>
                <div class="share-dropdown">
                    <a href="#" class="share-link twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="#" class="share-link facebook">
                        <i class="fab fa-facebook"></i> Facebook
                    </a>
                    <a href="#" class="share-link linkedin">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                </div>
            `;

            card.querySelector('.blog-content').appendChild(shareContainer);

            const shareBtn = shareContainer.querySelector('.share-btn');
            const dropdown = shareContainer.querySelector('.share-dropdown');

            shareBtn.addEventListener('click', () => {
                dropdown.classList.toggle('show');
            });
        });
    };

    addSharingButtons();

    // Blog analytics (placeholder)
    const trackBlogViews = () => {
        // This would integrate with analytics services
        console.log('Blog page viewed');
    };

    trackBlogViews();

    // Infinite scroll simulation
    let currentPage = 1;
    const postsPerPage = 6;

    const loadMorePosts = () => {
        // This would normally fetch more posts from an API
        console.log(`Loading page ${currentPage + 1}`);
        currentPage++;
    };

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            loadMorePosts();
        }
    });
});