// Mobile nav
function toggleNav() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}

function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
}

// Close nav on outside click
document.addEventListener('click', function(e) {
  const nav = document.querySelector('nav');
  if (!nav.contains(e.target)) closeNav();
});

// Smooth active nav state
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--gold)';
    }
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// Email notify handler
function handleNotify() {
  const input = document.getElementById('notifyEmail');
  const email = input.value.trim();

  if (!email || !email.includes('@')) {
    input.style.borderColor = 'rgba(200,80,80,0.6)';
    setTimeout(() => input.style.borderColor = '', 2000);
    return;
  }

  // TODO: Connect to your email service (Mailchimp, ConvertKit, etc.)
  // For now shows confirmation
  const btn = document.querySelector('.notify-btn');
  const orig = btn.textContent;
  btn.textContent = 'Locked In';
  btn.style.background = 'var(--gold-dim)';
  input.value = '';
  input.placeholder = 'You will be notified.';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    input.placeholder = 'your@email.com';
  }, 4000);
}

// Enter key on email input
document.getElementById('notifyEmail').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') handleNotify();
});
