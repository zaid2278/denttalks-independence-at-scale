const $ = (id) => document.getElementById(id);
const qs = (sel, root=document) => root.querySelectorAll(sel);
const ytId = (url='') => (String(url).match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/)||[])[1] || '';
const driveId = (url='') => (String(url).match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([A-Za-z0-9_-]+)/)||[])[1] || '';
const ytThumb = (id) => id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : 'assets/intro-webinar-flyer.jpg';
const empty = (msg) => `<div class="empty">${msg}</div>`;
const pad = (n) => String(n).padStart(2,'0');
const plural = (n, one, many) => `${n} ${n===1?one:many}`;
const IFRAME_ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
const FLYER = 'assets/intro-webinar-flyer.jpg';
const LABELS = {
  series: 'Showing Independence@Scale sessions',
  podcasts: 'Showing DentTracks podcasts & masterclasses',
  blogs: 'Showing DentTracks insight articles'
};
const BLOGS_PER_PAGE = 6;
let blogPage = 1, lastBlogQuery = '', currentBlogs = [], cfgCache = {}, mediaCache = {}, rendered = {podcasts:false, blogs:false};

const setOverlay = (id, open) => {
  const el = $(id);
  el.hidden = !open;
  el.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};

function cardVideo(item){
  const id = item.videoId || ytId(item.url);
  const payload = encodeURIComponent(JSON.stringify(item));
  return `<article class="media-card">
    <button type="button" class="thumb js-open-video" data-item="${payload}" aria-label="Play ${item.title}">
      <span class="thumb-tag badge">${item.badge||'Podcast'}</span>
      <img src="${ytThumb(id)}" alt="" loading="lazy" decoding="async" width="640" height="400" /><div class="play"><span>▶</span></div>
    </button>
    <div class="body">
      <h3>${item.title}</h3><p>${item.description}</p>
      <div class="card-actions">
        <button type="button" class="text-link js-open-video" data-item="${payload}">${item.cta||'Watch Episode'} →</button>
        <span style="color:var(--muted);font-size:.82rem">${item.platform||'YouTube'}</span>
      </div>
    </div>
  </article>`;
}

function cardBlog(item){
  const external = /^https?:\/\//i.test(item.url);
  const target = external ? ' target="_blank" rel="noopener"' : '';
  const media = item.thumb
    ? `<img src="${item.thumb}" alt="" loading="lazy" decoding="async" width="640" height="400" />`
    : `<div class="thumb-fallback">${item.title.split(':')[0]}</div>`;
  return `<article class="media-card">
    <a class="thumb" href="${item.url}"${target}><span class="thumb-tag badge">${item.tag}</span>${media}</a>
    <div class="body">
      <div class="card-meta"><span>${item.author}</span><span>•</span><span>${item.meta}</span></div>
      <h3>${item.title}</h3><p>${item.description}</p>
      <div class="card-actions"><a class="text-link" href="${item.url}"${target}>${item.cta||'Read Article'} →</a></div>
    </div>
  </article>`;
}

function cardSeries(item, cfg){
  const href = item.url || cfg[item.urlKey] || cfg.joinSeriesUrl || '#';
  const poster = item.thumb || FLYER;
  return `<article class="media-card">
    <a class="thumb js-open-poster" href="${poster}" data-poster="${poster}" aria-label="Open full poster for ${item.title}">
      <span class="thumb-tag badge">${item.badge}</span>
      <img src="${poster}" alt="Event poster" loading="lazy" decoding="async" width="640" height="400" />
    </a>
    <div class="body">
      <div class="card-meta"><span>${item.date||''}</span><span>${item.duration||''}</span></div>
      <h3>${item.title}</h3><p>${item.description}</p>
      <div class="card-actions"><a class="text-link" href="${href}" target="_blank" rel="noopener">${item.cta||'Learn more'} →</a></div>
    </div>
  </article>`;
}

function setCta(cta, href, label){
  cta.href = href; cta.target = '_blank'; cta.rel = 'noopener'; cta.textContent = label;
}

function mountPlayer(mediaEl, src, title, allow){
  mediaEl.innerHTML = `<iframe src="${src}" title="${title}" allow="${allow}" allowfullscreen loading="lazy"></iframe>`;
}

function renderIntro(cfg, media){
  const intro = (media.series||[]).find(s => s.useIntroRecording) || media.series?.[0];
  const url = cfg.introRecordingUrl || '';
  const youTube = ytId(url), gdrive = driveId(url);
  const mediaEl = $('intro-media'), cta = $('intro-cta');
  if(intro){
    $('intro-title').textContent = intro.title;
    $('intro-desc').textContent = intro.description;
    $('intro-date').textContent = intro.date;
  }

  const showPoster = (loadFn, label) => {
    mediaEl.innerHTML = `<button type="button" class="placeholder js-load-intro" aria-label="${label}">
      <div><div class="badge" style="margin-bottom:12px">Recording</div><strong>${label}</strong><div style="margin-top:8px;opacity:.85;font-size:.92rem">Tap to play</div></div>
    </button>`;
    mediaEl.querySelector('.js-load-intro').addEventListener('click', loadFn, {once:true});
    setCta(cta, url || '#', 'Watch Recording');
    cta.addEventListener('click', (e) => {
      if(mediaEl.querySelector('iframe')) return;
      e.preventDefault();
      loadFn();
    }, {once:true});
  };

  if(youTube){
    showPoster(() => mountPlayer(mediaEl, `https://www.youtube.com/embed/${youTube}?autoplay=1`, 'Independence@Scale intro', IFRAME_ALLOW), 'Play intro recording');
  } else if(gdrive){
    showPoster(() => mountPlayer(mediaEl, `https://drive.google.com/file/d/${gdrive}/preview`, 'Independence@Scale intro', 'autoplay'), 'Play intro recording');
  } else if(url){
    mediaEl.innerHTML = `<a class="placeholder" href="${url}" target="_blank" rel="noopener"><div><div class="badge" style="margin-bottom:12px">Recording ready</div><strong>Open intro session recording</strong></div></a>`;
    setCta(cta, url, 'Open Recording');
  } else {
    mediaEl.innerHTML = `<div class="placeholder"><div><div class="badge" style="margin-bottom:12px">Intro session</div><strong>Paste the Google Drive link in site-config.js</strong><div style="margin-top:8px;opacity:.85;font-size:.92rem">Share the file as “Anyone with the link can view.”</div></div></div>`;
    setCta(cta, cfg.joinSeriesUrl || '#', 'Reserve on Eventbrite');
  }
}

function openVideoModal(item){
  const id = item.videoId || ytId(item.url);
  $('modal-badge').textContent = item.badge || 'Podcast';
  $('modal-title').textContent = item.title;
  $('modal-desc').textContent = item.description || '';
  $('modal-channel').textContent = `Channel: ${item.channel || 'DentTracks'}`;
  $('modal-youtube').href = item.url;
  $('modal-player').innerHTML = id
    ? `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" title="${item.title}" allow="${IFRAME_ALLOW}" allowfullscreen></iframe>`
    : '';
  setOverlay('video-modal', true);
}

function closeVideoModal(){
  setOverlay('video-modal', false);
  $('modal-player').innerHTML = '';
}

function openPosterModal(src){
  $('poster-image').src = src || FLYER;
  setOverlay('poster-modal', true);
}

function closePosterModal(){ setOverlay('poster-modal', false); }

function renderBlogPage(blogs, page){
  currentBlogs = blogs;
  const total = blogs.length;
  const pages = Math.max(1, Math.ceil(total / BLOGS_PER_PAGE));
  blogPage = Math.min(Math.max(1, page), pages);
  const slice = blogs.slice((blogPage-1)*BLOGS_PER_PAGE, blogPage*BLOGS_PER_PAGE);
  const pager = $('blogs-pager');
  $('blogs-grid').innerHTML = slice.length ? slice.map(cardBlog).join('') : empty('No articles match your search.');
  $('blogs-count').textContent = plural(total, 'Article', 'Articles');
  if(total <= BLOGS_PER_PAGE){ pager.hidden = true; pager.innerHTML = ''; return; }
  pager.hidden = false;
  let buttons = `<div class="blog-pager-meta">Page ${pad(blogPage)} of ${pad(pages)}</div>
    <button type="button" data-page="${blogPage-1}" ${blogPage===1?'disabled':''} aria-label="Previous page">←</button>`;
  for(let i=1;i<=pages;i++){
    const on = i===blogPage;
    buttons += `<button type="button" data-page="${i}" class="${on?'is-active':''}" aria-label="Page ${i}"${on?' aria-current="page"':''}>${pad(i)}</button>`;
  }
  buttons += `<button type="button" data-page="${blogPage+1}" ${blogPage===pages?'disabled':''} aria-label="Next page">→</button>`;
  pager.innerHTML = buttons;
}

function ensurePanel(name){
  const media = mediaCache, cfg = cfgCache;
  if(name === 'podcasts' && !rendered.podcasts){
    const pods = media.podcasts || [];
    $('podcasts-grid').innerHTML = pods.length ? pods.map(cardVideo).join('') : empty('No podcasts match your search.');
    $('podcasts-count').textContent = plural(pods.length, 'Episode', 'Episodes') + ' Available';
    rendered.podcasts = true;
  }
  if(name === 'blogs' && !rendered.blogs){
    renderBlogPage(media.blogs || [], blogPage);
    rendered.blogs = true;
  }
}

function renderLists(cfg, media){
  cfgCache = cfg; mediaCache = media;
  $('series-count').textContent = `${(media.series||[]).length} items`;
  $('series-grid').innerHTML = (media.series||[]).filter(s => !s.useIntroRecording).map(i => cardSeries(i, cfg)).join('');
  // Defer podcasts/blogs until those tabs open (cuts mobile main-thread + image work)
  $('podcasts-count').textContent = plural((media.podcasts||[]).length, 'Episode', 'Episodes') + ' Available';
  $('blogs-count').textContent = plural((media.blogs||[]).length, 'Article', 'Articles');
}

function setTab(name, {scroll=false} = {}){
  qs('.tab').forEach(t => {
    const on = t.dataset.tab === name;
    t.setAttribute('aria-selected', String(on));
    t.classList.toggle('is-active', on);
  });
  qs('.panel').forEach(p => p.classList.toggle('active', p.id === `panel-${name}`));
  qs('.nav-links a[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === name));
  $('status-line').textContent = LABELS[name] || '';
  history.replaceState(null, '', `#${name}`);
  ensurePanel(name);
  if(scroll){
    const top = $('media').getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const cfg = window.DENTTALKS_CONFIG || {};
  const media = window.DENTTALKS_MEDIA || {series:[],podcasts:[],blogs:[]};
  const bind = (sel, url) => { if(!url) return; qs(sel).forEach(a => { a.href=url; a.target='_blank'; a.rel='noopener'; }); };
  bind('.js-join', cfg.joinSeriesUrl);
  bind('.js-business', cfg.businessBriefingUrl);
  if(cfg.nextSessionTitle) $('next-session-title').textContent = cfg.nextSessionTitle;
  if(cfg.nextSessionDate) $('next-session-date').textContent = cfg.nextSessionDate;

  renderIntro(cfg, media);
  renderLists(cfg, media);

  document.addEventListener('click', (e) => {
    const videoBtn = e.target.closest('.js-open-video');
    if(videoBtn){
      try { openVideoModal(JSON.parse(decodeURIComponent(videoBtn.dataset.item))); } catch(_) {}
      return;
    }
    const poster = e.target.closest('.js-open-poster');
    if(poster){ e.preventDefault(); openPosterModal(poster.dataset.poster || poster.getAttribute('href')); return; }
    const pageBtn = e.target.closest('#blogs-pager button[data-page]');
    if(pageBtn){
      const next = Number(pageBtn.dataset.page);
      if(!next || next===blogPage) return;
      renderBlogPage(currentBlogs, next);
      const top = $('panel-blogs').getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      return;
    }
    if(e.target.id === 'modal-close' || e.target.id === 'video-modal') closeVideoModal();
    if(e.target.id === 'poster-close' || e.target.id === 'poster-modal') closePosterModal();
    const tab = e.target.closest('.tab[data-tab]');
    if(tab){ setTab(tab.dataset.tab, {scroll:true}); return; }
    const nav = e.target.closest('a[href="#series"],a[href="#podcasts"],a[href="#blogs"]');
    if(nav){ e.preventDefault(); setTab(nav.getAttribute('href').slice(1), {scroll:true}); }
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){ closeVideoModal(); closePosterModal(); }
  });

  const hash = (location.hash||'').replace('#','');
  setTab(['series','podcasts','blogs'].includes(hash) ? hash : 'series');
});
