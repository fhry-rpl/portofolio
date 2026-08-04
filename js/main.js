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
        root.setAttribute('data-theme', 'light');
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
// TIME-BASED GREETING
// ===================================
(function setGreeting() {
    const el = document.getElementById('greeting');
    if (!el) return;
    const hour = new Date().getHours();
    let msg;
    if (hour >= 5 && hour < 11) msg = 'Selamat pagi! Aku Ferry,';
    else if (hour >= 11 && hour < 15) msg = 'Selamat siang! Aku Ferry,';
    else if (hour >= 15 && hour < 18) msg = 'Selamat sore! Aku Ferry,';
    else msg = 'Selamat malam! Aku Ferry,';
    el.textContent = msg;
})();

// ===================================
// INTERACTIVE MAP
// ===================================
(function initMap() {
    const container = document.getElementById('map-container');
    if (!container) return;

    const marker = container.querySelector('.map-marker-group');
    const land = container.querySelector('.map-land');
    const pin = container.querySelector('.map-pin');
    const tooltip = document.getElementById('map-tooltip');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (marker) marker.classList.add('visible');
                if (land) land.classList.add('visible');
                observer.unobserve(container);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(container);

    if (pin && tooltip) {
        pin.addEventListener('click', (e) => {
            e.stopPropagation();
            tooltip.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (tooltip.classList.contains('active') && !e.target.closest('.map-container')) {
                tooltip.classList.remove('active');
            }
        });
    }
})();

// ===================================
// MOBILE MENU TOGGLE
// ===================================
function toggleMenu() {
    const nav = document.getElementById('navbar');
    const btn = document.querySelector('.mobile-menu-btn');
    const isOpen = nav.classList.toggle('active');
    if (btn) btn.setAttribute('aria-expanded', isOpen);
}

// ===================================
// MUSIC PLAYER — PLAYLIST & CONTROLS
// ===================================
const playlist = [
    { title: 'Double Take', artist: 'Dhruv', file: 'assets/audio/music2.mp3' },
];

let currentTrack = 0;
let isShuffled = false;
let isLooping = false;

function getAudio() { return document.getElementById('bg-music'); }

function getPlayIcon() { return document.querySelector('.play-btn i'); }

function getBars() { return document.querySelectorAll('.bar'); }

function updateSongInfo() {
    const track = playlist[currentTrack];
    document.querySelector('.song-title').textContent = track.title;
    document.querySelector('.song-artist').textContent = track.artist;
}

function loadTrack(index) {
    const audio = getAudio();
    const track = playlist[index];
    audio.querySelector('source').src = track.file;
    audio.load();
    currentTrack = index;
    updateSongInfo();
}

function playCurrent() {
    const audio = getAudio();
    const icon = getPlayIcon();
    const bars = getBars();
    icon.classList.remove('ph-play-circle');
    icon.classList.add('ph-pause-circle');
    bars.forEach(bar => bar.style.animationPlayState = 'running');
    audio.play().catch(() => {});
}

function pauseCurrent() {
    const audio = getAudio();
    const icon = getPlayIcon();
    const bars = getBars();
    icon.classList.remove('ph-pause-circle');
    icon.classList.add('ph-play-circle');
    bars.forEach(bar => bar.style.animationPlayState = 'paused');
    audio.pause();
}

function toggleMusic(btn) {
    const icon = btn.querySelector('i');
    const audio = getAudio();
    const bars = getBars();
    
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

function nextTrack() {
    if (isShuffled) {
        let next;
        do { next = Math.floor(Math.random() * playlist.length); }
        while (next === currentTrack && playlist.length > 1);
        loadTrack(next);
    } else {
        loadTrack((currentTrack + 1) % playlist.length);
    }
    if (isLooping || isPlaying()) playCurrent();
}

function prevTrack() {
    if (isShuffled) {
        let prev;
        do { prev = Math.floor(Math.random() * playlist.length); }
        while (prev === currentTrack && playlist.length > 1);
        loadTrack(prev);
    } else {
        loadTrack((currentTrack - 1 + playlist.length) % playlist.length);
    }
    if (isLooping || isPlaying()) playCurrent();
}

function isPlaying() {
    const icon = getPlayIcon();
    return icon.classList.contains('ph-pause-circle');
}

function toggleShuffle() {
    isShuffled = !isShuffled;
    document.querySelector('.shuffle-btn').classList.toggle('active');
}

function toggleLoop() {
    isLooping = !isLooping;
    document.querySelector('.loop-btn').classList.toggle('active');
    getAudio().loop = isLooping;
}

getAudio().addEventListener('ended', () => {
    if (isLooping) {
        playCurrent();
    } else if (currentTrack < playlist.length - 1) {
        nextTrack();
    } else {
        pauseCurrent();
        loadTrack(0);
    }
});

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
document.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    switch (e.code) {
        case 'Escape': {
            const menuNav = document.getElementById('navbar');
            if (menuNav.classList.contains('active')) toggleMenu();
            break;
        }
        case 'Space':
            e.preventDefault();
            toggleMusic(document.querySelector('.play-btn'));
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextTrack();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            prevTrack();
            break;
        case 'ArrowUp':
            e.preventDefault();
            const audio = getAudio();
            audio.volume = Math.min(1, audio.volume + 0.1);
            break;
        case 'ArrowDown':
            e.preventDefault();
            const audio2 = getAudio();
            audio2.volume = Math.max(0, audio2.volume - 0.1);
            break;
    }
});

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

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
const touchElements = document.querySelectorAll('.cta-btn, .fav-chip, .hobby-card, .ngl-btn, .ctrl-btn, .play-btn, .achievement-item, .polaroid, .film-polaroid');

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
