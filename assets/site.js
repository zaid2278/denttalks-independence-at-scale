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

function setCta(cta, href, label, {external=true}={}){
  cta.href = href || '#series';
  cta.textContent = label;
  if(external){
    cta.target = '_blank';
    cta.rel = 'noopener';
  } else {
    cta.removeAttribute('target');
    cta.removeAttribute('rel');
  }
}

const drivePreviewUrl = (id) => `https://drive.google.com/file/d/${id}/preview`;
const needsExpandedPlayer = () => window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;

function posterHTML(badge, title, hint){
  return `<div class="player-poster">
    <div class="player-poster-copy">
      <div class="badge">${badge}</div>
      <strong>${title}</strong>
      <span>${hint}</span>
    </div>
    <span class="player-play" aria-hidden="true">▶</span>
  </div>`;
}

function iframeMarkup(src, title){
  return `<iframe
    src="${src}"
    title="${title}"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
    allowfullscreen
    webkitallowfullscreen
    mozallowfullscreen
    referrerpolicy="strict-origin-when-cross-origin"
    loading="eager"></iframe>`;
}

function openPagePlayer(src, title){
  const frame = $('page-player-frame');
  if(!frame) return;
  frame.innerHTML = iframeMarkup(src, title);
  setOverlay('page-player', true);
}

function closePagePlayer(){
  const frame = $('page-player-frame');
  if(frame) frame.innerHTML = '';
  setOverlay('page-player', false);
}

function mountIframe(mediaEl, src, title){
  mediaEl.classList.add('is-playing');
  if(needsExpandedPlayer()){
    mediaEl.innerHTML = `<button type="button" class="placeholder js-load-intro" aria-label="Return to player">${posterHTML('Now playing', 'Intro recording', 'Tap to return to full-screen player')}</button>`;
    openPagePlayer(src, title);
    return;
  }
  mediaEl.innerHTML = iframeMarkup(src, title);
}

function mountHtml5(mediaEl, src, poster){
  mediaEl.classList.add('is-playing');
  mediaEl.innerHTML = `<video class="intro-video" controls playsinline webkit-playsinline preload="metadata" poster="${poster||FLYER}">
    <source src="${src}" type="video/mp4" />
  </video>`;
  const video = mediaEl.querySelector('video');
  const playPromise = video.play();
  if(playPromise && playPromise.catch) playPromise.catch(() => {});
  return video;
}

function bindIntroPlay(mediaEl, cta, playFn, label){
  let started = false;
  let lastSrc = '';
  const run = () => {
    if(started){
      if(needsExpandedPlayer() && lastSrc) openPagePlayer(lastSrc, 'Independence@Scale intro');
      else mediaEl.scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
    started = true;
    playFn((src) => { lastSrc = src || ''; });
  };
  mediaEl.innerHTML = `<button type="button" class="placeholder js-load-intro" aria-label="${label}">${posterHTML('Recording', label, 'Tap to play on this page')}</button>`;
  mediaEl.querySelector('.js-load-intro').addEventListener('click', run);
  setCta(cta, '#series', 'Watch Recording', {external:false});
  cta.onclick = (e) => {
    e.preventDefault();
    run();
  };
}

function renderIntro(cfg, media){
  const intro = (media.series||[]).find(s => s.useIntroRecording) || media.series?.[0];
  const url = cfg.introRecordingUrl || '';
  const mp4 = cfg.introRecordingMp4Url || '';
  const youTube = ytId(url) || ytId(cfg.introRecordingYoutubeUrl || '');
  const gdrive = driveId(url);
  const mediaEl = $('intro-media'), cta = $('intro-cta');
  if(intro){
    $('intro-title').textContent = intro.title;
    $('intro-desc').textContent = intro.description;
    $('intro-date').textContent = intro.date;
    if($('intro-duration') && intro.duration) $('intro-duration').textContent = intro.duration;
  }

  // Prefer direct MP4 (best mobile in-page), then YouTube, then Drive embed — all stay on this page
  if(mp4){
    bindIntroPlay(mediaEl, cta, () => mountHtml5(mediaEl, mp4, FLYER), 'Play intro recording');
  } else if(youTube){
    const embed = `https://www.youtube.com/embed/${youTube}?autoplay=1&playsinline=1&rel=0`;
    bindIntroPlay(mediaEl, cta, (remember) => {
      remember(embed);
      mountIframe(mediaEl, embed, 'Independence@Scale intro');
    }, 'Play intro recording');
  } else if(gdrive){
    const embed = drivePreviewUrl(gdrive);
    bindIntroPlay(mediaEl, cta, (remember) => {
      remember(embed);
      mountIframe(mediaEl, embed, 'Independence@Scale intro');
    }, 'Play intro recording');
  } else if(url){
    mediaEl.innerHTML = `<a class="placeholder player-link" href="${url}" target="_blank" rel="noopener">${posterHTML('Recording ready', 'Open intro session recording', 'Opens recording')}</a>`;
    setCta(cta, url, 'Open Recording');
  } else {
    mediaEl.innerHTML = `<div class="placeholder">${posterHTML('Intro session', 'Add introRecordingUrl in site-config.js', 'Share Drive file as Anyone with the link')}</div>`;
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
    if(e.target.id === 'page-player-close') closePagePlayer();
    const tab = e.target.closest('.tab[data-tab]');
    if(tab){ setTab(tab.dataset.tab, {scroll:true}); return; }
    const nav = e.target.closest('a[href="#series"],a[href="#podcasts"],a[href="#blogs"]');
    if(nav){ e.preventDefault(); setTab(nav.getAttribute('href').slice(1), {scroll:true}); }
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){ closeVideoModal(); closePosterModal(); closePagePlayer(); }
  });

  const hash = (location.hash||'').replace('#','');
  setTab(['series','podcasts','blogs'].includes(hash) ? hash : 'series');
});
