/**
 * Monastery360 — Shared Navigation & Footer
 * Inject <script src="nav.js"></script> in every page's <head> or just before </body>
 */

(function () {
  /* ── detect current page ── */
  const path = location.pathname.split('/').pop() || 'index.html';

  const pages = [
    { href: 'index.html',        label: 'Home',          icon: 'fa-home' },
    { href: 'm360.html',         label: 'Virtual Tours', icon: 'fa-vr-cardboard' },
    { href: 'map.html',          label: 'District Map',  icon: 'fa-map-marked-alt' },
    { href: 'audguide.html',     label: 'Audio Guide',   icon: 'fa-headphones' },
    { href: 'audio.html',        label: 'Narration',     icon: 'fa-microphone' },
    { href: 'narrative.html',    label: 'Stories',       icon: 'fa-book-open' },
    { href: 'digarc.html',       label: 'Archives',      icon: 'fa-archive' },
    { href: 'cultcal.html',      label: 'Calendar',      icon: 'fa-calendar-alt' },
  ];

  /* ── inject Bootstrap + Font Awesome if not already present ── */
  function injectLink(href, integrity) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href;
    if (integrity) { l.integrity = integrity; l.crossOrigin = 'anonymous'; }
    document.head.appendChild(l);
  }

  injectLink('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
  injectLink('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
  injectLink('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

  /* ── shared CSS vars + navbar/footer styles ── */
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --m360-gold:     #d4af37;
      --m360-dark:     #8b7355;
      --m360-burgundy: #722f37;
      --m360-cream:    #faf8f5;
      --m360-text:     #2c2c2c;
      --m360-muted:    #6b7280;
      --m360-shadow:   0 4px 20px rgba(0,0,0,.08);
      --m360-shadow-h: 0 8px 30px rgba(0,0,0,.12);
      --m360-grad:     linear-gradient(135deg,#d4af37 0%,#8b7355 100%);
      --m360-grad-acc: linear-gradient(135deg,#722f37 0%,#8b4513 100%);
    }

    /* ── NAVBAR ── */
    #m360-navbar {
      background: linear-gradient(135deg,rgba(255,255,255,.97) 0%,rgba(250,248,245,.99) 100%);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(212,175,55,.25);
      box-shadow: var(--m360-shadow);
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 9999;
      transition: padding .3s ease, box-shadow .3s ease;
    }
    #m360-navbar.scrolled { box-shadow: var(--m360-shadow-h); }
    #m360-navbar .navbar-brand {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem; font-weight: 700;
      background: var(--m360-grad);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    #m360-navbar .nav-link {
      color: var(--m360-text) !important;
      font-weight: 500; font-size: .875rem;
      padding: .45rem .7rem !important;
      border-radius: 6px;
      transition: color .25s, background .25s;
      white-space: nowrap;
    }
    #m360-navbar .nav-link:hover,
    #m360-navbar .nav-link.active {
      color: var(--m360-gold) !important;
      background: rgba(212,175,55,.09);
    }
    #m360-navbar .nav-link.active { font-weight: 600; }
    #m360-navbar .nav-link i { margin-right: 4px; font-size: .8rem; }
    #m360-navbar .btn-explore {
      background: var(--m360-grad);
      border: none; color: #fff !important;
      border-radius: 50px; padding: .4rem 1.2rem;
      font-size: .85rem; font-weight: 600;
      transition: transform .25s, box-shadow .25s;
    }
    #m360-navbar .btn-explore:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(212,175,55,.4); }
    .m360-page-body { padding-top: 68px; }

    /* ── BREADCRUMB ── */
    #m360-breadcrumb {
      background: rgba(250,248,245,.8);
      border-bottom: 1px solid rgba(212,175,55,.12);
      padding: .5rem 0;
    }
    #m360-breadcrumb .breadcrumb { margin: 0; }
    #m360-breadcrumb .breadcrumb-item a { color: var(--m360-gold); text-decoration: none; font-size: .82rem; }
    #m360-breadcrumb .breadcrumb-item.active { color: var(--m360-muted); font-size: .82rem; }

    /* ── FOOTER ── */
    #m360-footer {
      background: linear-gradient(135deg,#2c2c2c,#1a1a1a);
      color: #fff; position: relative; margin-top: 4rem;
    }
    #m360-footer::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0;
      height: 3px; background: var(--m360-grad);
    }
    #m360-footer a { color: rgba(255,255,255,.75); text-decoration: none; transition: color .25s; }
    #m360-footer a:hover { color: var(--m360-gold); }
    #m360-footer .footer-brand {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem; font-weight: 700; color: #fff;
    }
    #m360-footer .social-icon {
      width: 36px; height: 36px;
      border-radius: 50%; border: 1px solid rgba(255,255,255,.2);
      display: inline-flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,.75); transition: all .25s;
    }
    #m360-footer .social-icon:hover { background: var(--m360-grad); border-color: transparent; color: #fff; }
    #m360-footer .footer-heading { color: var(--m360-gold); font-weight: 600; margin-bottom: 1rem; font-size: .95rem; letter-spacing: .04em; text-transform: uppercase; }
    #m360-footer .footer-links li { margin-bottom: .5rem; }
    #m360-footer .footer-links a { font-size: .875rem; color: rgba(255,255,255,.7); }
    #m360-footer .footer-links a:hover { color: var(--m360-gold); }
    #m360-footer .newsletter-input { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); color: #fff; border-radius: 6px 0 0 6px; }
    #m360-footer .newsletter-input::placeholder { color: rgba(255,255,255,.4); }
    #m360-footer .newsletter-input:focus { background: rgba(255,255,255,.12); box-shadow: none; border-color: var(--m360-gold); color: #fff; }
    #m360-footer .newsletter-btn { background: var(--m360-grad); border: none; color: #fff; border-radius: 0 6px 6px 0; padding: 0 1.2rem; font-weight: 600; }
    #m360-footer hr { border-color: rgba(255,255,255,.1); }
    #m360-footer .footer-bottom { font-size: .8rem; color: rgba(255,255,255,.5); }

    /* ── back-to-top ── */
    #m360-top-btn {
      position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9998;
      width: 42px; height: 42px; border-radius: 50%;
      background: var(--m360-grad); border: none; color: #fff;
      box-shadow: 0 4px 14px rgba(212,175,55,.45);
      opacity: 0; pointer-events: none;
      transition: opacity .3s, transform .3s;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem;
    }
    #m360-top-btn.visible { opacity: 1; pointer-events: all; }
    #m360-top-btn:hover { transform: translateY(-3px); }
  `;
  document.head.appendChild(style);

  /* ── build nav links HTML ── */
  const navItems = pages.map(p => {
    const active = (p.href === path || (path === '' && p.href === 'index.html')) ? 'active' : '';
    return `<li class="nav-item">
      <a class="nav-link ${active}" href="${p.href}">
        <i class="fas ${p.icon}"></i>${p.label}
      </a>
    </li>`;
  }).join('');

  /* ── build navbar ── */
  const navbar = document.createElement('nav');
  navbar.id = 'm360-navbar';
  navbar.className = 'navbar navbar-expand-lg';
  navbar.innerHTML = `
    <div class="container-fluid px-4">
      <a class="navbar-brand" href="index.html">
        <i class="fas fa-dharmachakra me-2" style="font-size:1.4rem;color:#d4af37;-webkit-text-fill-color:#d4af37;"></i>
        Monastery360
      </a>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#m360NavCollapse"
        aria-controls="m360NavCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="m360NavCollapse">
        <ul class="navbar-nav mx-auto gap-1">${navItems}</ul>
        <div class="d-flex align-items-center gap-2 mt-2 mt-lg-0">
          <a class="btn-explore" href="evbook.html"><i class="fas fa-ticket-alt me-1"></i>Book Events</a>
        </div>
      </div>
    </div>`;

  /* ── breadcrumb ── */
  const current = pages.find(p => p.href === path);
  const bcLabel = current ? current.label : 'Page';
  const breadcrumb = document.createElement('div');
  breadcrumb.id = 'm360-breadcrumb';
  breadcrumb.innerHTML = `
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item"><a href="index.html"><i class="fas fa-home me-1"></i>Home</a></li>
        ${path !== 'index.html' ? `<li class="breadcrumb-item active">${bcLabel}</li>` : ''}
      </ol>
    </div>`;

  /* ── footer ── */
  const footer = document.createElement('footer');
  footer.id = 'm360-footer';
  footer.innerHTML = `
    <div class="container py-5">
      <div class="row g-4">
        <!-- Brand -->
        <div class="col-lg-4">
          <div class="footer-brand mb-2">
            <i class="fas fa-dharmachakra me-2" style="color:#d4af37;"></i>Monastery360
          </div>
          <p style="color:rgba(255,255,255,.65);font-size:.875rem;line-height:1.7;">
            Preserving and sharing Sikkim's monastic heritage through immersive digital experiences that connect ancient
            wisdom with modern accessibility.
          </p>
          <div class="d-flex gap-2 mt-3">
            <a class="social-icon" href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a class="social-icon" href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a class="social-icon" href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a class="social-icon" href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>

        <!-- Explore -->
        <div class="col-lg-2 col-md-4">
          <div class="footer-heading">Explore</div>
          <ul class="list-unstyled footer-links">
            <li><a href="m360.html"><i class="fas fa-vr-cardboard me-1"></i>Virtual Tours</a></li>
            <li><a href="map.html"><i class="fas fa-map me-1"></i>District Map</a></li>
            <li><a href="audguide.html"><i class="fas fa-headphones me-1"></i>Audio Guide</a></li>
            <li><a href="narrative.html"><i class="fas fa-book-open me-1"></i>Stories</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="col-lg-2 col-md-4">
          <div class="footer-heading">Resources</div>
          <ul class="list-unstyled footer-links">
            <li><a href="digarc.html"><i class="fas fa-archive me-1"></i>Digital Archives</a></li>
            <li><a href="cultcal.html"><i class="fas fa-calendar-alt me-1"></i>Cultural Calendar</a></li>
            <li><a href="evbook.html"><i class="fas fa-ticket-alt me-1"></i>Book Events</a></li>
            <li><a href="audio.html"><i class="fas fa-microphone me-1"></i>Narration</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-lg-4 col-md-4">
          <div class="footer-heading">Stay Connected</div>
          <p style="color:rgba(255,255,255,.65);font-size:.875rem;margin-bottom:1rem;">
            Get updates on new monastery features, cultural events, and heritage initiatives.
          </p>
          <div class="input-group">
            <input type="email" class="form-control newsletter-input" placeholder="Your email address" id="m360-email-input">
            <button class="newsletter-btn" onclick="m360Subscribe()">Subscribe</button>
          </div>
          <p style="color:rgba(255,255,255,.4);font-size:.75rem;margin-top:.6rem;">
            <i class="fas fa-lock me-1"></i>We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>

      <hr class="my-4">

      <div class="row align-items-center footer-bottom">
        <div class="col-md-6">
          © 2024 Monastery360. Preserving heritage, connecting cultures.
        </div>
        <div class="col-md-6 text-md-end mt-2 mt-md-0">
          <a href="#" class="me-3">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>`;

  /* ── back-to-top button ── */
  const topBtn = document.createElement('button');
  topBtn.id = 'm360-top-btn';
  topBtn.title = 'Back to top';
  topBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── inject Bootstrap JS if needed ── */
  function ensureBootstrapJS() {
    if (window.bootstrap) return;
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(s);
  }

  /* ── mount everything on DOMContentLoaded ── */
  function mount() {
    /* add padding class to body */
    document.body.classList.add('m360-page-body');

    /* remove any existing <header> or <nav> that was the original page header */
    document.querySelectorAll('body > header, body > nav').forEach(el => {
      /* keep if it's our injected one */
      if (el.id === 'm360-navbar') return;
      /* If it looks like a plain page header (not a Bootstrap navbar), remove it */
      if (el.tagName === 'HEADER' || (el.tagName === 'NAV' && !el.closest('#m360-navbar'))) {
        el.remove();
      }
    });

    document.body.insertBefore(navbar, document.body.firstChild);

    /* breadcrumb only on inner pages */
    if (path !== 'index.html') {
      document.body.insertBefore(breadcrumb, navbar.nextSibling);
    }

    /* footer: remove existing <footer> elements first */
    document.querySelectorAll('body > footer').forEach(f => {
      if (f.id !== 'm360-footer') f.remove();
    });
    document.body.appendChild(footer);
    document.body.appendChild(topBtn);

    ensureBootstrapJS();

    /* scroll behaviour */
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      topBtn.classList.toggle('visible', window.scrollY > 400);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  /* ── global helpers ── */
  window.m360Subscribe = function () {
    const inp = document.getElementById('m360-email-input');
    if (inp && inp.value && inp.value.includes('@')) {
      alert(`✅ Thank you! ${inp.value} has been subscribed to Monastery360 updates.`);
      inp.value = '';
    } else {
      alert('⚠️ Please enter a valid email address.');
    }
  };
})();
