// animations.js - Animaciones GSAP, Typed.js, Swiper y canvas de estrellas en Hero y Contacto

document.addEventListener('DOMContentLoaded', function() {
  // Registrar plugins GSAP
  if (window.gsap && window.gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }

  // Typed.js en Hero
  if (typeof Typed !== 'undefined' && document.getElementById('typed')) {
    new Typed('#typed', {
      strings: [
        'Starlight',
        'Brillante cuidado infantil',
        'Confianza y Sostenibilidad',
        'Momentos Brillantes para tus hijos'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true
    });
  }

  // Swiper para testimonios: coverflow sin paginación
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
    new Swiper('.testimonial-swiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      // Se omite pagination para ocultar puntitos
      pagination: false,
      // breakpoints para responsive
      breakpoints: {
        320: {
          slidesPerView: 1,
          coverflowEffect: { rotate: 0, depth: 100, slideShadows: false }
        },
        768: {
          slidesPerView: 2,
          coverflowEffect: { rotate: 20, depth: 150, slideShadows: false }
        },
        992: {
          slidesPerView: 3,
          coverflowEffect: { rotate: 30, depth: 200, slideShadows: false }
        }
      }
    });
  }

  // Función común para inicializar animación de estrellas en un canvas dado
  function initStarsCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      // Para la sección contacto, la altura del canvas debe igualar la altura de la sección
      if (canvasId === 'stars-contact-canvas') {
        // toma la altura del elemento sección
        const section = document.getElementById('contacto');
        if (section) {
          canvas.height = section.offsetHeight;
        } else {
          canvas.height = window.innerHeight;
        }
      } else {
        // Hero: altura full viewport
        canvas.height = window.innerHeight;
      }
      // Si GSAP ScrollTrigger existe, refresca
      if (window.ScrollTrigger) {
        try { ScrollTrigger.refresh(); } catch(e) {}
      }
    }
    // Inicializar tamaño
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crear estrellas
    const stars = [];
    const STAR_COUNT = window.innerWidth < 768 ? 80 : 120;
    const isContact = (canvasId === 'stars-contact-canvas');
    // Base speed ligeramente diferente en Sección Contacto para que se vea suave
    const baseSpeed = isContact ? 0.05 : 0.1;
    const blinkFactor = window.innerWidth < 768 ? 0.5 : 1;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        blinkRate: (Math.random() * 0.02 + 0.005) * blinkFactor,
        blinkDirection: Math.random() > 0.5 ? 1 : -1,
        speed: baseSpeed * (Math.random() * 0.5 + 0.75)
      });
    }

    function drawStars() {
      // Fondo semitransparente / gradiente: aquí uso color oscuro similar al hero
      ctx.fillStyle = 'rgba(52, 44, 131, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Actualizar opacidad para parpadeo
        star.opacity += star.blinkRate * star.blinkDirection;
        if (star.opacity > 0.9) {
          star.opacity = 0.9;
          star.blinkDirection = -1;
        } else if (star.opacity < 0.3) {
          star.opacity = 0.3;
          star.blinkDirection = 1;
        }

        // Movimiento vertical leve para estrellas más grandes
        if (star.radius > 1) {
          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = -Math.random() * canvas.height * 0.1;
            star.x = Math.random() * canvas.width;
          }
        }
      });

      // Solo sigue animando si el canvas está visible (no display:none)
      if (canvas.style.display !== 'none') {
        requestAnimationFrame(drawStars);
      }
    }
    drawStars();
  }

  // Inicializar canvas de estrellas en Hero y Contacto
  initStarsCanvas('stars-canvas');
  initStarsCanvas('stars-contact-canvas');

  // GSAP: animar secciones al scroll
  if (window.gsap) {
    // Hero content fade-in
    if (document.querySelector('.hero-content')) {
      gsap.from('.hero-content', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
      });
    }
    // Animar elementos con clase .animate-on-scroll
    gsap.utils.toArray('.animate-on-scroll').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 60%',
            toggleActions: 'play none none none'
          },
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out"
        }
      );
    });
    // Animar testimonios al entrar en viewport
    gsap.utils.toArray('.testimonial').forEach((card, idx) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        rotation: -2,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        delay: idx * 0.1,
        ease: "back.out(1.2)"
      });
    });
    // Animar formulario de contacto o secciones específicas si deseas:
    const contactoSection = document.querySelector('#contacto .container');
    if (contactoSection) {
      gsap.from(contactoSection, {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: '#contacto',
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        duration: 1,
        ease: "power2.out"
      });
    }
  }

  // main.js se encarga de menú móvil, scroll suave, FAQ accordion, formulario, etc.
});
