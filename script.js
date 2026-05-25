document.getElementById('footer-year').textContent = new Date().getFullYear();

AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 80 });

new Typed('#typed-el', {
  strings: [
    'Quality Analyst',
    'Data Science Graduate',
    'Detail-Oriented Professional'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1800,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function randBetween(a, b) { return a + Math.random() * (b - a); }

function spawnParticles() {
  particles = [];
  const count = Math.floor(W / 14);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: randBetween(0.5, 2),
      dx: randBetween(-0.18, 0.18),
      dy: randBetween(-0.1, 0.1),
      alpha: randBetween(0.15, 0.55)
    });
  }
}
spawnParticles();
window.addEventListener('resize', spawnParticles);

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59,130,246,${p.alpha})`;
    ctx.fill();
  }
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(37,99,235,${0.12 * (1 - dist / 90)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('solid', window.scrollY > 40);

  let active = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) active = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + active);
  });
});

const barItems = document.querySelectorAll('.bar-item');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const item = entry.target;
    const val = parseInt(item.dataset.val, 10);
    const fill = item.querySelector('.bar-fill');
    const pct = item.querySelector('.bar-pct');
    fill.style.width = val + '%';
    let count = 0;
    const step = val / 70;
    const timer = setInterval(() => {
      count = Math.min(count + step, val);
      pct.textContent = Math.round(count) + '%';
      if (count >= val) clearInterval(timer);
    }, 16);
    barObserver.unobserve(item);
  });
}, { threshold: 0.25 });

barItems.forEach(b => barObserver.observe(b));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

const hirModal = document.getElementById('hire-modal');
const overlay  = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('modal-close');
const toast    = document.getElementById('copy-toast');

function openModal() {
  hirModal.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  hirModal.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelector('.nav-cta').addEventListener('click', e => {
  e.preventDefault();
  openModal();
});
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('copy-email-btn').addEventListener('click', () => {
  navigator.clipboard.writeText('nehakarne4@gmail.com').then(() => {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  });
});