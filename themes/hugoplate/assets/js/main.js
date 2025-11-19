// main script
(function () {
  "use strict";

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.closest('.nav-item').classList.toggle("active");
    });
  });

  // Testimonial Slider
  // ----------------------------------------
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  // How It Works: step toggling
  // ----------------------------------------
  const hiwSectionRoot = document.getElementById('how-it-works');
  const hiwStepsCol = hiwSectionRoot ? hiwSectionRoot.querySelector('[data-hiw]') : null;
  if (hiwSectionRoot && hiwStepsCol) {
    const stepButtons = hiwStepsCol.querySelectorAll('.hiw-step');
    const images = hiwSectionRoot.querySelectorAll('.hiw-image');

    const activate = (idx) => {
      stepButtons.forEach((btn, i) => {
        if (i === idx) {
          btn.classList.add('hiw-active');
          btn.classList.remove('opacity-60');
        } else {
          btn.classList.remove('hiw-active');
          btn.classList.add('opacity-60');
        }
      });
      images.forEach((img, i) => {
        if (i === idx) img.classList.remove('hidden');
        else img.classList.add('hidden');
      });
    };

    stepButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-step') || '0', 10) || 0;
        activate(idx);
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(btn.getAttribute('data-step') || '0', 10) || 0;
          activate(idx);
        }
      });
    });
  }
})();
