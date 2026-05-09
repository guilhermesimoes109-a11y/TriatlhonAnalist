// ===== iTX Script =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  if (navbar && !navbar.classList.contains('scrolled')) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ===== REVEAL ON SCROLL =====
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      let current = Math.floor(eased * target);
      if (target >= 1000000) {
        el.textContent = (current / 1000000).toFixed(1) + 'M';
      } else if (target >= 1000) {
        el.textContent = current.toLocaleString('pt-PT');
      } else {
        el.textContent = current;
      }
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Observe counters
  const counterEls = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObserver.observe(el));

  // ===== HERO CANVAS PARTICLES =====
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ===== DASHBOARD CHARTS =====
  const sportData = {
    cycling: { zones: [18, 32, 25, 16, 9], hr: 148, power: 235, tss: 145, pace: '—', weekly: [65, 80, 45, 70, 90, 100, 40] },
    running: { zones: [12, 25, 30, 22, 11], hr: 162, power: '—', tss: 98, pace: '4:15', weekly: [50, 40, 70, 55, 60, 85, 30] },
    swimming: { zones: [20, 35, 28, 12, 5], hr: 138, power: '—', tss: 72, pace: '1:48', weekly: [40, 55, 0, 60, 45, 70, 0] }
  };

  function updateDashboard(sport) {
    const data = sportData[sport];
    if (!data) return;

    // Zones chart
    const zoneFills = document.querySelectorAll('.zone-fill');
    if (zoneFills.length === 5) {
      data.zones.forEach((pct, i) => {
        zoneFills[i].style.height = pct + '%';
        zoneFills[i].dataset.pct = pct + '%';
      });
    }

    // Metrics
    const hrEl = document.getElementById('metricHR');
    const powEl = document.getElementById('metricPower');
    const tssEl = document.getElementById('metricTSS');
    const paceEl = document.getElementById('metricPace');
    if (hrEl) animateCounter(hrEl, data.hr, 1000);
    if (powEl) {
      if (typeof data.power === 'number') animateCounter(powEl, data.power, 1000);
      else powEl.textContent = data.power;
    }
    if (tssEl) animateCounter(tssEl, data.tss, 1000);
    if (paceEl) paceEl.textContent = data.pace;

    // Weekly chart
    const weekBars = document.querySelectorAll('.week-bar');
    const maxWeek = Math.max(...data.weekly);
    weekBars.forEach((bar, i) => {
      const pct = maxWeek > 0 ? (data.weekly[i] / maxWeek) * 100 : 0;
      bar.style.height = pct + '%';
    });
  }

  // Sport tabs
  const sportTabs = document.querySelectorAll('.sport-tab');
  sportTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sportTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateDashboard(tab.dataset.sport);
    });
  });

  // Init dashboard on page load if present
  if (document.querySelector('.zones-chart')) {
    setTimeout(() => updateDashboard('cycling'), 500);
  }

  // Donut chart animation
  const donutSwim = document.getElementById('donutSwim');
  const donutBike = document.getElementById('donutBike');
  const donutRun = document.getElementById('donutRun');
  if (donutSwim && donutBike && donutRun) {
    const circ = 314;
    const donutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            donutSwim.style.strokeDashoffset = circ - (circ * 0.25);
            donutBike.style.strokeDashoffset = circ - (circ * 0.45);
            donutRun.style.strokeDashoffset = circ - (circ * 0.30);
          }, 300);
          donutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    donutObserver.observe(donutSwim.closest('.dash-card'));
  }


});
