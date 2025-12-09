// Select elements
const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");


window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


menuBtn.addEventListener("click", () => {
  const isShown = mobileMenu.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", isShown ? "true" : "false");
});


mobileMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileMenu.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Optional: close mobile menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    mobileMenu.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});
