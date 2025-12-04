// Mobile nav toggle
const nav = document.getElementById("nav");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.add("nav-open");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    nav.classList.remove("nav-open");
  });
}

if (nav) {
  nav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("nav-open"));
  });
}

// Dynamic year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Hero on-load animation
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});

// ===== Scroll-based animations (Timeline + Skills + Cards + Contact) =====
const timelineItems = document.querySelectorAll(".timeline-item");
const skillFills = document.querySelectorAll(".skill-fill");
const skillsGrid = document.querySelector(".skills-grid");
const revealBlocks = document.querySelectorAll(".reveal-on-scroll");

// Add staggered delay to timeline items
timelineItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.12}s`;
});

const observerOptions = {
  threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const target = entry.target;

    // Timeline animation
    if (target.classList.contains("timeline-item")) {
      target.classList.add("in-view");
      observer.unobserve(target);
    }

    // Skills bar animation
    if (target.classList.contains("skills-grid")) {
      skillFills.forEach((bar) => {
        bar.classList.add("skill-fill-animate");
      });
      observer.unobserve(target);
    }

    // Generic reveal blocks (cards, about, contact, etc.)
    if (target.classList.contains("reveal-on-scroll")) {
      // Optional per-element delay using data-delay
      const delay = target.getAttribute("data-delay");
      if (delay) {
        target.style.transitionDelay = `${delay}s`;
      }
      target.classList.add("reveal-in");
      observer.unobserve(target);
    }
  });
}, observerOptions);

// Observe each timeline item
timelineItems.forEach(item => observer.observe(item));

// Observe the skills grid container (to trigger all bars)
if (skillsGrid) {
  observer.observe(skillsGrid);
}

// Observe all generic reveal blocks
revealBlocks.forEach(block => observer.observe(block));
