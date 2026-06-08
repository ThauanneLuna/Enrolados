// ─── BARRA DE PROGRESSO ───
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}, { passive: true });


// ─── CURSOR ───
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;
let particleTimer = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;

  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';

  particleTimer++;
  if (particleTimer % 4 === 0) {
    const p = document.createElement('div');
    p.className = 'cursor-particle';
    p.style.left = mx + 'px';
    p.style.top = my + 'px';
    p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
    p.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
    p.style.background = Math.random() > 0.5 ? '#F0C97A' : '#C5B0E0';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
});

// Efeito hover no cursor
document.querySelectorAll('a, button, .book-chapter, .map-location, .char-card, .symbol-card, .track-list li, .easter-egg').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
    cursorRing.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
    cursorRing.classList.remove('cursor-hover');
  });
});

function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();


// ─── NAV: SCROLL + HAMBURGER ───
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobileMenu');

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});


// ─── SPLASH ───
setTimeout(() => {
  const splash = document.getElementById('splash');
  splash.classList.add('hidden');
}, 4500);

// Partículas da splash
const splashParticles = document.getElementById('splashParticles');
for (let i = 0; i < 60; i++) {
  const sp = document.createElement('div');
  sp.className = 'sp';
  sp.style.left = Math.random() * 100 + '%';
  sp.style.bottom = Math.random() * 30 + '%';
  sp.style.animationDuration = (Math.random() * 4 + 3) + 's';
  sp.style.animationDelay = (Math.random() * 3) + 's';
  sp.style.width = sp.style.height = (Math.random() * 3 + 1) + 'px';
  sp.style.opacity = Math.random() * 0.8;
  splashParticles.appendChild(sp);
}


// ─── ESTRELAS ───
const starsCanvas = document.getElementById('stars-canvas');
const sCtx = starsCanvas.getContext('2d');
let stars = [];

function resizeStars() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height * 0.7,
      r: Math.random() * 1.5 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.01 + 0.003,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function drawStars(t) {
  sCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach(s => {
    const alpha = (Math.sin(t * s.speed + s.phase) * 0.4 + 0.6) * s.a;
    sCtx.beginPath();
    sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sCtx.fillStyle = `rgba(255,248,220,${alpha})`;
    sCtx.fill();
  });
}

resizeStars();
window.addEventListener('resize', resizeStars, { passive: true });


// ─── LANTERNAS AMBIENTES ───
const lanternContainer = document.getElementById('lanterns-container');

function makeLanternSVG(size, color) {
  return `<svg width="${size}" height="${size*1.3}" viewBox="0 0 40 54" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="0" x2="20" y2="7" stroke="${color}" stroke-width="1.5" opacity="0.8"/>
    <rect x="12" y="7" width="16" height="3" rx="1.5" fill="${color}" opacity="0.7"/>
    <path d="M8 10 L32 10 L35 44 L5 44 Z" fill="${color}" opacity="0.25"/>
    <path d="M8 10 L32 10 L35 44 L5 44 Z" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.5"/>
    <rect x="5" y="44" width="30" height="3" rx="1.5" fill="${color}" opacity="0.6"/>
    <ellipse cx="20" cy="27" rx="6" ry="8" fill="white" opacity="0.3"/>
    <filter id="gf"><feGaussianBlur stdDeviation="3"/></filter>
    <ellipse cx="20" cy="27" rx="8" ry="10" fill="${color}" opacity="0.15" filter="url(#gf)"/>
  </svg>`;
}

function spawnLantern() {
  const l = document.createElement('div');
  l.className = 'ambient-lantern';
  const size = Math.random() * 20 + 16;
  const colors = ['#F0C97A','#D4A855','#FFF0C0','#C5B0E0'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  l.innerHTML = makeLanternSVG(size, color);
  l.style.left = Math.random() * 95 + '%';
  l.style.animationDuration = (Math.random() * 20 + 18) + 's';
  l.style.animationDelay = (Math.random() * 5) + 's';
  l.style.filter = `blur(${Math.random() * 0.8}px)`;
  lanternContainer.appendChild(l);
  setTimeout(() => l.remove(), 40000);
}

for (let i = 0; i < 12; i++) {
  setTimeout(() => spawnLantern(), i * 2000);
}
setInterval(spawnLantern, 3500);


// ─── PARTÍCULAS ───
const particlesContainer = document.getElementById('particles-container');

function spawnParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 3 + 1;
  p.style.width = p.style.height = size + 'px';
  p.style.left = Math.random() * 100 + '%';
  p.style.bottom = '0';
  p.style.animationDuration = (Math.random() * 8 + 6) + 's';
  p.style.animationDelay = (Math.random() * 2) + 's';
  p.style.background = Math.random() > 0.6 ? '#F0C97A' : 'rgba(197,176,224,0.8)';
  p.style.boxShadow = `0 0 ${size*3}px ${size}px rgba(212,168,85,0.4)`;
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), 16000);
}

for (let i = 0; i < 30; i++) spawnParticle();
setInterval(spawnParticle, 800);


// ─── LOOP PRINCIPAL ───
let t = 0;
function loop() {
  t += 0.5;
  drawStars(t);
  requestAnimationFrame(loop);
}
loop();


// ─── MODO DIA/NOITE ───
let isDark = true;

function toggleMode() {
  isDark = !isDark;
  document.body.classList.toggle('day-mode', !isDark);
  const btn = document.getElementById('mode-toggle');
  btn.textContent = isDark ? '🌙 Noite' : '☀️ Dia';
  if (isDark) {
    document.getElementById('stars-canvas').style.opacity = '0.6';
    document.getElementById('lanterns-container').style.opacity = '1';
  } else {
    document.getElementById('stars-canvas').style.opacity = '0';
    document.getElementById('lanterns-container').style.opacity = '0.3';
  }
}


// ─── REVELAR AO ROLAR ───
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealEls.forEach(el => observer.observe(el));


// ─── NAVEGAÇÃO DO LIVRO ───
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  closeMobileMenu();
}


// ─── SELEÇÃO DE FAIXA ───
function selectTrack(el) {
  document.querySelectorAll('.track-list li').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
}


// ─── CONTADOR DE LANTERNAS ───
let lanternCount = 0;

function updateCounter() {
  const numEl = document.getElementById('lanternCountNum');
  if (!numEl) return;
  lanternCount++;
  numEl.textContent = lanternCount;
  numEl.classList.remove('bump');
  void numEl.offsetWidth; // reflow
  numEl.classList.add('bump');
}


// ─── CONTADOR DE CARACTERES ───
function setupCharCount(textareaId, countId, max) {
  const ta = document.getElementById(textareaId);
  const ct = document.getElementById(countId);
  if (!ta || !ct) return;
  ta.addEventListener('input', () => {
    const len = ta.value.length;
    ct.textContent = `${len} / ${max}`;
    ct.className = 'char-count';
    if (len >= max) ct.classList.add('at-limit');
    else if (len >= max * 0.8) ct.classList.add('near-limit');
  });
}

setupCharCount('lanternMessage', 'msgCharCount', 140);


// ─── MENSAGENS DAS LANTERNAS ───
const messageSky = document.getElementById('messageSky');

function releaseLantern() {
  const name = document.getElementById('lanternName').value.trim() || 'Um sonhador';
  const message = document.getElementById('lanternMessage').value.trim();
  if (!message) {
    // Shake sutil no campo
    const ta = document.getElementById('lanternMessage');
    ta.style.transition = 'box-shadow 0.1s';
    ta.style.boxShadow = '0 0 0 2px rgba(200,80,80,0.5)';
    setTimeout(() => { ta.style.boxShadow = ''; }, 800);
    return;
  }

  const lw = document.createElement('div');
  lw.className = 'msg-lantern';
  const startX = Math.random() * 80 + 10;
  const size = Math.random() * 24 + 20;
  const colors = ['#F0C97A','#D4A855','#FFF0C0'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const duration = Math.random() * 15 + 18;

  lw.style.left = startX + '%';
  lw.style.bottom = '5%';
  lw.style.animationDuration = duration + 's';
  lw.style.animationDelay = '0s';

  lw.innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
      ${makeLanternSVG(size, color)}
      <div style="
        background: linear-gradient(135deg, rgba(26,18,48,0.9), rgba(13,10,26,0.95));
        border: 1px solid rgba(212,168,85,0.3);
        border-radius: 8px;
        padding: 8px 12px;
        max-width: 160px;
        font-family: 'Cormorant Garamond', serif;
        font-style: italic;
        font-size: 0.72rem;
        color: #F5EDD8;
        text-align: center;
        line-height: 1.4;
        box-shadow: 0 0 20px rgba(212,168,85,0.2);
      ">
        <span style="display:block; font-size:0.65rem; color:#C5B0E0; letter-spacing:0.1em; margin-bottom:3px;">
          ${name}
        </span>
        ${message.substring(0,80)}${message.length > 80 ? '…' : ''}
      </div>
    </div>`;

  messageSky.appendChild(lw);

  document.getElementById('lanternName').value = '';
  document.getElementById('lanternMessage').value = '';
  // Resetar contador de chars
  const ct = document.getElementById('msgCharCount');
  if (ct) { ct.textContent = '0 / 140'; ct.className = 'char-count'; }

  updateCounter();

  setTimeout(() => lw.remove(), (duration + 2) * 1000);
}


// Exemplos automáticos
const exampleMessages = [
  { name: 'Sonhador de Corona', msg: 'Ver as lanternas pelo menos uma vez.' },
  { name: 'Anônimo', msg: 'Encontrar o lugar ao qual realmente pertenço.' },
  { name: 'Um viajante', msg: 'Eu tenho um sonho — e ele é bom.' },
];

setTimeout(() => {
  exampleMessages.forEach((m, i) => {
    setTimeout(() => {
      document.getElementById('lanternName').value = m.name;
      document.getElementById('lanternMessage').value = m.msg;
      releaseLantern();
    }, i * 2500);
  });
}, 5000);


// ─── EASTER EGGS ───
const foundEggs = new Set();

function easterEggFound(id) {
  if (foundEggs.has(id)) return;
  foundEggs.add(id);

  const messages = {
    pascal: '🦎 Pascal estava escondido o tempo todo! +1 amigo camaleão fiel',
    sun: '☀️ Você encontrou o símbolo do sol de Corona! A verdade sempre esteve visível.',
    tome: '📖 O capítulo dos Segredos Ocultos... algumas verdades devem ser descobertas lentamente.',
    'floating-lantern': '🏮 Você tocou uma lanterna viva! O reino celebra sua coragem.',
    footer: '✨ Até o rodapé carrega um segredo. Bem-vindo ao fim do mapa.',
  };

  const toast = document.getElementById('egg-toast');
  toast.textContent = messages[id] || '✦ Segredo descoberto!';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 3500);

  if (id === 'pascal') {
    document.getElementById('pascal-egg').style.opacity = '0.6';
  }
}

// Easter egg: lanterna flutuante clicável
setTimeout(() => {
  setInterval(() => {
    const lanterns = document.querySelectorAll('.ambient-lantern');
    if (lanterns.length > 0) {
      const random = lanterns[Math.floor(Math.random() * lanterns.length)];
      random.style.pointerEvents = 'all';
      random.style.cursor = 'none';
      random.addEventListener('click', () => easterEggFound('floating-lantern'), { once: true });
    }
  }, 8000);
}, 10000);


// ─── PARALLAX ───
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  const castle = document.querySelector('.hero-castle');
  if (castle) {
    castle.style.transform = `translateX(-50%) translateY(${scroll * 0.15}px)`;
  }
}, { passive: true });


// ─── RESPONSIVIDADE MOBILE ───
const isMobile = window.innerWidth <= 768;

if (isMobile) {
  if (cursor) cursor.style.display = 'none';
  if (cursorRing) cursorRing.style.display = 'none';
  document.body.classList.add('mobile-mode');
  document.body.style.cursor = 'auto';
}

function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVH();
window.addEventListener('resize', setVH, { passive: true });

// Reduzir partículas no mobile
if (isMobile) {
  document.querySelectorAll('.particle').forEach((p, i) => {
    if (i > 10) p.remove();
  });
}
