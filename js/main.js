/**
 * Mathibe Geomatics & Consulting – main.js
 * Vanilla ES2020+ | No jQuery | No dependencies
 */

'use strict';

/* ── NAVBAR: scroll state & hamburger ───────────────────────────── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar-custom');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (hamburger && mobileMenu && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  // Set active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── HERO CAROUSEL ──────────────────────────────────────────────── */
(function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;
  let paused = false;

  const showSlide = (n) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  const next = () => showSlide(current + 1);
  const prev = () => showSlide(current - 1);

  const startTimer = () => {
    clearInterval(timer);
    if (!paused) timer = setInterval(next, 5000);
  };

  document.getElementById('carousel-next')?.addEventListener('click', () => { next(); startTimer(); });
  document.getElementById('carousel-prev')?.addEventListener('click', () => { prev(); startTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { showSlide(i); startTimer(); });
  });

  const hero = document.querySelector('.hero-carousel');
  hero?.addEventListener('mouseenter', () => { paused = true; clearInterval(timer); });
  hero?.addEventListener('mouseleave', () => { paused = false; startTimer(); });

  // Touch support
  let touchStartX = 0;
  hero?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  hero?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); startTimer(); }
  });

  startTimer();
})();

/* ── INTERSECTION OBSERVER (scroll reveal) ──────────────────────── */
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ── COUNTER ANIMATION ──────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;

        const update = () => {
          current = Math.min(current + step, target);
          el.textContent = current.toLocaleString() + suffix;
          if (current < target) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ── BACK TO TOP ────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── POPIA CONSENT ──────────────────────────────────────────────── */
(function initPopia() {
  const banner = document.getElementById('popia-banner');
  if (!banner) return;
  if (localStorage.getItem('popia_accepted')) return;

  setTimeout(() => banner.classList.add('show'), 1200);

  document.getElementById('popia-accept')?.addEventListener('click', () => {
    localStorage.setItem('popia_accepted', '1');
    banner.classList.remove('show');
  });

  document.getElementById('popia-decline')?.addEventListener('click', () => {
    banner.classList.remove('show');
  });
})();

/* ── CONTACT / QUOTE FORMS ──────────────────────────────────────── */
(function initForms() {
  document.querySelectorAll('[data-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const success = form.querySelector('.form-success');
      if (!btn) return;

      // Validate
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        }
      });
      if (!valid) return;

      // Loading state
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Sending...';

      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.style.display = 'none';
          if (success) success.style.display = 'block';
        } else {
          throw new Error('Server error');
        }
      } catch {
        btn.disabled = false;
        btn.innerHTML = originalText;
        alert('Something went wrong. Please call us at +27 81 773 4326 or email info@mathibegeomatics.co.za');
      }
    });
  });
})();

/* ── RADIO CARD SELECT ──────────────────────────────────────────── */
(function initRadioCards() {
  document.querySelectorAll('.radio-option').forEach(option => {
    option.addEventListener('click', () => {
      const name = option.querySelector('input')?.name;
      if (name) {
        document.querySelectorAll(`.radio-option input[name="${name}"]`).forEach(inp => {
          inp.closest('.radio-option')?.classList.remove('selected');
        });
      }
      option.classList.add('selected');
      const input = option.querySelector('input');
      if (input) input.checked = true;

      // Show file upload if "Yes" for existing plans
      if (input?.id === 'has-plans-yes') {
        document.getElementById('file-upload-group')?.classList.remove('d-none');
      } else if (input?.id === 'has-plans-no') {
        document.getElementById('file-upload-group')?.classList.add('d-none');
      }
    });
  });
})();

/* ── PORTFOLIO FILTER ───────────────────────────────────────────── */
(function initPortfolioFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        if (show) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.display = '';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { if (card.style.opacity === '0') card.style.display = 'none'; }, 300);
        }
      });
    });
  });
})();

/* ── MOBILE DROPDOWN TOGGLES ────────────────────────────────────── */
(function initMobileDropdowns() {
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const sub = toggle.nextElementSibling;
      if (sub) sub.classList.toggle('open');
      toggle.querySelector('.toggle-icon')?.classList.toggle('rotated');
    });
  });
})();
