/**
 * Azure Cloud & DevOps Portfolio — Main JavaScript
 * Author: Kshitij Verma
 *
 * Features:
 *  - Navbar scroll behaviour & active link highlighting
 *  - Smooth mobile menu toggle
 *  - Intersection Observer scroll-reveal animations
 *  - Animated skill progress bars
 *  - Reading-progress indicator
 *  - Particle background generation
 *  - Counter animation for hero stats
 *  - Contact form validation with simulated send
 *  - Back-to-top button
 *  - Typed/rotating text effect
 */

'use strict';

/* ============================================================
   DOM ELEMENTS
   ============================================================ */
const navbar        = document.getElementById('navbar');
const hamburger     = document.getElementById('hamburger');
const mobileNav     = document.getElementById('mobileNav');
const mobileClose   = document.getElementById('mobileClose');
const backToTop     = document.getElementById('backToTop');
const readingProg   = document.getElementById('readingProgress');
const particleWrap  = document.getElementById('particles');
const contactForm   = document.getElementById('contactForm');
const formStatus    = document.getElementById('formStatus');
const formSubmitBtn = document.getElementById('form-submit-btn');

/* ============================================================
   NAVBAR — Scroll Behaviour
   ============================================================ */
let lastScrollY = 0;

function handleNavScroll() {
  const scrollY = window.scrollY;

  // Toggle scrolled class for glass effect
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top visibility
  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Reading progress
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const readPct      = Math.min((scrollY / docHeight) * 100, 100);
  readingProg.style.width = readPct + '%';

  lastScrollY = scrollY;
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // Run once on load

/* ============================================================
   ACTIVE NAV LINK — Section highlighting
   ============================================================ */
const navLinkMap = {
  'home':          document.getElementById('nav-home'),
  'about':         document.getElementById('nav-about'),
  'skills':        document.getElementById('nav-skills'),
  'projects':      document.getElementById('nav-projects'),
  'certifications':document.getElementById('nav-certs'),
  'experience':    document.getElementById('nav-exp'),
  'contact':       document.getElementById('nav-contact'),
};

const sections = Array.from(document.querySelectorAll('section[id]'));

function updateActiveNav() {
  const scrollMid = window.scrollY + window.innerHeight / 3;
  let currentId = 'home';

  for (const section of sections) {
    if (section.offsetTop <= scrollMid) {
      currentId = section.id;
    }
  }

  Object.values(navLinkMap).forEach(link => link && link.classList.remove('active'));
  if (navLinkMap[currentId]) navLinkMap[currentId].classList.add('active');
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ============================================================
   MOBILE MENU
   ============================================================ */
function openMobileNav() {
  mobileNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileNav);
mobileClose.addEventListener('click', closeMobileNav);

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeMobileNav();
});

/* ============================================================
   BACK TO TOP
   ============================================================ */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   SCROLL REVEAL — Intersection Observer
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   SKILL BARS — Animated on scroll
   ============================================================ */
const skillBars = document.querySelectorAll('.skill-bar-fill[data-width]');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const width = bar.getAttribute('data-width');
        // Short timeout so CSS transition plays after element is visible
        setTimeout(() => { bar.style.width = width + '%'; }, 150);
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach(bar => barObserver.observe(bar));

/* ============================================================
   COUNTER ANIMATION — Hero stats
   ============================================================ */
function animateCounter(el, target, suffix, duration) {
  const start     = 0;
  const startTime = performance.now();
  const isFloat   = target % 1 !== 0;

  function step(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    const current  = start + (target - start) * eased;

    el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const heroSection = document.getElementById('home');
let countersStarted = false;

const counterObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;

      setTimeout(() => {
        animateCounter(document.getElementById('stat-years'),    4,   '+', 1200);
        animateCounter(document.getElementById('stat-projects'), 25,  '+', 1400);
        animateCounter(document.getElementById('stat-certs'),    6,   '',  1000);
      }, 600);

      counterObserver.disconnect();
    }
  },
  { threshold: 0.5 }
);

if (heroSection) counterObserver.observe(heroSection);

/* ============================================================
   PARTICLE BACKGROUND
   ============================================================ */
function createParticles() {
  if (!particleWrap) return;

  const count = window.innerWidth < 768 ? 20 : 40;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const x        = Math.random() * 100;
    const duration = 8 + Math.random() * 14;
    const delay    = Math.random() * 10;
    const size     = 1.5 + Math.random() * 2.5;
    const opacity  = 0.3 + Math.random() * 0.5;

    p.style.cssText = `
      left: ${x}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: 0;
      ${i % 3 === 0 ? 'background: var(--clr-cyan);' : ''}
      ${i % 5 === 0 ? 'background: var(--clr-purple-soft);' : ''}
    `;

    particleWrap.appendChild(p);
  }
}

createParticles();

/* ============================================================
   TYPED TEXT EFFECT — Hero role
   ============================================================ */
const roles = [
  'Azure Cloud Engineer',
  'DevOps Specialist',
  'Kubernetes Expert',
  'Terraform Architect',
  'Site Reliability Engineer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTarget = document.querySelector('.hero-card-role');

function typeEffect() {
  if (!typedTarget) return;

  const current = roles[roleIndex];

  if (!isDeleting) {
    typedTarget.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedTarget.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      roleIndex   = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 60 : 90;
  setTimeout(typeEffect, speed);
}

// Start typing effect after a short delay
setTimeout(typeEffect, 1200);

/* ============================================================
   CONTACT FORM — Validation & Simulated Submit
   ============================================================ */
function showStatus(type, message) {
  formStatus.className = 'form-status ' + type;
  formStatus.textContent = message;
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-hide success after 6 seconds
  if (type === 'success') {
    setTimeout(() => {
      formStatus.className = 'form-status';
      formStatus.textContent = '';
    }, 6000);
  }
}

function validateForm() {
  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value;
  const message = document.getElementById('form-message').value.trim();

  if (!name || name.length < 2) {
    showStatus('error', '❌ Please enter your full name (at least 2 characters).');
    document.getElementById('form-name').focus();
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showStatus('error', '❌ Please enter a valid email address.');
    document.getElementById('form-email').focus();
    return false;
  }

  if (!subject) {
    showStatus('error', '❌ Please select a subject.');
    document.getElementById('form-subject').focus();
    return false;
  }

  if (!message || message.length < 20) {
    showStatus('error', '❌ Please write a message with at least 20 characters.');
    document.getElementById('form-message').focus();
    return false;
  }

  return true;
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Simulate network request
    formSubmitBtn.disabled    = true;
    formSubmitBtn.textContent = '⏳ Sending...';

    await new Promise(resolve => setTimeout(resolve, 1500));

    formSubmitBtn.disabled    = false;
    formSubmitBtn.textContent = '📨 Send Message';

    showStatus('success', '✅ Message sent! I\'ll get back to you within 24 hours. Thank you!');
    contactForm.reset();
  });
}

/* ============================================================
   SMOOTH SCROLL — For all anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   CARD TILT EFFECT — Project & skill cards
   ============================================================ */
function applyTilt(cards, maxAngle = 6) {
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const angleX = -dy * maxAngle;
      const angleY =  dx * maxAngle;
      card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

applyTilt(document.querySelectorAll('.project-card'));
applyTilt(document.querySelectorAll('.cert-card'), 4);

/* ============================================================
   SKILL CATEGORY — Hover glow effect
   ============================================================ */
document.querySelectorAll('.skill-category-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width)  * 100;
    const y    = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,120,212,0.07) 0%, var(--clr-bg-card2) 60%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

/* ============================================================
   ACTIVE SECTION INDICATOR — Timeline dots pulse
   ============================================================ */
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const dot = entry.target.querySelector('.timeline-dot');
      if (dot) {
        if (entry.isIntersecting) {
          dot.style.background = 'var(--clr-cyan)';
          dot.style.boxShadow  = '0 0 16px var(--clr-cyan)';
        } else {
          dot.style.background = '';
          dot.style.boxShadow  = '';
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.timeline-item').forEach(item => timelineObserver.observe(item));

/* ============================================================
   ARCHITECTURE CARDS — Animated entrance
   ============================================================ */
const archObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = (i * 0.1) + 's';
        entry.target.style.animation = 'fadeInUp 0.6s ease-out both';
        archObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.arch-card').forEach(card => archObserver.observe(card));

/* ============================================================
   CONSOLE EASTER EGG
   ============================================================ */
console.log(
  '%c☁️ Kshitij Verma — Azure Cloud & DevOps Portfolio\n' +
  '%cAZ-104 | AZ-400 | AZ-305 | CKA | Terraform Associate\n' +
  'Looking to collaborate? Reach out via the contact form!',
  'color:#0078d4; font-size:1.1rem; font-weight:bold;',
  'color:#94b8d8; font-size:0.85rem;'
);

/* ============================================================
   INIT — Run on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial active nav state
  updateActiveNav();

  // Ensure reading progress starts at 0
  if (readingProg) readingProg.style.width = '0%';

  console.log('Portfolio initialised successfully ✅');
});
