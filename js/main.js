// main.js - Funcionalidad principal
document.addEventListener('DOMContentLoaded', function() {
  // Menú móvil
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const closeMenu = document.querySelector('.close-menu');
  hamburger?.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
    // Actualizar aria-hidden
    navLinks.setAttribute('aria-hidden', !isActive);
  });
  closeMenu?.addEventListener('click', () => {
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
    navLinks.setAttribute('aria-hidden', 'true');
  });
  // Cerrar menú al hacer click en un enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
      navLinks.setAttribute('aria-hidden', 'true');
    });
  });

  // Scroll suave para enlaces internos
  document.querySelectorAll('.nav-links a, .footer-links a, .btn[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Formulario de contacto (simulado)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formMsg = document.getElementById('formMsg');
      if (formMsg) {
        formMsg.textContent = 'Enviando tu mensaje...';
        formMsg.style.color = 'white';
        setTimeout(() => {
          formMsg.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo en menos de 24 horas.';
          formMsg.style.color = 'var(--accent)';
          this.reset();
        }, 1500);
      }
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentNode;
      item.classList.toggle('active');
    });
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const item = question.parentNode;
        item.classList.toggle('active');
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  });

  // Touch feedback en móviles (opcional)
  document.querySelectorAll('.card, .team-card, .btn').forEach(element => {
    element.addEventListener('touchstart', () => {
      element.classList.add('touched');
      element.style.transform = 'scale(0.98)';
    });
    element.addEventListener('touchend', () => {
      setTimeout(() => element.classList.remove('touched'), 200);
      element.style.transform = 'scale(1)';
    });
  });

  // Pausar animaciones canvas si pestaña no visible
  document.addEventListener('visibilitychange', () => {
    const canvasHero = document.getElementById('stars-canvas');
    const canvasContact = document.getElementById('stars-contact-canvas');
    if (document.hidden) {
      if (canvasHero) canvasHero.style.display = 'none';
      if (canvasContact) canvasContact.style.display = 'none';
    } else {
      if (canvasHero) canvasHero.style.display = 'block';
      if (canvasContact) canvasContact.style.display = 'block';
    }
  });
});
