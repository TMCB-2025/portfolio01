// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('open');
});

// Close nav when link is clicked
document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
  });
});

// Active section tracking
const sections = ['about', 'education', 'skills', 'languages', 'contact'];
const navLinks = document.querySelectorAll('.site-nav a');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeId = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(sectionId => {
  const element = document.getElementById(sectionId);
  if (element) {
    observer.observe(element);
  }
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.progress-bar-fill');

const progressObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const target = entry.target.getAttribute('data-target');
      entry.target.style.width = target + '%';
      entry.target.classList.add('animated');
    }
  });
}, progressObserverOptions);

progressBars.forEach(bar => {
  progressObserver.observe(bar);
});

// Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitMessage = document.getElementById('submitMessage');
    submitMessage.style.display = 'block';
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 3 seconds
    setTimeout(() => {
      submitMessage.style.display = 'none';
    }, 3000);
  });
}

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
