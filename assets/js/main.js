(function () {
  const root = document.documentElement;

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Theme toggle (remembers choice; defaults to system preference)
  const toggle = document.getElementById('themeToggle');
  toggle && toggle.addEventListener('click', () => {
    const current = root.dataset.theme ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  const menuBtn = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Nav border on scroll
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Active section highlight
  const navAnchors = [...document.querySelectorAll('.nav__links a')];
  const sections = navAnchors.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));

    // Reveal on scroll
    const rev = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => rev.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  // News: show latest 6, expand on demand
  const news = document.getElementById('newsList');
  const newsBtn = document.getElementById('newsToggle');
  if (news && newsBtn) {
    const total = news.children.length;
    if (total > 6) {
      news.classList.add('collapsed');
      newsBtn.textContent = `Show all ${total} updates`;
      newsBtn.addEventListener('click', () => {
        const collapsed = news.classList.toggle('collapsed');
        newsBtn.setAttribute('aria-expanded', String(!collapsed));
        newsBtn.textContent = collapsed ? `Show all ${total} updates` : 'Show fewer';
        if (collapsed) news.scrollIntoView({ block: 'start' });
      });
    } else {
      newsBtn.remove();
    }
  }

  // Lightweight YouTube embeds: thumbnail first, iframe on click
  document.querySelectorAll('.video[data-yt]').forEach(el => {
    const id = el.dataset.yt, title = el.dataset.title || 'Video';
    el.innerHTML = `
      <div class="video__frame">
        <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy">
        <button class="video__play" aria-label="Play: ${title.replace(/"/g, '&quot;')}">
          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path class="fill" d="M8 5v14l11-7z"/></svg></span>
        </button>
      </div>
      <p class="video__title">${title}</p>`;
    el.querySelector('.video__play').addEventListener('click', function () {
      const frame = el.querySelector('.video__frame');
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0"
        title="${title.replace(/"/g, '&quot;')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    });
  });
})();
