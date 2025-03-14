/**
 * Projects Page Specific JavaScript
 */

document.addEventListener("DOMContentLoaded", function() {
  // Initialize project filters
  setupProjectFilters();
  
  // Initialize lightbox for project images
  setupImageLightbox();
  
  // Initialize masonry layout if needed
  setupMasonryLayout();
});

/**
 * Setup project filtering functionality
 */
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item, .project-card');
  
  if (!filterButtons.length || !projectItems.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      // Filter projects
      projectItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = '';
          item.classList.remove('filtered-out');
        } else {
          const categories = item.getAttribute('data-category').split(' ');
          if (categories.includes(filter)) {
            item.style.display = '';
            item.classList.remove('filtered-out');
          } else {
            item.style.display = 'none';
            item.classList.add('filtered-out');
          }
        }
      });
      
      // Refresh masonry layout if present
      refreshMasonryLayout();
      
      // Announce filter results to screen readers
      const visibleCount = document.querySelectorAll('.project-item:not(.filtered-out), .project-card:not(.filtered-out)').length;
      announceFilterResults(visibleCount, filter);
    });
    
    // Add keyboard accessibility
    if (!button.hasAttribute('tabindex')) {
      button.setAttribute('tabindex', '0');
      button.setAttribute('role', 'button');
      
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    }
  });
}

/**
 * Announce filter results to screen readers
 */
function announceFilterResults(count, filter) {
  let announcer = document.querySelector('.filter-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.classList.add('filter-announcer', 'sr-only');
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  const filterText = filter === 'all' ? 'all categories' : `category "${filter}"`;
  announcer.textContent = `Showing ${count} projects in ${filterText}`;
}

/**
 * Setup masonry layout for project grid
 */
function setupMasonryLayout() {
  const grid = document.querySelector('.projects-grid.masonry-grid');
  
  if (!grid) return;
  
  // Load masonry library if not already loaded
  if (typeof Masonry === 'undefined') {
    loadScript('https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js', () => {
      initMasonry(grid);
    });
  } else {
    initMasonry(grid);
  }
}

/**
 * Initialize masonry layout
 */
function initMasonry(grid) {
  const masonry = new Masonry(grid, {
    itemSelector: '.project-card',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: '0.3s'
  });
  
  // Add masonry instance to grid element for later reference
  grid.masonry = masonry;
  
  // Recalculate layout when all images are loaded
  const images = grid.querySelectorAll('img');
  let imagesLoaded = 0;
  
  images.forEach(img => {
    if (img.complete) {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        masonry.layout();
      }
    } else {
      img.addEventListener('load', () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
          masonry.layout();
        }
      });
    }
  });
}

/**
 * Refresh masonry layout after filtering
 */
function refreshMasonryLayout() {
  const grid = document.querySelector('.projects-grid.masonry-grid');
  
  if (!grid || !grid.masonry) return;
  
  setTimeout(() => {
    grid.masonry.layout();
  }, 100);
}

/**
 * Setup image lightbox for project images
 */
function setupImageLightbox() {
  const lightboxImages = document.querySelectorAll('.lightbox-image');
  
  if (!lightboxImages.length) return;
  
  // Create lightbox modal if it doesn't exist
  let lightbox = document.querySelector('.lightbox-modal');
  
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image lightbox');
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <div class="lightbox-image-container">
          <img src="" alt="" class="lightbox-img">
        </div>
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }
  
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');
  
  // Open lightbox on image click
  lightboxImages.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('data-large-src') || img.src;
      const alt = img.alt;
      const caption = img.getAttribute('data-caption') || '';
      
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Track which image was clicked for focus management
      lightbox.setAttribute('data-trigger-id', img.id || '');
      
      // Set focus to close button
      setTimeout(() => closeButton.focus(), 100);
    });
    
    // Add accessibility attributes
    if (!img.hasAttribute('role')) {
      img.setAttribute('role', 'button');
      img.setAttribute('aria-haspopup', 'dialog');
      img.setAttribute('tabindex', '0');
      
      // Ensure each image has a unique ID for focus management
      if (!img.id) {
        img.id = `lightbox-img-${Math.random().toString(36).substr(2, 9)}`;
      }
      
      // Allow keyboard activation
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          img.click();
        }
      });
    }
  });
  
  // Close lightbox functionality
  if (!closeButton.hasListener) {
    // Close on button click
    closeButton.addEventListener('click', closeLightbox);
    closeButton.hasListener = true;
    
    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to the trigger element
    const triggerId = lightbox.getAttribute('data-trigger-id');
    if (triggerId) {
      const trigger = document.getElementById(triggerId);
      if (trigger) {
        trigger.focus();
      }
    }
  }
}

/**
 * Load external script dynamically
 */
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
} 