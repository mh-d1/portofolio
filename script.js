/* =========================================================
   MH.dev — Portfolio Scripts
   Refactored: deduped selectors, fixed music-icon toggle,
   grouped by feature. Same functionality as before.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Loading screen ---------- */
  const loader = document.querySelector(".loader");

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 800);
  });

  /* ---------- Background music ---------- */
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  let musicPlaying = false;

  music.volume = 1.0;

  musicBtn.addEventListener("click", () => {
    musicPlaying = !musicPlaying;

    if (musicPlaying) {
      music.play();
    } else {
      music.pause();
    }

    musicBtn.innerHTML = musicPlaying
      ? '<i class="fa-solid fa-volume-high"></i>'
      : '<i class="fa-solid fa-volume-xmark"></i>';

    musicBtn.setAttribute("aria-pressed", String(musicPlaying));
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  const REVEAL_OFFSET = 120;

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((section) => {
      const elementTop = section.getBoundingClientRect().top;
      if (elementTop < windowHeight - REVEAL_OFFSET) {
        section.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* ---------- Active navbar link ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const NAV_OFFSET = 200;

  function highlightActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - NAV_OFFSET;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", highlightActiveLink);
  highlightActiveLink();

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector(".menu-btn");
  const navLinksBox = document.querySelector(".nav-links");

  function closeMenu() {
    navLinksBox.classList.remove("show");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", () => {
    const isOpen = navLinksBox.classList.toggle("show");
    menuBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

});
