document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Particle.js Initialization ---
    particlesJS("particles-js", {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#00d2ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00d2ff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 140, line_opacity: 1 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // --- 2. Theme Toggler ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    body.setAttribute('data-theme', savedTheme);
    themeToggleButton.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    updateParticleColor(savedTheme);

    themeToggleButton.addEventListener('click', () => {
        let currentTheme = body.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleButton.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        updateParticleColor(newTheme);
    });
    
    function updateParticleColor(theme) {
        const color = theme === 'dark' ? '#00d2ff' : '#007BFF';
        if (window.pJSDom && window.pJSDom[0]) {
             window.pJSDom[0].pJS.particles.color.value = color;
             window.pJSDom[0].pJS.particles.line_linked.color = color;
             window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    // --- 3. Scroll Progress Bar ---
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });

    // --- 4. Product Category Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'grid';
                    // Add animation
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 5. Expandable Product Reviews ---
    const readReviewButtons = document.querySelectorAll('.read-review-btn');
    readReviewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            card.classList.toggle('expanded');
            button.querySelector('span').textContent = 
                card.classList.contains('expanded') ? 'Show Less' : 'Read Full Review';
        });
    });

    // --- 6. Product Card Glow Effect on Mouse Move ---
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 7. Affiliate Link Tracking ---
    const affiliateButtons = document.querySelectorAll('.affiliate-btn');
    affiliateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get product name for tracking
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            // Track click (you can replace this with your analytics code)
            console.log(`Affiliate click tracked for: ${productTitle}`);
            
            // Optional: Send to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'affiliate_click', {
                    'product_name': productTitle,
                    'currency': 'USD'
                });
            }
            
            // Add visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            // In a real implementation, you would redirect to the actual affiliate link
            // window.open('your-affiliate-link-here', '_blank');
            
            // For demo purposes, show an alert
            showNotification(`Redirecting to best price for ${productTitle}...`);
        });
    });

    // --- 8. Newsletter Subscription ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            
            // In a real implementation, you would send this to your email service
            console.log(`Newsletter subscription: ${email}`);
            
            showNotification('Thank you for subscribing! Check your email for confirmation.');
            e.target.reset();
        });
    }

    // --- 9. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 10. Scroll Animations (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For splitting.js text animation
                if(entry.target.dataset.splitting !== undefined){
                   Splitting({ target: entry.target, by: 'chars' });
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    // --- 11. Price Animation on Scroll ---
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dealPrice = entry.target.querySelector('.deal-price');
                if (dealPrice) {
                    animatePrice(dealPrice);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.product-pricing').forEach(el => priceObserver.observe(el));

    function animatePrice(element) {
        const finalPrice = element.textContent;
        const numericPrice = parseFloat(finalPrice.replace(/[^0-9.]/g, ''));
        const currency = finalPrice.replace(/[0-9.]/g, '');
        
        let currentPrice = 0;
        const increment = numericPrice / 30; // 30 frames for animation
        
        const animation = setInterval(() => {
            currentPrice += increment;
            if (currentPrice >= numericPrice) {
                currentPrice = numericPrice;
                clearInterval(animation);
            }
            element.textContent = currency + Math.floor(currentPrice);
        }, 50);
    }

    // --- 12. Notification System ---
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
            color: 'white',
            borderRadius: '5px',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // --- 13. Lazy Loading for Images ---
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.product-image img').forEach(img => {
        imageObserver.observe(img);
    });

    // Initial call for elements already in view, and for splitting.js
    Splitting();

    // --- 14. Search Functionality (if search input exists) ---
    const searchInput = document.querySelector('#product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.product-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'grid';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});