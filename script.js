// =====================
// =====================
// LOADING SCREEN
// =====================

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 800);
});

// =====================
// MUSIC CONTROL
// =====================

const music = document.getElementById("bgMusic");
music.volume = 1.0;
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", () => {
  if (musicPlaying === false) {
    music.play();

    musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';

    musicPlaying = true;
  } else {
    music.pause();

    musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';

    musicPlaying = false;
  }
});
// SCROLL REVEAL
// =====================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;

    const elementTop = section.getBoundingClientRect().top;

    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
// =====================
// ACTIVE NAVBAR
// =====================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;

    if (scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// MOBILE MENU

const menuBtn = document.querySelector(".menu-btn");

const navLinksBox = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinksBox.classList.toggle("show");

  menuBtn.innerHTML = navLinksBox.classList.contains("show")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

const mobileLinks = document.querySelectorAll(".nav-links a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksBox.classList.remove("show");

    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});