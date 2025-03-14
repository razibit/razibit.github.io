/**
 * Blog Page Specific JavaScript
 */

document.addEventListener("DOMContentLoaded", function() {
  // Initialize blog search
  setupBlogSearch();
  
  // Initialize category filtering
  setupCategoryFilters();
  
  // Initialize blog pagination`
  setupBlogPagination();
  
  // Initialize image lightbox for blog post images
  setupImageLightbox();
});

/**
 * Setup blog search functionality
 */
function setupBlogSearch() {
  const searchForm = document.querySelector('.blog-search');
  
  if (!searchForm) return;
  
  const searchInput = searchForm.querySelector('input');
  const searchButton = searchForm.querySelector('button');
  const blogPosts = document.querySelectorAll('.blog-post');
  
  if (!searchInput || !searchButton || !blogPosts.length) return;
  
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch();
  });
  
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    performSearch();
  });
  
  // Debounce search as user types
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 300);
  });
  
  // Search functionality
  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    let matchCount = 0;
    
    if (query === '') {
      // Show all posts if search is empty
      blogPosts.forEach(post => {
        post.style.display = '';
        post.classList.remove('filtered-out');
      });
      
      // Clear search announcement
      announceSearchResults(blogPosts.length, '');
      return;
    }
    
    blogPosts.forEach(post => {
      const title = post.querySelector('.post-title').textContent.toLowerCase();
      const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
      const meta = post.querySelector('.post-meta').textContent.toLowerCase();
      
      if (title.includes(query) || excerpt.includes(query) || meta.includes(query)) {
        post.style.display = '';
        post.classList.remove('filtered-out');
        matchCount++;
        
        // Highlight matching text (optional)
        highlightMatchingText(post, query);
      } else {
        post.style.display = 'none';
        post.classList.add('filtered-out');
      }
    });
    
    // Announce results to screen readers
    announceSearchResults(matchCount, query);
  }
}

/**
 * Highlight matching text in search results
 */
function highlightMatchingText(post, query) {
  // Remove existing highlights
  const existingHighlights = post.querySelectorAll('.search-highlight');
  existingHighlights.forEach(el => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });
  
  // Elements to search within
  const elements = [
    post.querySelector('.post-title a'),
    post.querySelector('.post-excerpt')
  ];
  
  elements.forEach(element => {
    if (!element || !element.textContent) return;
    
    const html = element.innerHTML;
    const textNodes = getTextNodes(element);
    
    textNodes.forEach(node => {
      const text = node.nodeValue;
      const lowerText = text.toLowerCase();
      let startIndex = 0;
      let index;
      
      // Find all instances of the query
      while ((index = lowerText.indexOf(query, startIndex)) > -1) {
        const matchText = text.substring(index, index + query.length);
        const highlightNode = document.createElement('span');
        highlightNode.className = 'search-highlight';
        highlightNode.appendChild(document.createTextNode(matchText));
        
        // Split the text node
        const beforeNode = document.createTextNode(text.substring(0, index));
        const afterNode = document.createTextNode(text.substring(index + query.length));
        
        const parent = node.parentNode;
        parent.replaceChild(afterNode, node);
        parent.insertBefore(highlightNode, afterNode);
        parent.insertBefore(beforeNode, highlightNode);
        
        // Move to the next start index
        startIndex = index + query.length;
        // Break out of the loop since we've modified the DOM
        break;
      }
    });
  });
}

/**
 * Get all text nodes within an element
 */
function getTextNodes(element) {
  const textNodes = [];
  
  function getNodes(node) {
    if (node.nodeType === 3) {
      textNodes.push(node);
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        getNodes(node.childNodes[i]);
      }
    }
  }
  
  getNodes(element);
  return textNodes;
}

/**
 * Announce search results to screen readers
 */
function announceSearchResults(count, query) {
  let announcer = document.querySelector('.search-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.classList.add('search-announcer', 'sr-only');
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  if (query) {
    announcer.textContent = `Found ${count} ${count === 1 ? 'post' : 'posts'} matching "${query}"`;
  } else {
    announcer.textContent = '';
  }
}

/**
 * Setup category filtering
 */
function setupCategoryFilters() {
  const categoryLinks = document.querySelectorAll('.category-link');
  const blogPosts = document.querySelectorAll('.blog-post');
  
  if (!categoryLinks.length || !blogPosts.length) return;
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from other links
      categoryLinks.forEach(otherLink => otherLink.classList.remove('active'));
      link.classList.add('active');
      
      const category = link.getAttribute('data-category');
      let matchCount = 0;
      
      if (category === 'all') {
        // Show all posts
        blogPosts.forEach(post => {
          post.style.display = '';
          post.classList.remove('filtered-out');
          matchCount++;
        });
      } else {
        // Filter posts by category
        blogPosts.forEach(post => {
          const categories = post.getAttribute('data-categories').split(' ');
          
          if (categories.includes(category)) {
            post.style.display = '';
            post.classList.remove('filtered-out');
            matchCount++;
          } else {
            post.style.display = 'none';
            post.classList.add('filtered-out');
          }
        });
      }
      
      // Announce to screen readers
      announceFilterResults(matchCount, category);
    });
    
    // Ensure keyboard accessibility
    if (!link.hasAttribute('role')) {
      link.setAttribute('role', 'button');
      link.setAttribute('tabindex', '0');
      
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    }
  });
}

/**
 * Announce filter results to screen readers
 */
function announceFilterResults(count, category) {
  let announcer = document.querySelector('.category-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.classList.add('category-announcer', 'sr-only');
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  const categoryText = category === 'all' ? 'all categories' : `category "${category}"`;
  announcer.textContent = `Showing ${count} posts in ${categoryText}`;
}

/**
 * Setup blog pagination
 */
function setupBlogPagination() {
  const paginationLinks = document.querySelectorAll('.pagination-item, .pagination-next, .pagination-prev');
  
  if (!paginationLinks.length) return;
  
  paginationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // In a real application, this would navigate to the next page or use AJAX
      // For this static demo, we'll just simulate the active state
      
      // Update active pagination item
      document.querySelectorAll('.pagination-item').forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-current', 'false');
      });
      
      if (link.classList.contains('pagination-item')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
      
      // Scroll to top of blog list
      const blogList = document.querySelector('.blog-posts');
      if (blogList) {
        blogList.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Announce page change to screen readers
      announcePagination(link.textContent.trim());
    });
  });
}

/**
 * Announce pagination change to screen readers
 */
function announcePagination(page) {
  let announcer = document.querySelector('.pagination-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.classList.add('pagination-announcer', 'sr-only');
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  announcer.textContent = `Navigated to page ${page}`;
}

/**
 * Setup image lightbox for blog post images
 */
function setupImageLightbox() {
  const lightboxImages = document.querySelectorAll('.post-image img');
  
  if (!lightboxImages.length) return;
  
  // Add lightbox class to images
  lightboxImages.forEach(img => {
    img.classList.add('lightbox-image');
    img.setAttribute('data-caption', img.alt || '');
  });
  
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