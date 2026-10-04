// ===== PINNACLE AI RECEPTIONIST - JAVASCRIPT =====

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
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

// ===== FORM HANDLER =====
// initFormHandler removed to avoid duplicate listeners
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
// initVisualStats removed

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
    initModalHandlers();
    initReveal();
    initStickyCta();
    initCtaTracking();
});

// 1. VOICE STUDIO MODULE
const voiceScenarios = {
    clinic: {
        title: "Riley: Healthcare & Pediatric Receptionist",
        desc: "A conversational voice set up for clinic scheduling and caller intake.",
        transcript: "Thank you for calling High Springs Pediatrics and Primary Care. My name is Riley. How can I assist you today?",
        badge: "Sample voice",
        audioSrc: "assets/riley-clinic.mp3"
    },
    hvac: {
        title: "Marcus: Home Services & Dispatch",
        desc: "A clear, efficient voice for after-hours service calls.",
        transcript: "Apex Emergency Services, Marcus speaking. We have an on-call technician available in your area right now. Is water actively leaking, or is your AC or heating down?",
        badge: "Sample voice",
        audioSrc: "assets/marcus-hvac.mp3"
    },
    legal: {
        title: "Elena: Legal Intake Concierge",
        desc: "A professional voice for confidential legal intake.",
        transcript: "Harrison and Partners Law Group, Elena speaking. I can schedule your confidential consultation with attorney David. May I please take your name and a brief description of your matter?",
        badge: "Sample voice",
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
            scenarioBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
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
        scrollContainer.innerHTML = '<div class="sim-msg ai">Sample call ready. Press "Play sample call" to see how a conversation unfolds.</div>';
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
// Assumptions (shown to visitors in the page): book rate is user-set (default 32%, the site's original
// benchmark); AI captures ROI_CAPTURE_SHARE of those calls; savings = in-house front desk (~$3,500/mo) minus Starter ($199).
const ROI_CAPTURE_SHARE = 0.8;
const ROI_FRONT_DESK_COST = 3500;
const ROI_STARTER_PRICE = 199;

function roiCompute(calls, dealVal, ratePct) {
    const lost = Math.round(calls * (ratePct / 100)) * dealVal;
    const captured = Math.round(lost * ROI_CAPTURE_SHARE);
    const savings = ROI_FRONT_DESK_COST - ROI_STARTER_PRICE;
    return { lost, captured, savings };
}

function initRoiCalculator() {
    const callsSlider = document.getElementById('roiCallsSlider');
    const valueSlider = document.getElementById('roiValueSlider');
    const rateSlider = document.getElementById('roiRateSlider');
    if (!callsSlider || !valueSlider || !rateSlider) return;
    const outs = { lost: document.getElementById('roiLost'), captured: document.getElementById('roiCaptured'), savings: document.getElementById('roiSavings') };
    const shareEl = document.getElementById('roiCaptureShare');
    if (shareEl) shareEl.textContent = Math.round(ROI_CAPTURE_SHARE * 100) + '%';
    const money = n => '$' + Math.round(n).toLocaleString('en-US');
    const shown = { lost: 0, captured: 0, savings: 0 };
    const rafs = {};

    function tween(key, to) {
        const el = outs[key];
        if (!el) return;
        cancelAnimationFrame(rafs[key]);
        if (prefersReducedMotion) { shown[key] = to; el.textContent = money(to); return; }
        const from = shown[key], t0 = performance.now(), dur = 450;
        const step = now => {
            const p = Math.min(1, (now - t0) / dur);
            const e = 1 - Math.pow(1 - p, 3);
            shown[key] = from + (to - from) * e;
            el.textContent = money(shown[key]);
            if (p < 1) rafs[key] = requestAnimationFrame(step); else { shown[key] = to; el.textContent = money(to); }
        };
        rafs[key] = requestAnimationFrame(step);
    }

    function calculate() {
        const calls = parseInt(callsSlider.value, 10);
        const dealVal = parseInt(valueSlider.value, 10);
        const rate = parseInt(rateSlider.value, 10);
        document.getElementById('roiCallsVal').textContent = `${calls} calls`;
        document.getElementById('roiDealVal').textContent = `$${dealVal.toLocaleString('en-US')}`;
        document.getElementById('roiRateVal').textContent = `${rate}%`;
        [callsSlider, valueSlider, rateSlider].forEach(sl => {
            sl.style.setProperty('--fill', ((sl.value - sl.min) / (sl.max - sl.min) * 100) + '%');
        });
        const r = roiCompute(calls, dealVal, rate);
        tween('lost', r.lost); tween('captured', r.captured); tween('savings', r.savings);
    }

    [callsSlider, valueSlider, rateSlider].forEach(sl => sl.addEventListener('input', calculate));
    calculate();
}

// 4. PRICING TOGGLE MODULE
function initPricingToggle() {
    const toggle = document.getElementById('billingToggle');
    const prices = { monthly: { priceStarter: 199, priceGrowth: 450, priceEnt: 899 }, annual: { priceStarter: 159, priceGrowth: 450, priceEnt: 719 } };
    const monthlyLabel = document.getElementById('labelMonthly');
    const annualLabel = document.getElementById('labelAnnual');
    if (!toggle) return;

    let isAnnual = false;
    toggle.addEventListener('click', () => {
        isAnnual = !isAnnual;
        toggle.classList.toggle('active', isAnnual);
        toggle.setAttribute('aria-checked', String(isAnnual));
        if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
        if (annualLabel) annualLabel.classList.toggle('active', isAnnual);
        const set = prices[isAnnual ? 'annual' : 'monthly'];
        Object.keys(set).forEach(id => { const el = document.getElementById(id); if (el) el.textContent = set[id]; });
        document.querySelectorAll('.pricing-period').forEach(p => { p.textContent = isAnnual ? '/ mo, billed annually' : '/ month'; });
    });
}

// 5. FAQ ACCORDION MODULE
function initFaqAccordion() {
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        const btn = card.querySelector('.faq-question-btn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isOpen = card.classList.contains('open');
            faqCards.forEach(c => {
                c.classList.remove('open');
                const b = c.querySelector('.faq-question-btn');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                card.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
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
        submitBtn.innerHTML = '<span>Sending...</span>';

        const formData = new FormData(form);

        try {
            const response = await fetch('https://formsubmit.co/ajax/futureai4all@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            const result = await response.json();
            if (response.ok && result.success !== 'false') {
                if (statusDiv) {
                    statusDiv.style.display = 'block';
                    statusDiv.style.background = 'rgba(16, 185, 129, 0.15)';
                    statusDiv.style.border = '1px solid rgba(16, 185, 129, 0.6)';
                    statusDiv.style.color = '#10B981';
                    statusDiv.style.padding = '16px';
                    statusDiv.style.borderRadius = '10px';
                    statusDiv.style.marginTop = '16px';
                    statusDiv.style.textAlign = 'center';
                    statusDiv.innerHTML = '<strong>Message sent.</strong><br>We\'ll be in touch shortly, or call us at <a href="tel:+19046866593" style="color:inherit;text-decoration:underline">(904) 686-6593</a>.';
                }
                form.reset();
                submitBtn.innerHTML = '<span>Request sent. Thank you!</span>';
                submitBtn.disabled = false;
                showFormSuccessModal();
            } else {
                console.log('FormSubmit AJAX fallback, submitting natively...');
                form.submit();
            }
        } catch (err) {
            console.error('FormSubmit AJAX error, submitting natively:', err);
            form.submit();
        }
    });
}

// ===== CONFIRMATION POPUP MODAL LOGIC =====
function showFormSuccessModal() {
    const modal = document.getElementById('formSuccessModal');
    if (!modal) return;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function hideFormSuccessModal() {
    const modal = document.getElementById('formSuccessModal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    // Clean URL query param
    if (window.history.replaceState) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }
}

function initModalHandlers() {
    const closeBtn = document.getElementById('modalCloseBtn');
    const xBtn = document.getElementById('modalXClose');
    const modal = document.getElementById('formSuccessModal');

    if (closeBtn) closeBtn.addEventListener('click', hideFormSuccessModal);
    if (xBtn) xBtn.addEventListener('click', hideFormSuccessModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideFormSuccessModal();
        });
    }

    // Check if user returned from FormSubmit redirect with ?submitted=true
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        showFormSuccessModal();
    }
    
    // Dynamic _next field setting based on current URL
    const nextInput = document.getElementById('formSubmitNext');
    if (nextInput) {
        const currentBase = window.location.protocol + "//" + window.location.host + window.location.pathname;
        nextInput.value = currentBase + (currentBase.endsWith('/') ? '' : '/') + '?submitted=true';
    }
}


// ===== SCROLL REVEAL (opacity + translateY, staggered via --i; CSS handles motion) =====
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('in'));
        document.querySelectorAll('.flow-line').forEach(f => f.classList.add('in-line'));
        return;
    }
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('in'); if (e.target.parentElement.classList.contains('flow-line')) e.target.parentElement.classList.add('in-line'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(el => obs.observe(el));
}

// ===== MOBILE STICKY CTA (shows after hero, hides at the contact section, dismissible) =====
function initStickyCta() {
    const bar = document.getElementById('stickyCta');
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');
    const closeBtn = document.getElementById('stickyClose');
    if (!bar || !hero || !('IntersectionObserver' in window)) return;
    let dismissed = false, pastHero = false, atContact = false;
    try { dismissed = sessionStorage.getItem('stickyDismissed') === '1'; } catch (e) {}
    const update = () => {
        const show = pastHero && !atContact && !dismissed;
        bar.hidden = !show;
        document.body.classList.toggle('has-sticky', show);
    };
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }, { threshold: 0 }).observe(hero);
    if (contact) new IntersectionObserver(([e]) => { atContact = e.isIntersecting; update(); }, { threshold: 0.05 }).observe(contact);
    if (closeBtn) closeBtn.addEventListener('click', () => {
        dismissed = true;
        try { sessionStorage.setItem('stickyDismissed', '1'); } catch (e) {}
        update();
    });
}

// ===== CTA CLICK TRACKING HOOK =====
// No analytics provider is installed on this site. This pushes to dataLayer / gtag if one is added later.
function initCtaTracking() {
    document.addEventListener('click', e => {
        const el = e.target.closest('[data-cta]');
        if (!el) return;
        const name = el.getAttribute('data-cta');
        if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'cta_click', cta: name });
        if (typeof window.gtag === 'function') window.gtag('event', 'cta_click', { cta: name });
    });
}
