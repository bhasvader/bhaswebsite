

document.addEventListener('DOMContentLoaded', () => {
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
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
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
  const header = document.querySelector('.site-header');
  const heroOverlay = document.querySelector('.hero-overlay');
  let headerRevealed = false;
  let scrolledPastTop = false;

  setTimeout(() => {
    if (header) header.classList.add('visible');
    if (heroOverlay) heroOverlay.classList.add('visible');
    headerRevealed = true;
  }, 1000);

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
  }, { passive: true });

  document.addEventListener('mousemove', (e) => {
    if (!headerRevealed || !header) return;

    if (e.clientY <= 60) {
      header.classList.remove('header-hidden');
    } else if (scrolledPastTop) {
      header.classList.add('header-hidden');
    }
  });
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

    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleMenu(false);
        closeLightbox();
        closeProjectModal();
      }
    });
  }
  const projectModal = document.getElementById('project-detail-modal');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');
  const projectModalBackdrop = document.getElementById('project-modal-backdrop');

  const projectData = {
    'project-1': {
      title: 'Dartmouth Student Rocketry Team',
      tag: 'DARTMOUTH STUDENT ROCKETRY',
      status: 'HANOVER, NH',
      specs: [
        '[ DSTAR-1 LAUNCH VEHICLE ]',
        'Apogee: 5,881 feet',
        'Airframe: Fiberglass airframe with aluminium tip and custom carbon fiber fins',
        'Propulsion: K class rocket motor (Cessaroni Technologies)',
        'Recovery: Dual deploy parachute system',
        'Avionics: EasyMini flight computer',
        'Dimensions: Length 91 inches, Diameter 4 inches',
        '[ BEE POSITIVE LAUNCH VEHICLE ]',
        'Apogee: ~2,500 feet',
        'Airframe: Cardboard airframe',
        'Propulsion: H class motor',
        'Recovery: Ejection charge based parachute deployment',
        'Milestone: Level 1 (L1) High-Power Rocketry certification flight'
      ],
      description: 'Engineering team member at Dartmouth Student Rocketry in Hanover, NH — contributing to high-powered rocketry systems, composite manufacturing, and flight operations. Highlights include DSTAR-1 (launched to a 5,881 ft apogee with custom carbon fiber fins) and Level 1 (L1) High-Power certification launch "Bee Positive".',
      media: [
        { type: 'image', src: '/images/projects/project1/merocket1.webp', caption: 'Me with DSTAR-1' },
        { type: 'image', src: '/images/projects/project1/launch.webp', caption: 'DSTAR-1 Launch' },
        { type: 'image', src: '/images/projects/project1/rocketcarry1.webp', caption: 'Carrying DSTAR-1 to Launch Pad' },
        { type: 'image', src: '/images/projects/project1/cflayup.webp', caption: 'Carbon Fiber Fin Layup Process' },
        { type: 'image', src: '/images/projects/project1/finscut.webp', caption: 'Cut Carbon Fiber Fins' },
        { type: 'image', src: '/images/projects/project1/finepoxy1.webp', caption: 'Fin Epoxy Process 1' },
        { type: 'image', src: '/images/projects/project1/finepoxy2.webp', caption: 'Fin Epoxy Process 2' },
        { type: 'image', src: '/images/projects/project1/fiberglassparts.webp', caption: 'Fiberglass Airframe Parts' },
        { type: 'image', src: '/images/projects/project1/variousparts.webp', caption: 'All components of the rocket' },
        { type: 'image', src: '/images/projects/project1/openrocket.webp', caption: 'OpenRocket Simulation' },
        { type: 'image', src: '/images/projects/project1/recovery.webp', caption: 'Recovery of the Rocket' }
      ]
    },
    'project-2': {
      title: 'RSYA - 1KM Launch',
      tag: 'RSYA',
      status: 'INDIA HIGH SCHOOL RECORD BROKEN',
      specs: [
        'Apogee: 1,000 meters',
        'Airframe: SLS 3D printed Nylon components forming a fully 3D printed airframe',
        'Propulsion: Custom steel-based primary motor with KNO3 solid propellant grains, and a secondary high-performance aluminum motor utilizing a machined titanium nozzle',
        'Recovery: Single deploy apogee parachute',
        'Milestone: First high school rocketry launch to reach 1km in India'
      ],
      description: 'Served as the President and Founder of RSYA (Rocket Science Youth Association), India\'s first high school rocketry team to achieve a verified 1-kilometer altitude launch. Engineered the vehicle\'s airframe using SLS 3D printed nylon components, resulting in a fully 3D printed structural body. Designed and manufactured two custom rocket motors—one from steel and one from aluminum—alongside a titanium nozzle used for high-performance testing. Formulated custom KNO3-based solid propellant, and collaborated with Paras Space Defense to iterate on the original design for a stronger propulsion system. Additionally, developed a custom single-deploy flight computer specifically for the 1km launch.',
      media: [
        { type: 'image', src: '/images/projects/project2/1kmrocket.webp', caption: 'RSYA 1km Rocket on Pad' },
        { type: 'image', src: '/images/projects/project2/1kmlaunch.webp', caption: '1km Launch' },
        { type: 'image', src: '/images/projects/project2/3dprintedairframe.webp', caption: '3D Printed Nylon Airframe, Compared to an older test vehicle' },
        { type: 'image', src: '/images/projects/project2/titaniumnozzle.webp', caption: 'Machined Titanium Nozzle after Test' },
        { type: 'image', src: '/images/projects/project2/fuelgrain.webp', caption: 'Solid Propellant Fuel Grains' },
        { type: 'image', src: '/images/projects/project2/motorbare.webp', caption: 'Machined Steel Motor' },
        { type: 'image', src: '/images/projects/project2/motorreadu.webp', caption: 'Motor Ready for Installation' },
        { type: 'image', src: '/images/projects/project2/2ndmotorfailed.webp', caption: 'Static Test Failure of Aluminium Motor' }
      ]
    },
    'project-3': {
      title: 'BeyondSight — Currency Reader for Visually Impaired',
      tag: 'ASSISTIVE TECHNOLOGY PROJECT',
      status: '2ND PLACE STARTUP WINNER',
      specs: [
        'Hardware: Custom 2-layer PCB and custom 3D printed case',
        'Interface: Tactile case with audio feedback for ease of use',
        'Technology: Innovative color sensor technology to differentiate notes',
        'Milestone: 2nd Place at Spardha Ideathon (₹25,000 prize) and 2nd Place at a national STEM competition organized by Shiv Nadar University, Chennai'
      ],
      description: 'Engineered and pitched BeyondSight, an assistive currency reader designed to help visually impaired individuals engage in cash transactions without difficulty. Designed a custom printed circuit board (PCB) and 3D printed enclosure, utilizing an innovative color-sensor-based approach to accurately differentiate banknotes. Successfully pitched the device at multiple startup competitions, winning 2nd Place at the Spardha Ideathon (securing ₹25,000 in funding and investor interest), as well as 2nd Place at a regional STEM competition for the initial hardware prototype.',
      media: [
        { type: 'image', src: '/images/projects/project3/firstprototype.webp', caption: 'BeyondSight First Prototype' },
        { type: 'image', src: '/images/projects/project3/beyondsightpcb.webp', caption: 'Custom Designed PCB Circuit Board and Case' },
        { type: 'image', src: '/images/projects/project3/spardhavictory.webp', caption: 'Spardha Competition Second Place Award and Cheque' },
        { type: 'image', src: '/images/projects/project3/snuvictory.webp', caption: 'SNU STEM Competition Second Place' }
      ]
    },
    'project-4': {
      title: '3D Art Portfolio (Blender)',
      tag: '3D MODELING & RENDERING',
      status: 'ARTSTATION PORTFOLIO',
      specs: [
        'Software: Blender',
        'Skills: Hard-surface modeling, texturing, rendering, and composition',
        'Portfolio Link: <a href="https://www.artstation.com/bhasvader" target="_blank" style="color:var(--accent);text-decoration:underline;">artstation.com/bhasvader</a>'
      ],
      description: 'A collection of my 3D artwork, made mostly in Blender. Showcasing hard-surface modeling, lighting, and material node setups.',
      media: [
        {
          "type": "image",
          "src": "/images/projects/art/art_1.webp",
          "caption": "Lantern - Indian by Bhasvader"
        },
        {
          "type": "image",
          "src": "/images/projects/art/art_2.webp",
          "caption": "Laser Cannon ( X17 Turbolaser from Star Wars ) by Bhasvader"
        },
        {
          "type": "image",
          "src": "/images/projects/art/art_3.webp",
          "caption": "Sci-Fi Hallway by Bhasvader"
        },
        {
          "type": "image",
          "src": "/images/projects/art/art_4.webp",
          "caption": "Inception Spinning Top by Bhasvader"
        },
        {
          "type": "image",
          "src": "/images/projects/art/art_5.webp",
          "caption": "A realistic greatsword by Bhasvader"
        },
        {
          "type": "image",
          "src": "/images/projects/art/art_6.webp",
          "caption": "Dragon Scales by Bhasvader"
        },
        {
          "type": "image",
          "src": "/images/projects/art/art_7.webp",
          "caption": "A Red Planet by Bhasvader"
        },
        {
          "type": "image",
          "src": "/images/projects/art/art_8.webp",
          "caption": "Dice (6 Sided) by Bhasvader"
        },
        {
          "type": "image",
          "src": "/images/projects/art/art_9.webp",
          "caption": "A realistic blackhole by Bhasvader"
        },
        {
          "type": "image",
          "src": "/images/projects/art/art_10.webp",
          "caption": "First Donut by Bhasvader"
        }
      ]
    }
  };

  let currentCarouselMedia = [];
  let currentCarouselIndex = 0;

  window.updateCarousel = () => {
    const mediaContainer = document.getElementById('carousel-media-container');
    const captionContainer = document.getElementById('carousel-caption');
    const counterContainer = document.getElementById('carousel-counter');
    if (!mediaContainer || currentCarouselMedia.length === 0) return;

    const item = currentCarouselMedia[currentCarouselIndex];
    
    if (item.type === 'youtube') {
      mediaContainer.innerHTML = `<iframe src="${item.src}" title="${item.caption}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; aspect-ratio: 16/9; border: none; display: block; border: 1px solid var(--border-strong);"></iframe>`;
    } else {
      mediaContainer.innerHTML = `<img src="${item.src}" alt="${item.caption}" style="width: 100%; aspect-ratio: 16/9; object-fit: contain; background: var(--bg-subtle); border: 1px solid var(--border-strong); cursor: pointer;" onclick="window.openModalImage && window.openModalImage('${item.src}', '${item.caption.replace(/'/g, "\\'")}')">`;
    }

    if (captionContainer) captionContainer.textContent = `[ ${item.caption.toUpperCase()} ]`;
    if (counterContainer) counterContainer.textContent = `${currentCarouselIndex + 1} / ${currentCarouselMedia.length}`;
  };

  window.carouselNext = () => {
    if (currentCarouselMedia.length === 0) return;
    currentCarouselIndex = (currentCarouselIndex + 1) % currentCarouselMedia.length;
    window.updateCarousel();
  };

  window.carouselPrev = () => {
    if (currentCarouselMedia.length === 0) return;
    currentCarouselIndex = (currentCarouselIndex - 1 + currentCarouselMedia.length) % currentCarouselMedia.length;
    window.updateCarousel();
  };

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !projectModal || !projectModalBody) return;

    currentCarouselMedia = data.media || [];
    currentCarouselIndex = 0;

    let mediaHTML = '';
    if (currentCarouselMedia.length > 0) {
      mediaHTML = `
        <div style="font-family: var(--font-tag); font-size: 0.85rem; color: var(--accent); font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem;">
        </div>
        <div class="project-carousel" style="position: relative; margin-bottom: 1.5rem;">
          <div id="carousel-media-container" style="width: 100%;"></div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; background: var(--surface); padding: 0.5rem; border: 1px solid var(--border-strong);">
            <button onclick="window.carouselPrev()" style="background: var(--bg); color: var(--accent); border: 1px solid var(--border-red); padding: 0.4rem 1rem; cursor: pointer; font-family: var(--font-tag); font-weight: 700; transition: 0.2s;">&lt; PREV</button>
            <div style="text-align: center; flex-grow: 1; padding: 0 1rem;">
              <div id="carousel-caption" style="font-family: var(--font-tag); font-size: 0.75rem; color: var(--text); font-weight: 700;"></div>
              <div id="carousel-counter" style="font-family: var(--font-tag); font-size: 0.65rem; color: var(--text-muted); margin-top: 0.2rem;"></div>
            </div>
            <button onclick="window.carouselNext()" style="background: var(--bg); color: var(--accent); border: 1px solid var(--border-red); padding: 0.4rem 1rem; cursor: pointer; font-family: var(--font-tag); font-weight: 700; transition: 0.2s;">NEXT &gt;</button>
          </div>
        </div>
      `;
    }

    let specsHTML = '';
    if (data.specs && data.specs.length > 0) {
      specsHTML = `
        <div style="background: var(--bg); border: 1px solid var(--border); padding: 1.25rem; font-family: var(--font-tag); font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
          <p style="color: var(--accent); font-weight: 700; margin-bottom: 0.5rem;">// TECHNICAL SPECIFICATIONS &amp; METRICS:</p>
          ${data.specs.map(spec => {
            if (spec.startsWith('[')) {
              return `<p style="color: var(--text); font-weight: 700; margin-top: 0.85rem; margin-bottom: 0.25rem;">${spec}</p>`;
            }
            return `<p style="margin-left: 0.5rem;">&bull; ${spec}</p>`;
          }).join('')}
        </div>
      `;
    }

    projectModalBody.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <div>
          <span class="telemetry-badge">${data.tag}</span>
          <h2 style="font-family: var(--font-heading); font-size: clamp(1.4rem, 3.5vw, 2.1rem); font-weight: 800; text-transform: uppercase; margin-top: 0.5rem; color: var(--text);">
            ${data.title}
          </h2>
        </div>
      </div>

      <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">
        ${data.description}
      </p>

      ${specsHTML}
      ${mediaHTML}
    `;

    projectModal.classList.remove('hidden');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (currentCarouselMedia.length > 0) {
      window.updateCarousel();
    }
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  const projectCards = document.querySelectorAll('[data-project]');
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const projectId = card.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
  if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);
  window.openModalImage = (src, caption) => {
    openLightbox(src, caption);
  };

});
