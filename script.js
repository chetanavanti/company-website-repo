// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => navMenu.classList.toggle("open"));
navMenu.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navMenu.classList.remove("open"))
);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Animated counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + "+";
    }, 25);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

// Lightbox gallery
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    lbImg.src = img.src.replace("/600/400", "/1200/800");
    lightbox.classList.add("show");
  });
});
lightbox.addEventListener("click", (e) => {
  if (e.target !== lbImg) lightbox.classList.remove("show");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("show");
});

// Contact form validation
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    formMsg.textContent = "Please fill in your name, a valid email and a message.";
    formMsg.className = "form-msg error";
    return;
  }
  // Demo only: connect to a backend / Formspree / EmailJS to actually send.
  formMsg.textContent = "Thank you! Your message has been sent.";
  formMsg.className = "form-msg success";
  form.reset();
});