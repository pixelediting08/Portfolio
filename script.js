/* =============================================================
   FrameCraft — Video Editor Portfolio
   script.js  |  All interactivity
   Link this at the bottom of index.html:  <script src="script.js"></script>
============================================================= */

/* ---- 1. Navbar: add glass background on scroll ---- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- 2. Mobile hamburger menu toggle ---- */
document.getElementById('hamburger').addEventListener('click', function () {
  this.classList.toggle('open');
  document.getElementById('mobile-menu').classList.toggle('open');
  // Prevent background scroll when menu is open
  document.body.style.overflow = this.classList.contains('open') ? 'hidden' : '';
});

function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- 3. Build ticker belt dynamically ---- */
(function () {
  const tags = [
    'Reels Editing', 'YouTube Videos', 'Podcast Editing', 'Color Grading',
    'Motion Graphics', 'Short-Form Content', 'Brand Videos', 'Audio Cleanup',
    'Long-Form Edits', 'Storytelling', 'Fast Turnaround', 'Creative Cuts'
  ];
  const inner = document.getElementById('ticker');
  let html = '';
  // Duplicate items twice so the loop is seamless
  for (let i = 0; i < 2; i++) {
    tags.forEach(t => {
      html += `<span class="ticker-item"><span class="ticker-dot">✦</span>${t}</span>`;
    });
  }
  inner.innerHTML = html;
})();

/* ---- 4. Scroll reveal (fade-up) for all .reveal elements ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- 5. Animated counters for the stats bar ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const dur    = 1500; // ms
  const start  = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / dur, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target._counted) {
        e.target._counted = true; // run only once
        animateCounter(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* ---- 6. Portfolio filter tabs ---- */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    // Update active tab styling
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const filter = this.dataset.filter;
    // Show / hide portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const show = filter === 'all' || item.dataset.type === filter;
      item.style.display = show ? '' : 'none';
    });
  });
});

/* ---- 7. Portfolio item hover effects ---- */
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});


/* ---- 7. Contact form submit feedback ---- */
function handleFormSubmit(e) {
  e.preventDefault();

  const contactData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    projectType: document.getElementById("projectType").value,
    aboutProject: document.getElementById("message").value
  };

  fetch("https://script.google.com/macros/s/AKfycbzab22ujje8m_5iSLqWz3B2tx1Kk0oZbv-tqG8DrqDINmhaRln6nYbGby5-nLRADNY2Jg/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactData)
  })
  .then(response => {
    console.log("contactData", contactData);
    
  });

  const success = document.getElementById('form-success');
  success.classList.add('show');
  e.target.reset();
  // Auto-hide success message after 5 s
  setTimeout(() => success.classList.remove('show'), 5000);
}

/* ---- 8. Highlight active nav link while scrolling ---- */
const navLinks  = document.querySelectorAll('.nav-links a');
const linkMap   = {};
navLinks.forEach(a => { linkMap[a.getAttribute('href').slice(1)] = a; });

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => (a.style.color = ''));
        const link = linkMap[e.target.id];
        if (link) link.style.color = 'var(--amber)';
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
