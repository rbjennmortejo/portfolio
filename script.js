// ===== CONFIGURATION =====
const CONFIG = {
    typewriterSpeed: 50,
    scrollThreshold: 50,
    parallaxMultiplier: 0.3,
    intersectionThreshold: 0.2
};

// ===== UTILITY: THROTTLE =====
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== FADE-IN ON SCROLL =====
function initFadeInOnScroll() {
    const faders = document.querySelectorAll('.card, .section h3, .hero p');
    
    const appearOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: CONFIG.intersectionThreshold });

    faders.forEach(fader => appearOnScroll.observe(fader));
}

// ===== HEADER SHADOW ON SCROLL =====
function initHeaderShadow() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', throttle(() => {
        header.classList.toggle('shadow', window.scrollY > CONFIG.scrollThreshold);
    }, 50));
}

// Add this to your CSS:
// header.shadow { box-shadow: 0 5px 20px rgba(0,0,0,0.08); }

// ===== ACTIVE NAV LINK =====
function initActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', throttle(() => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }, 50));
}

// ===== BUTTON MICRO-INTERACTION =====
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('btn-hover');
        });
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('btn-hover');
        });
    });
}

// Add this to your CSS:
// .btn-hover { transform: scale(1.05); transition: transform 0.2s ease; }

// ===== TYPEWRITER EFFECT (HERO TITLE) =====
const typewriterState = { index: 0 };

function typeWriter() {
    const title = document.querySelector('.hero h2');
    if (!title) return;

    const text = 'Quantity Surveyor & Cost Engineer';
    
    if (typewriterState.index < text.length) {
        title.innerHTML += text.charAt(typewriterState.index);
        typewriterState.index++;
        setTimeout(typeWriter, CONFIG.typewriterSpeed);
    }
}

// ===== BOQ PREVIEW MODAL =====
function openPreview(imageSrc) {
    const modal = document.getElementById('previewModal');
    const modalImg = document.getElementById('previewImage');
    
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
    }
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function initModalClosing() {
    const modal = document.getElementById('previewModal');
    if (!modal) return;

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ===== PARALLAX EFFECT (SUBTLE) =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', throttle(() => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * CONFIG.parallaxMultiplier}px`;
    }, 30));
}

// ===== INITIALIZE ALL =====
function initAll() {
    initSmoothScroll();
    initFadeInOnScroll();
    initHeaderShadow();
    initActiveNavLink();
    initButtonInteractions();
    initModalClosing();
    initParallax();

    // Start typewriter after page loads
    window.addEventListener('load', () => {
        const title = document.querySelector('.hero h2');
        if (title) {
            title.innerHTML = '';
            typewriterState.index = 0;
            typeWriter();
        }
    });
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}