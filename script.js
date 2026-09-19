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
        toggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===== SCROLL ANIMATIONS ("WINDOWS BOXES" & CARDS) =====
function initScrollAnimations() {
    const boxSelectors = [
        '.bento-card',
        '.voice-studio-card',
        '.sim-controls-panel',
        '.phone-device',
        '.roi-box',
        '.step',
        '.industry-card',
        '.benefits-content',
        '.benefits-visual',
        '.benefit-item',
        '.pricing-card',
        '.faq-item',
        '.cta-form-container'
    ];

    const elementsToObserve = [];
    boxSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('scroll-reveal-box');
            elementsToObserve.push(el);
        });
    });

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.08
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('is-revealed');
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        elementsToObserve.forEach(el => observer.observe(el));
    } else {
        elementsToObserve.forEach(el => {
            el.classList.add('is-revealed');
            el.classList.add('visible');
        });
    }
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


// ===== DEVELOPER-QUALITY INTERACTIVE MODULES =====

document.addEventListener('DOMContentLoaded', () => {
    initVoiceStudio();
    initCallSimulator();
    initRoiCalculator();
    initPricingToggle();
    initFaqAccordion();
    initContactForm();
});

// 1. VOICE STUDIO MODULE
const voiceScenarios = {
    clinic: {
        title: "Riley — Healthcare & Pediatric Receptionist",
        desc: "Ultra-expressive Vapi voice AI trained on real pediatric clinic triage, scheduling, and caller intake protocols.",
        transcript: "Thank you for calling High Springs Pediatrics and Primary Care. My name is Riley. How can I assist you today?",
        badge: "Live Vapi Voice",
        audioSrc: "assets/riley-clinic.mp3"
    },
    hvac: {
        title: "Marcus — Home Services & Emergency Dispatch",
        desc: "Urgent, efficient dispatch personality with instant location lookup.",
        transcript: "Apex Emergency Services, Marcus speaking. We have an on-call technician available in your area right now. Is water actively leaking, or is your AC or heating down?",
        badge: "Field Dispatch",
        audioSrc: "assets/marcus-hvac.mp3"
    },
    legal: {
        title: "Elena — Corporate & Legal Intake Concierge",
        desc: "Professional, confidential screening calibrated for law firms.",
        transcript: "Harrison and Partners Law Group, Elena speaking. I can schedule your confidential consultation with attorney David. May I please take your name and a brief description of your matter?",
        badge: "Legal Intake",
        audioSrc: "assets/elena-legal.mp3"
    }
};

function initVoiceStudio() {
    const tabs = document.querySelectorAll('.voice-tab');
    const playBtn = document.getElementById('voicePlayBtn');
    const playerBox = document.getElementById('voicePlayerBox');
    const titleElem = document.getElementById('voiceTitle');
    const descElem = document.getElementById('voiceDesc');
    const transcriptElem = document.getElementById('voiceTranscript');
    const badgeElem = document.getElementById('voiceBadge');
    
    if (!playBtn || !tabs.length) return;

    let currentScenario = 'clinic';
    let isPlaying = false;
    let currentAudio = null;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentScenario = tab.dataset.scenario;
            
            const data = voiceScenarios[currentScenario];
            if (data) {
                if (titleElem) titleElem.textContent = data.title;
                if (descElem) descElem.textContent = data.desc;
                if (transcriptElem) transcriptElem.textContent = `"${data.transcript}"`;
                if (badgeElem) badgeElem.textContent = data.badge;
            }
            stopVoice();
        });
    });

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            stopVoice();
        } else {
            playVoice();
        }
    });

    function playVoice() {
        stopVoice();
        isPlaying = true;
        playerBox.classList.add('playing');
        playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        
        const data = voiceScenarios[currentScenario];
        if (data && data.audioSrc) {
            currentAudio = new Audio(data.audioSrc);
            currentAudio.play().then(() => {
                currentAudio.onended = () => stopVoice();
                currentAudio.onerror = () => fallbackSpeech(data.transcript);
            }).catch(() => {
                fallbackSpeech(data.transcript);
            });
        } else {
            fallbackSpeech(data.transcript);
        }
    }

    function fallbackSpeech(text) {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.onend = () => stopVoice();
            u.onerror = () => stopVoice();
            window.speechSynthesis.speak(u);
        } else {
            setTimeout(stopVoice, 4000);
        }
    }

    function stopVoice() {
        isPlaying = false;
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        if (playerBox) playerBox.classList.remove('playing');
        if (playBtn) playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    }
}

// 2. LIVE CALL SIMULATOR MODULE
const callScripts = {
    dental: [
        { sender: 'caller', text: "Hi, I have a cracked tooth and severe pain. Do you have any emergency openings today?" },
        { sender: 'ai', text: "I'm so sorry you're in pain! We have an emergency reservation open at 2:30 PM today with Dr. Miller. Shall I lock that in for you?" },
        { sender: 'caller', text: "Yes please, my name is Alex Reed and my number is (555) 234-5678." },
        { sender: 'ai', text: "All set, Alex! You are booked for 2:30 PM today. A confirmation SMS with directions was just sent to your phone." }
    ],
    hvac: [
        { sender: 'caller', text: "Hello, our air conditioning stopped working and our house is 86 degrees. Can someone come out?" },
        { sender: 'ai', text: "We can help right away. We have an on-call HVAC specialist in your area with arrival between 4:00 PM and 5:00 PM today. Would that work?" },
        { sender: 'caller', text: "That would be a lifesaver. Yes, address is 482 Maple Lane." },
        { sender: 'ai', text: "Got it! Tech Carlos is dispatched to 482 Maple Lane for 4:00 PM. You'll receive live GPS tracking via text." }
    ],
    legal: [
        { sender: 'caller', text: "Hi, I need to speak to an attorney about a commercial lease dispute." },
        { sender: 'ai', text: "I can assist with that. Our senior partner conducts 15-minute preliminary strategy reviews every Tuesday and Thursday. Would Thursday at 10 AM suit you?" },
        { sender: 'caller', text: "Thursday at 10 AM works great." },
        { sender: 'ai', text: "Perfect. I've reserved Thursday at 10:00 AM on the partner's calendar and emailed you the client portal link." }
    ]
};

function initCallSimulator() {
    const triggerBtn = document.getElementById('triggerSimCall');
    const scrollContainer = document.getElementById('phoneChatScroll');
    const timerElem = document.getElementById('simCallTimer');
    const scenarioBtns = document.querySelectorAll('.scenario-btn');
    const successBadge = document.getElementById('simSuccessBadge');
    
    if (!triggerBtn || !scrollContainer) return;

    let selectedScenario = 'dental';
    let timerInterval = null;
    let currentStep = 0;

    scenarioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            scenarioBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedScenario = btn.dataset.scenario;
            resetCall();
        });
    });

    triggerBtn.addEventListener('click', () => {
        startSimulation();
    });

    function resetCall() {
        clearInterval(timerInterval);
        if (timerElem) timerElem.textContent = "00:00";
        if (successBadge) successBadge.style.display = "none";
        scrollContainer.innerHTML = '<div class="sim-msg ai">Incoming call ready. Click "Simulate Live Call" to test real-time voice handling.</div>';
    }

    function startSimulation() {
        resetCall();
        let seconds = 0;
        timerInterval = setInterval(() => {
            seconds++;
            const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            if (timerElem) timerElem.textContent = `${mins}:${secs}`;
        }, 1000);

        scrollContainer.innerHTML = '';
        const script = callScripts[selectedScenario];
        let delay = 300;

        script.forEach((msg, idx) => {
            setTimeout(() => {
                const msgElem = document.createElement('div');
                msgElem.className = `sim-msg ${msg.sender}`;
                msgElem.textContent = msg.text;
                scrollContainer.appendChild(msgElem);
                scrollContainer.scrollTop = scrollContainer.scrollHeight;

                if (idx === script.length - 1) {
                    if (successBadge) successBadge.style.display = "inline-flex";
                    setTimeout(() => clearInterval(timerInterval), 3000);
                }
            }, delay);
            delay += (idx % 2 === 0 ? 1800 : 2200);
        });
    }
}

// 3. DYNAMIC ROI CALCULATOR MODULE
function initRoiCalculator() {
    const callsSlider = document.getElementById('roiCallsSlider');
    const valueSlider = document.getElementById('roiValueSlider');
    const callsValText = document.getElementById('roiCallsVal');
    const dealValText = document.getElementById('roiDealVal');
    const revenueOutput = document.getElementById('roiRevenueOutput');
    const hoursOutput = document.getElementById('roiHoursOutput');
    const savingsOutput = document.getElementById('roiSavingsOutput');
    const roiMultiplier = document.getElementById('roiMultiplier');

    if (!callsSlider || !valueSlider) return;

    function calculate() {
        const calls = parseInt(callsSlider.value, 10);
        const dealVal = parseInt(valueSlider.value, 10);

        callsValText.textContent = `${calls} calls`;
        dealValText.textContent = `$${dealVal.toLocaleString()}`;

        // Conversion benchmark: 32% of answered calls convert into customers
        const converted = Math.round(calls * 0.32);
        const monthlyRevenue = converted * dealVal;
        const hoursSaved = Math.round((calls * 8) / 60);
        const receptionistSavings = 3500; // Average monthly full-time front desk salary
        const totalImpact = monthlyRevenue + receptionistSavings;
        const multiplier = Math.max(2, Math.round((monthlyRevenue / 199)));

        if (revenueOutput) revenueOutput.textContent = `$${monthlyRevenue.toLocaleString()}`;
        if (hoursOutput) hoursOutput.textContent = `${hoursSaved} hrs/mo`;
        if (savingsOutput) savingsOutput.textContent = `$${totalImpact.toLocaleString()}`;
        if (roiMultiplier) roiMultiplier.textContent = `${multiplier}x ROI`;
    }

    callsSlider.addEventListener('input', calculate);
    valueSlider.addEventListener('input', calculate);
    calculate();
}

// 4. PRICING TOGGLE MODULE
function initPricingToggle() {
    const toggle = document.getElementById('billingToggle');
    const starterPrice = document.getElementById('priceStarter');
    const growthPrice = document.getElementById('priceGrowth');
    const entPrice = document.getElementById('priceEnt');
    const monthlyLabel = document.getElementById('labelMonthly');
    const annualLabel = document.getElementById('labelAnnual');

    if (!toggle) return;

    let isAnnual = false;
    toggle.addEventListener('click', () => {
        isAnnual = !isAnnual;
        toggle.classList.toggle('active', isAnnual);
        if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
        if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

        if (isAnnual) {
            if (starterPrice) starterPrice.textContent = '159';
            if (growthPrice) growthPrice.textContent = '450';
            if (entPrice) entPrice.textContent = '719';
        } else {
            if (starterPrice) starterPrice.textContent = '199';
            if (growthPrice) growthPrice.textContent = '450';
            if (entPrice) entPrice.textContent = '899';
        }
    });
}

// 5. FAQ ACCORDION MODULE
function initFaqAccordion() {
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        const btn = card.querySelector('.faq-question-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const isOpen = card.classList.contains('open');
                faqCards.forEach(c => c.classList.remove('open'));
                if (!isOpen) {
                    card.classList.add('open');
                }
            });
        }
    });
}


// 6. CONTACT FORM AJAX SUBMISSION MODULE
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const statusDiv = document.getElementById('contactFormStatus');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!submitBtn) return;

        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitting Deployment Request... ⏳</span>';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://formsubmit.co/ajax/futureai4all@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                if (statusDiv) {
                    statusDiv.style.display = 'block';
                    statusDiv.style.background = 'rgba(0, 217, 146, 0.12)';
                    statusDiv.style.border = '1px solid rgba(0, 217, 146, 0.5)';
                    statusDiv.style.color = '#00D992';
                    statusDiv.innerHTML = '<strong>⚡ Deployment Request Received!</strong><br>Check your inbox at <em>' + (data.email || 'your email') + '</em>. Our engineering team will calibrate your line in under 10 minutes.';
                }
                form.reset();
                submitBtn.innerHTML = '<span>Request Dispatched Successfully ✅</span>';
            } else {
                form.submit();
            }
        } catch (err) {
            form.submit();
        }
    });
}
