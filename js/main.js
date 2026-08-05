/**
 * Aerospace Telemetry Portfolio - Main Engine Script
 * Handles: Intro Sequence, SYS.NAV Dropdown Menu, Lightbox Image Modal
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Header Intro Animation + Scroll-Hide + Mouse-Hover-Reveal
  const header = document.querySelector('.site-header');
  const heroOverlay = document.querySelector('.hero-overlay');
  let headerRevealed = false; // tracks whether intro animation has played
  let scrolledPastTop = false;

  // Initial intro reveal after 1 second
  setTimeout(() => {
    if (header) header.classList.add('visible');
    if (heroOverlay) heroOverlay.classList.add('visible');
    headerRevealed = true;
  }, 1000);

  // Scroll listener: hide header once user scrolls past 80px
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    if (!headerRevealed || !header) return;
    const currentY = window.scrollY;

    if (currentY > 80) {
      scrolledPastTop = true;
      header.classList.add('header-hidden');
    } else {
      scrolledPastTop = false;
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentY;
  }, { passive: true });

  // Mouse listener: reveal header when mouse enters top 60px zone
  document.addEventListener('mousemove', (e) => {
    if (!headerRevealed || !header) return;

    if (e.clientY <= 60) {
      header.classList.remove('header-hidden');
    } else if (scrolledPastTop) {
      header.classList.add('header-hidden');
    }
  });

  // 2. SYS.NAV Dropdown Toggle Logic
  const menuToggle = document.getElementById('menu-toggle');
  const dropdownMenu = document.getElementById('dropdown-menu');

  if (menuToggle && dropdownMenu) {
    const toggleMenu = (show) => {
      const isExpanded = show !== undefined ? show : dropdownMenu.classList.contains('hidden');
      if (isExpanded) {
        dropdownMenu.classList.remove('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
      } else {
        dropdownMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleMenu(false);
        closeLightbox();
      }
    });
  }

  // 3. Full-Image Lightbox Telemetry Modal
  const lightboxModal = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  const openLightbox = (src, caption) => {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightboxModal.classList.remove('hidden');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent page scroll while modal open
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Add click listeners to all photo cards with data-lightbox
  const photoCards = document.querySelectorAll('[data-lightbox]');
  photoCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-lightbox');
      const caption = card.getAttribute('data-caption');
      openLightbox(src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

});
