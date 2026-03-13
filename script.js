// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a,button,.contact-link,.project-card,.skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '6px'; cursor.style.height = '6px';
    ring.style.width = '52px'; ring.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    ring.style.width = '36px'; ring.style.height = '36px';
  });
});

// SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
});

// CANVAS PARTICLE BACKGROUND
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const dots = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  r: Math.random() * 2 + 0.5
}));

let mouse = { x: -1000, y: -1000 };
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach(d => {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,212,255,0.5)';
    ctx.fill();
  });
  dots.forEach((a, i) => {
    dots.slice(i + 1).forEach(b => {
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
    const dx = a.x - mouse.x, dy = a.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = `rgba(0,212,255,${0.2 * (1 - dist / 150)})`;
      ctx.lineWidth = 0.7; ctx.stroke();
    }
  });
  requestAnimationFrame(drawCanvas);
}
drawCanvas();

// TYPING ANIMATION
const phrases = [
  'Data Engineer',
  'ML Practitioner',
  'Analytics Developer',
  'Cyber Security Enthusiast',
  'Problem Solver',
  'Power BI Developer',
  'Python Programmer',
  'AI Explorer',
  'Tech Enthusiast',
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const word = phrases[pi];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci === word.length + 1) { deleting = true; setTimeout(type, 1400); return; }
  if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; setTimeout(type, 400); return; }
  setTimeout(type, deleting ? 60 : 90);
}
type();

// SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .timeline-item').forEach(el => obs.observe(el));

// SKILL FILTER
document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(c => {
      c.style.display = (f === 'all' || c.dataset.cat === f) ? 'block' : 'none';
    });
  });
});

// PROJECT FILTER
document.querySelectorAll('.filter-btn[data-pfilter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-pfilter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.pfilter;
    document.querySelectorAll('.project-card').forEach(c => {
      c.style.display = (f === 'all' || (c.dataset.pcat || '').includes(f)) ? 'flex' : 'none';
    });
  });
});

// THEME TOGGLE
document.getElementById('themeToggle').addEventListener('click', function () {
  document.body.classList.toggle('light');
  this.textContent = document.body.classList.contains('light') ? '🌙' : '☀';
});

// HAMBURGER MENU
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('open');
});
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
}

// CONTACT FORM SUBMIT
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Message sent! I'll get back to you soon.");
  this.reset();
});

// DOWNLOAD RESUME
document.getElementById('downloadResume').addEventListener('click', () => {
  const content = `KAVEANANTH V
Data Engineer | ML Practitioner | Analytics Developer

CONTACT
Email: vkaveananth16@gmail.com
Phone: +91 7904502597
LinkedIn: linkedin.com/in/kaveananth-v-03b21a255
GitHub: github.com/Codekaveananth

EDUCATION
B.E. Computer Science & Engineering
Sathyabama Institute of Science and Technology
2023 – Present | Semester 5

SKILLS
• Data & Analytics: Python, SQL, EDA, KPI, ETL/ELT, Power BI, Tableau
• Machine Learning: Regression, Classification, NLP, TF-IDF, scikit-learn
• Big Data: PySpark, Spark SQL, Databricks
• Cloud: AWS, GCP, Azure, IBM Watsonx
• Cybersecurity: Wireshark, Nmap, SOC Monitoring
• Languages: Python, Java, C, C++, OOP, Git

EXPERIENCE
ML/Data Engineering Intern — IBM & ExcelR (2024)
• Designed ETL pipelines reducing manual effort by 30%
• Processed 5,000+ records using Python and SQL
• Built ML models with scikit-learn
• Created Power BI/Tableau dashboards

Cybersecurity Intern — Cisco (2024)
• Network traffic analysis with Wireshark
• Vulnerability assessment with Nmap
• SOC monitoring and incident documentation

PROJECTS
1. Analytics Data Pipeline — PySpark, Spark SQL, Databricks
2. Library AI Agent — NLP, IBM Watsonx
3. HR Analytics Dashboard — Power BI, SQL
4. Sentiment Analysis Engine — TF-IDF, Logistic Regression (82% accuracy)
5. Network Defense & Vuln Assessment — Wireshark, Nmap

CERTIFICATIONS
• ExcelR Data Analytics
• Cisco Defending the Network
• OOPs in Python
• MATLAB Onramp
• Nasscom Digital 101
• Google Cybersecurity (In Progress)
• NPTEL Machine Learning (In Progress)
• NPTEL Java Programming (In Progress)`;
  const a = document.createElement('a');
  a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
  a.download = 'Kaveananth_V_Resume.txt';
  a.click();
});
