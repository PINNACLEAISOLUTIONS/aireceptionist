// ===== PINNACLE AI RECEPTIONIST - JAVASCRIPT =====

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initStatCounters();
    initSmoothScroll();
    initFormHandler();
    if (!prefersReducedMotion) {
        initCardTilt();
        initParticleFields();
    }
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Elements to animate
    const animateElements = [
        '.feature-card',
        '.step',
        '.industry-card',
        '.benefits-content',
        '.benefits-visual'
    ];

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const element = entry.target;
                const siblings = document.querySelectorAll(element.tagName.toLowerCase() + '.' + element.classList[0]);
                const siblingIndex = Array.from(siblings).indexOf(element);

                setTimeout(() => {
                    element.classList.add('visible');
                }, siblingIndex * 100);

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            observer.observe(element);
        });
    });
}

// ===== STAT COUNTERS =====
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number[data-count]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORM HANDLER =====
function initFormHandler() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ponytail: static site, no backend of our own — posts to FormSubmit.co
        // (no signup/API key needed) which relays the submission to the target
        // inbox server-side. The AJAX endpoint keeps the visitor on-page instead
        // of redirecting through FormSubmit's hosted confirmation page.
        const ajaxUrl = form.action.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;

        try {
            const response = await fetch(ajaxUrl, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(form)
            });
            const result = await response.json();
            if (!response.ok || result.success === 'false') {
                throw new Error(result.message || 'Submission failed');
            }

            button.innerHTML = '<span>✓ Message Sent!</span>';
            button.style.background = '#00ff88';
            form.reset();
        } catch (err) {
            button.innerHTML = '<span>Error — Please Try Again</span>';
            button.style.background = '#ff4d4d';
        }

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 3000);
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const floatingElements = document.querySelectorAll('.float-icon');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 10;
            const x = mouseX * speed;
            const y = mouseY * speed;

            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Initialize parallax after load
if (!prefersReducedMotion) window.addEventListener('load', initParallax);

// ===== CARD TILT (spotlight/parallax tilt on feature, industry & visual cards) =====
function initCardTilt() {
    const cards = document.querySelectorAll('.feature-card, .industry-card, .visual-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const rotateX = (0.5 - py) * 10;
            const rotateY = (px - 0.5) * 10;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== VISUAL STATS ANIMATION =====
function initVisualStats() {
    const visualStats = document.querySelectorAll('.visual-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateVisualStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    visualStats.forEach(stat => observer.observe(stat));
}

function animateVisualStat(element) {
    const target = parseInt(element.textContent);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const updateStat = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateStat);
        } else {
            element.textContent = target;
        }
    };

    element.textContent = '0';
    updateStat();
}

// Initialize visual stats
document.addEventListener('DOMContentLoaded', initVisualStats);

// ===== TYPING EFFECT (Optional Enhancement) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===== PARTICLE FIELD BACKGROUNDS (per-section, canvas, no library) =====
function initParticleFields() {
    document.querySelectorAll('canvas.particles-bg').forEach(canvas => {
        setupParticleField(canvas, canvas.dataset.color || '232, 168, 60');
    });
}

function setupParticleField(canvas, color) {
    const ctx = canvas.getContext('2d');
    let width, height, particles, running = false, raf;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
        const count = Math.max(16, Math.min(60, Math.floor((width * height) / 28000)));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: Math.random() * 1.4 + 0.6
        }));
    }

    function tick() {
        if (!running) { raf = null; return; }
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x <= 0 || p.x >= width) p.vx *= -1;
            if (p.y <= 0 || p.y >= height) p.vy *= -1;
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dist = Math.hypot(a.x - b.x, a.y - b.y);
                if (dist < 130) {
                    ctx.strokeStyle = `rgba(${color}, ${0.15 * (1 - dist / 130)})`;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            ctx.fillStyle = `rgba(${color}, 0.6)`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', resize);

    // Only animate while the section is actually visible (perf: 6 canvases on one page)
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            running = entry.isIntersecting;
            if (running && !raf) tick();
        });
    }, { threshold: 0 }).observe(canvas);
}

// ===== Add class to body when page is loaded =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
