// Loading screen
let loader = document.getElementById('loader');

window.addEventListener('load', function() {
    setTimeout(function() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

let sections = document.querySelectorAll('section');

let observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

let observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(function(section) {
    section.classList.add('hidden');
    observer.observe(section);
});

// Button pulse animation on hover
let buttons = document.querySelectorAll('.btn');

buttons.forEach(function(btn) {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.3s ease';
    });

    btn.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

let header = document.querySelector('header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

let backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
});

let cookieBanner = document.getElementById('cookie-banner');

// Only show if user has not already responded
if (!localStorage.getItem('cookieConsent')) {
    cookieBanner.style.display = 'flex';
} else {
    cookieBanner.style.display = 'none';
}

document.getElementById('cookie-accept').addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.style.display = 'none';
});

document.getElementById('cookie-decline').addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.style.display = 'none';
});