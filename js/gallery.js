// Gallery-specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {

    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery modal functionality
    window.openGalleryModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Animate modal appearance
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    };

    window.closeGalleryModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';

            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    };

    // Close modal when clicking outside
    document.querySelectorAll('.gallery-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                const modalId = this.id;
                closeGalleryModal(modalId);
            }
        });
    });

    // Gallery item hover effects
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(255, 87, 34, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    });

    // Lazy loading for gallery images
    const lazyImages = document.querySelectorAll('.gallery-image img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Search functionality for gallery
    const createGallerySearch = () => {
        const searchContainer = document.querySelector('.gallery-filter .container');
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search projects...';
        searchInput.className = 'gallery-search';

        searchContainer.appendChild(searchInput);

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            galleryItems.forEach(item => {
                const title = item.querySelector('.gallery-info h3').textContent.toLowerCase();
                const description = item.querySelector('.gallery-info p').textContent.toLowerCase();
                const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

                const matches = title.includes(searchTerm) ||
                              description.includes(searchTerm) ||
                              tags.some(tag => tag.includes(searchTerm));

                if (matches) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    };

    createGallerySearch();

    // Gallery statistics counter
    const updateGalleryStats = () => {
        const totalProjects = galleryItems.length;
        const categories = {};

        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            categories[category] = (categories[category] || 0) + 1;
        });

        // Create stats display
        const statsContainer = document.createElement('div');
        statsContainer.className = 'gallery-stats';
        statsContainer.innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${totalProjects}</span>
                <span class="stat-label">Total Projects</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${Object.keys(categories).length}</span>
                <span class="stat-label">Categories</span>
            </div>
        `;

        const gallerySection = document.querySelector('.gallery-grid .container');
        gallerySection.insertBefore(statsContainer, gallerySection.firstChild);
    };

    updateGalleryStats();

    // Infinite scroll effect (simulated)
    let isLoading = false;
    const loadMoreProjects = () => {
        if (isLoading) return;
        isLoading = true;

        // Simulate loading more projects
        setTimeout(() => {
            // This would normally fetch more projects from an API
            isLoading = false;
        }, 1000);
    };

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            loadMoreProjects();
        }
    });

    // Category click handlers
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update filter
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === category) {
                    btn.click();
                }
            });

            // Scroll to gallery
            document.querySelector('.gallery-grid').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gallery animation on scroll
    const animateGalleryItems = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        galleryItems.forEach(item => {
            observer.observe(item);
        });
    };

    animateGalleryItems();
});