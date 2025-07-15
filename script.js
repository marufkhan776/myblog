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

    // --- 4. Expandable Blog Card ---
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.blog-card');
            card.classList.toggle('expanded');
            button.querySelector('span').textContent = card.classList.contains('expanded') ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত পড়ুন';
        });
    });

    // --- 5. Card Glow Effect on Mouse Move ---
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 6. Scroll Animations (Intersection Observer) ---
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
    
    // Initial call for elements already in view, and for splitting.js
    Splitting();
});