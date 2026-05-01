// ===== SMOOTH SCROLL =====
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ===== FADE-IN ON SCROLL =====
const faders = document.querySelectorAll('.card, .section h3, .hero p');

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// ===== HEADER SHADOW ON SCROLL =====
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
    } else {
        header.style.boxShadow = "none";
    }
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + current) {
            a.classList.add("active");
        }
    });
});

// ===== BUTTON MICRO-INTERACTION =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = "scale(1.05)";
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = "scale(1)";
    });
});

// ===== TYPEWRITER EFFECT (HERO TITLE) =====
const text = "Quantity Surveyor & Cost Engineer";
let index = 0;
const speed = 50;

function typeWriter() {
    const title = document.querySelector(".hero h2");
    if (!title) return;

    if (index < text.length) {
        title.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Clear text first then start typing
window.addEventListener("load", () => {
    const title = document.querySelector(".hero h2");
    if (title) {
        title.innerHTML = "";
        typeWriter();
    }
});

// ===== PARALLAX EFFECT (SUBTLE) =====
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    let scrollPosition = window.pageYOffset;

    hero.style.backgroundPositionY = scrollPosition * 0.3 + "px";
});
