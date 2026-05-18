const WA_NUMBER = '5491176551042';

const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

const form = document.getElementById('contacto-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = form.querySelector('#nombre').value.trim();
    const telefono = form.querySelector('#telefono').value.trim();
    const email = form.querySelector('#email').value.trim();
    const mensaje = form.querySelector('#mensaje').value.trim();

    if (!nombre || !telefono || !mensaje) {
        alert('Por favor completá nombre, teléfono y mensaje.');
        return;
    }

    let text = `Hola AXIOTEK, les escribo desde su sitio web.\n\n`;
    text += `*Nombre:* ${nombre}\n`;
    text += `*Teléfono:* ${telefono}\n`;
    if (email) text += `*Email:* ${email}\n`;
    text += `\n*Consulta:*\n${mensaje}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Accordion de servicios principales
document.querySelectorAll('.service-card__header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.closest('.service-card');
        const isOpen = card.classList.toggle('is-open');
        header.setAttribute('aria-expanded', String(isOpen));
    });
    header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            header.click();
        }
    });
});
