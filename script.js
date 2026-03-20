/* ============================================
   THE YOUNG LEADERS CONCLAVE — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR: scroll state ── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ── 2. HAMBURGER MENU ── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });


  /* ── 3. SCROLL REVEAL ── */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right';
  const revealEls = document.querySelectorAll(revealSelectors);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);

        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -48px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 4. ACTIVE NAV LINK (highlight current section) ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── 5. SMOOTH SCROLL for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 6. HERO MOSAIC: subtle parallax on mouse move ── */
  const heroSection = document.querySelector('.hero');
  const mosaicGrid  = document.querySelector('.mosaic-grid');

  if (heroSection && mosaicGrid) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const cx   = rect.width  / 2;
      const cy   = rect.height / 2;
      const dx   = (e.clientX - rect.left - cx) / cx;
      const dy   = (e.clientY - rect.top  - cy) / cy;

      mosaicGrid.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      mosaicGrid.style.transform = 'translate(0, 0)';
    });
  }


  /* ── 7. VALUE CARDS: staggered entrance ── */
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });


  /* ── 8. CTA STRIP: animated text scroll (ticker) ── */
  const yellowBar = document.querySelector('.cta-bar.yellow span');
  const darkBar   = document.querySelector('.cta-bar.dark span');

  if (yellowBar && darkBar) {
    const phrases = [
      ['Rise.', 'Shape The Future.'],
      ['Lead.', 'Build Africa.'],
      ['Act.', 'Create Impact.'],
    ];
    let idx = 0;

    setInterval(() => {
      idx = (idx + 1) % phrases.length;

      // Fade out → update → fade in
      [yellowBar, darkBar].forEach((el, i) => {
        el.style.transition = 'opacity 0.4s';
        el.style.opacity = '0';
        setTimeout(() => {
          el.textContent = phrases[idx][i];
          el.style.opacity = '1';
        }, 400);
      });
    }, 3500);
  }


  /* ── 9. PAGE LOAD: fire hero reveals after short delay ── */
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), i * 120);
    });
  }, 200);

});
