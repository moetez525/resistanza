// ==================== NAVBAR SCROLL ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ==================== MOBILE NAV TOGGLE ====================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// ==================== TYPING EFFECT ====================
const phrases = ['Welcome to Resistenza RP', 'Welcome to Resistenza RP'];
const typingEl = document.getElementById('typingText');
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function typeEffect() {
    const current = phrases[phraseIdx];
    typingEl.textContent = isDeleting
        ? current.substring(0, charIdx--)
        : current.substring(0, charIdx++);

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx > current.length) {
        delay = 2500;
        isDeleting = true;
    } else if (isDeleting && charIdx < 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 500;
    }
    setTimeout(typeEffect, delay);
}
typeEffect();

// ==================== COUNTDOWN TIMER ====================
const targetDate = new Date('2026-05-23T21:00:00').getTime();
const countDays = document.getElementById('countDays');
const countHours = document.getElementById('countHours');
const countMinutes = document.getElementById('countMinutes');
const countSeconds = document.getElementById('countSeconds');

function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
        countDays.textContent = '00';
        countHours.textContent = '00';
        countMinutes.textContent = '00';
        countSeconds.textContent = '00';
        document.querySelector('.opening-label').textContent = 'THE RESISTANCE IS LIVE';
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    countDays.textContent = String(d).padStart(2, '0');
    countHours.textContent = String(h).padStart(2, '0');
    countMinutes.textContent = String(m).padStart(2, '0');
    countSeconds.textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ==================== PARALLAX EFFECT ====================
const heroParallax = document.getElementById('heroParallax');
window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        heroParallax.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
});

// ==================== RULES ACCORDION ====================
window.toggleRule = function(btn) {
    const category = btn.closest('.rule-category');
    const wasActive = category.classList.contains('active');
    document.querySelectorAll('.rule-category').forEach(c => c.classList.remove('active'));
    if (!wasActive) category.classList.add('active');
};

// ==================== SCROLL ANIMATIONS ====================
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
animatedEls.forEach(el => observer.observe(el));

// ==================== COUNTER ANIMATION ====================
const statValues = document.querySelectorAll('.stat-value[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 25);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
statValues.forEach(el => counterObserver.observe(el));

// ==================== CUSTOM CURSOR ====================
const customCursor = document.querySelector('.custom-cursor');
const customRing = document.querySelector('.custom-cursor-ring');
const interactiveSelectors = 'a, button, .btn, .nav-link, .sidebar-icon, .rule-header';

document.addEventListener('mousemove', (event) => {
    const { clientX: x, clientY: y } = event;
    customCursor.style.left = `${x}px`;
    customCursor.style.top = `${y}px`;
    customRing.style.left = `${x}px`;
    customRing.style.top = `${y}px`;
});

document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

document.addEventListener('mouseleave', () => {
    customCursor.style.opacity = '0';
    customRing.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    customCursor.style.opacity = '1';
    customRing.style.opacity = '1';
});
