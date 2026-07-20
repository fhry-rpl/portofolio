/**
 * Main JavaScript - Portofolio Ferry
 * Berisi semua interaksi dan dynamic content
 */

// ===================================
// DARK MODE TOGGLE
// ===================================
function toggleTheme() {
    const root = document.documentElement;
    const icon = document.getElementById('theme-icon');
    
    if (root.getAttribute('data-theme') === 'dark') {
        root.removeAttribute('data-theme');
        icon.classList.remove('ph-sun');
        icon.classList.add('ph-moon');
        localStorage.setItem('theme', 'light');
    } else {
        root.setAttribute('data-theme', 'dark');
        icon.classList.remove('ph-moon');
        icon.classList.add('ph-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================
function toggleMenu() {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('active');
}

// ===================================
// MUSIC PLAYER TOGGLE
// ===================================
function toggleMusic(btn) {
    const icon = btn.querySelector('.play-btn i');
    const audio = document.getElementById('bg-music');
    const bars = document.querySelectorAll('.bar');
    
    if (icon.classList.contains('ph-play-circle')) {
        icon.classList.remove('ph-play-circle');
        icon.classList.add('ph-pause-circle');
        bars.forEach(bar => bar.style.animationPlayState = 'running');
        audio.play().catch(() => {});
    } else {
        icon.classList.remove('ph-pause-circle');
        icon.classList.add('ph-play-circle');
        bars.forEach(bar => bar.style.animationPlayState = 'paused');
        audio.pause();
    }
}

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===================================
// CLOSE MOBILE MENU ON LINK CLICK
// ===================================
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navbar').classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===================================
// CLOSE MENU ON OUTSIDE CLICK
// ===================================
document.addEventListener('click', (e) => {
    const nav = document.getElementById('navbar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        nav.classList.remove('active');
    }
});

// ===================================
// PREVENT DOUBLE TAP ZOOM ON iOS
// ===================================
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ===================================
// TOUCH FEEDBACK FOR INTERACTIVE ELEMENTS
// ===================================
const touchElements = document.querySelectorAll('.cta-btn, .fav-chip, .hobby-card, .social-btn, .achievement-item, .polaroid');

touchElements.forEach(el => {
    el.addEventListener('touchstart', function() {
        this.style.transition = 'transform 0.1s';
    }, { passive: true });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
const header = document.querySelector('header');

const updateHeader = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        header.style.background = isDark ? 'rgba(30, 39, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = isDark ? 'rgba(30, 39, 46, 0.85)' : '';
        header.style.boxShadow = '';
    }
};

window.addEventListener('scroll', updateHeader, { passive: true });

const themeObserver = new MutationObserver(updateHeader);
themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});

// ===================================
// LAZY LOADING FOR IMAGES (fallback)
// ===================================
if (!('loading' in HTMLImageElement.prototype)) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// PERFORMANCE - PASSIVE EVENT LISTENERS
// ===================================
window.addEventListener('scroll', () => {}, { passive: true });
window.addEventListener('resize', () => {}, { passive: true });
