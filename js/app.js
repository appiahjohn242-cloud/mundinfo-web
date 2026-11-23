(function () {
  const articles = typeof DEMO_ARTICLES !== 'undefined' ? DEMO_ARTICLES : [];
  let activeSection = 'All';

  const dateEl = document.getElementById('current-date');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = `Accra • ${now.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    })}`;
  }

  function renderNav() {
    const navList = document.getElementById('nav-list');
    if (!navList) return;
    const items = ['All', ...SECTIONS];
    navList.innerHTML = items.map(sec => `
      <li>
        <button class="nav-btn ${activeSection === sec ? 'active' : ''}" data-section="${sec}">
          ${sec === 'All' ? 'Home' : sec}
        </button>
      </li>
    `).join('');

    navList.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSection = btn.dataset.section;
        renderNav();
        renderHome();
      });
    });
  }

  function renderFooterSections() {
    const f1 = document.getElementById('footer-sections');
    const f2 = document.getElementById('footer-sections-2');
    if (f1) {
      f1.innerHTML = SECTIONS.slice(0, 6).map(s => `<li><a href="index.html">${s}</a></li>`).join('');
    }
    if (f2) {
      f2.innerHTML = SECTIONS.slice(6).map(s => `<li><a href="index.html">${s}</a></li>`).join('');
    }
  }

  function renderBreaking() {
    const el = document.getElementById('breaking-text');
    if (!el || !articles.length) return;
    el.textContent = `${articles[0].headline} — ${articles[0].summary}`;
  }

  function renderHome() {
    const heroEl = document.getElementById('hero-section');
    const gridEl = document.getElementById('news-grid');
    const headingEl = document.getElementById('feed-heading');
    const invEl = document.getElementById('investigations-grid');
    if (!heroEl || !gridEl) return;

    const filtered = activeSection === 'All'
      ? articles
      : articles.filter(a => a.section === activeSection);

    if (headingEl) {
      headingEl.textContent = activeSection === 'All'
        ? 'Latest International Dispatches'
        : `${activeSection} — Demonstration Dispatches`;
    }

    const pool = filtered.length ? filtered : articles;
    const lead = pool[0];
    const secondary = pool.slice(1, 4);

    if (lead) {
      heroEl.innerHTML = `
        <article class="lead-card">
          <a href="article.html?id=${encodeURIComponent(lead.id)}">
            <img src="${lead.image}" alt="${lead.headline}" />
          </a>
          <span class="kicker">${lead.kicker}</span>
          <h1 class="lead-title"><a href="article.html?id=${encodeURIComponent(lead.id)}">${lead.headline}</a></h1>
          <p class="summary">${lead.summary}</p>
          <div class="meta">${lead.author} • ${lead.date}</div>
        </article>
        <div class="secondary-stack">
          ${secondary.map(item => `
            <article class="secondary-item">
              <span class="kicker">${item.kicker}</span>
              <h2 class="secondary-title"><a href="article.html?id=${encodeURIComponent(item.id)}">${item.headline}</a></h2>
              <div class="meta">${item.section} • ${item.date}</div>
            </article>
          `).join('')}
        </div>
      `;
    }

    const rest = pool.slice(4);
    gridEl.innerHTML = (rest.length ? rest : pool).map(item => `
      <article class="news-card">
        <a href="article.html?id=${encodeURIComponent(item.id)}">
          <img src="${item.image}" alt="${item.headline}" />
        </a>
        <div class="news-card-body">
          <span class="kicker">${item.kicker}</span>
          <h3 class="news-card-title"><a href="article.html?id=${encodeURIComponent(item.id)}">${item.headline}</a></h3>
          <p class="summary">${item.summary}</p>
          <div class="meta" style="margin-top:auto;">${item.author} • ${item.date}</div>
        </div>
      </article>
    `).join('');

    if (invEl) {
      const invItems = articles.filter(a => a.section === 'Investigations' || a.section === 'Opinion').slice(0, 3);
      invEl.innerHTML = invItems.map(item => `
        <article class="inv-card">
          <span class="kicker">${item.kicker}</span>
          <h3 class="news-card-title"><a href="article.html?id=${encodeURIComponent(item.id)}">${item.headline}</a></h3>
          <p class="summary">${item.summary}</p>
          <div class="meta">${item.author} • ${item.date}</div>
        </article>
      `).join('');
    }
  }

  function renderArticlePage() {
    const container = document.getElementById('article-detail');
    if (!container) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const article = articles.find(a => a.id === id) || articles[0];
    if (!article) return;

    document.title = `${article.headline} — MUNDINFO`;
    container.innerHTML = `
      <p style="margin-bottom:1rem;"><a href="index.html" class="meta">&larr; Back to MUNDINFO Front Page</a></p>
      <span class="kicker">${article.kicker}</span>
      <h1 class="article-headline">${article.headline}</h1>
      <p class="article-lead">${article.summary}</p>
      <div class="meta">${article.author} • Published ${article.date}</div>
      <div class="share-bar">
        <button class="share-btn" id="copy-link-btn">Copy Link</button>
        <a class="share-btn" href="index.html">More in ${article.section}</a>
      </div>
      <img class="article-hero-img" src="${article.image}" alt="${article.headline}" />
      <div class="article-body">
        ${article.body.map(p => `<p>${p}</p>`).join('')}
      </div>
      <div class="article-sources">
        <strong>Source References (Demonstration):</strong>
        <ul style="margin-top:0.4rem; padding-left:1.2rem;">
          ${(article.sources || []).map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
    `;

    const copyBtn = document.getElementById('copy-link-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText(window.location.href);
        copyBtn.textContent = 'Link Copied';
      });
    }
  }

  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email')?.value || '';
      const msg = document.getElementById('newsletter-msg');
      if (msg) {
        msg.textContent = `Demonstration preview: ${email} noted locally (no backend connected yet).`;
      }
      form.reset();
    });
  }

  renderNav();
  renderFooterSections();
  renderBreaking();
  renderHome();
  renderArticlePage();
})();

  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email')?.value || '';
      const msg = document.getElementById('newsletter-msg');
      if (msg) {
        msg.textContent = `Demonstration preview: ${email} noted locally (no backend connected yet).`;
      }
      form.reset();
    });
  }

  renderNav();
  renderFooterSections();
  renderBreaking();
  renderHome();
  renderArticlePage();
})();
