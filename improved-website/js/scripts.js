/**
 * Enhanced JavaScript for the improved website
 * Features improved responsiveness and accessibility
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Cache DOM elements
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileMenuButton = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');
  const fullNewsToggle = document.getElementById("full-news-toggle");
  const expandableButtons = document.querySelectorAll(".expandable-button");
  
  // Current page highlighting
  highlightCurrentPage();
  
  // Setup mobile menu
  setupMobileMenu();
  
  // Setup news toggle
  setupNewsToggle();
  
  // Setup expandable buttons (for publications, etc.)
  setupExpandableButtons();
  
  // Add resize listener for responsive adjustments
  setupResponsiveAdjustments();
  
  /**
   * Highlight the current page in navigation
   */
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      // Check if the link matches the current path or if we're on homepage and the link is to the root
      if (href === currentPath || 
          (currentPath === "/" && href === "/") || 
          (currentPath.endsWith("/index.html") && href === "/")) {
        link.classList.add("active");
        // Accessibility improvement - indicate current page to screen readers
        link.setAttribute("aria-current", "page");
      }
    });
  }
  
  /**
   * Setup mobile menu functionality with improved accessibility
   */
  function setupMobileMenu() {
    if (mobileMenuButton && navMenu) {
      // Add ARIA attributes for accessibility
      mobileMenuButton.setAttribute("aria-expanded", "false");
      mobileMenuButton.setAttribute("aria-controls", "nav-menu");
      mobileMenuButton.setAttribute("aria-label", "Menu");
      
      // Toggle menu on button click
      mobileMenuButton.addEventListener('click', function() {
        const isExpanded = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('body-with-menu-open');
        
        // Update ARIA attributes
        mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
      });
      
      // Close menu when clicking on a navigation link
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          navMenu.classList.remove('active');
          document.body.classList.remove('body-with-menu-open');
          mobileMenuButton.setAttribute("aria-expanded", "false");
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnMenuButton = mobileMenuButton.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnMenuButton && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          document.body.classList.remove('body-with-menu-open');
          mobileMenuButton.setAttribute("aria-expanded", "false");
        }
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          document.body.classList.remove('body-with-menu-open');
          mobileMenuButton.setAttribute("aria-expanded", "false");
          // Return focus to the menu button for accessibility
          mobileMenuButton.focus();
        }
      });
    }
  }
  
  /**
   * Setup news toggle functionality
   */
  function setupNewsToggle() {
    if (fullNewsToggle) {
      const newsItems = document.querySelectorAll(".news-item");
      let isExpanded = false;
      
      // Initially hide news items beyond the first 5
      newsItems.forEach((item, index) => {
        if (index >= 5) {
          item.style.display = "none";
        }
      });
      
      fullNewsToggle.addEventListener("click", function(event) {
        event.preventDefault();
        isExpanded = !isExpanded;
        
        newsItems.forEach((item, index) => {
          item.style.display = isExpanded || index < 5 ? "list-item" : "none";
        });
        
        fullNewsToggle.innerHTML = isExpanded ? 
          "<i>[Collapse News]</i>" : 
          "<i>[Full list of News]</i>";
        
        // Accessibility improvement
        fullNewsToggle.setAttribute("aria-expanded", isExpanded);
        
        // Smooth scroll to toggle if expanding
        if (isExpanded) {
          const lastVisibleNewsItem = Array.from(newsItems).filter(
            item => item.style.display !== "none"
          ).pop();
          
          if (lastVisibleNewsItem) {
            lastVisibleNewsItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
      
      // Initialize ARIA attributes
      fullNewsToggle.setAttribute("role", "button");
      fullNewsToggle.setAttribute("aria-expanded", "false");
      fullNewsToggle.setAttribute("aria-controls", "news-list");
    }
  }
  
  /**
   * Setup expandable buttons (for publications)
   */
  function setupExpandableButtons() {
    expandableButtons.forEach(button => {
      const targetId = button.getAttribute("data-target");
      const content = document.getElementById(targetId);
      
      if (content) {
        // Add accessibility attributes
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", targetId);
        content.setAttribute("aria-hidden", "true");
        
        button.addEventListener("click", function() {
          const isExpanded = content.style.display === "block";
          
          // Toggle visibility
          content.style.display = isExpanded ? "none" : "block";
          
          // Update accessibility states
          button.setAttribute("aria-expanded", !isExpanded);
          content.setAttribute("aria-hidden", isExpanded);
        });
      }
    });
  }
  
  /**
   * Setup responsive adjustments
   */
  function setupResponsiveAdjustments() {
    // Function to check if we're in mobile view
    const isMobileView = () => window.matchMedia("(max-width: 768px)").matches;
    
    // Function to handle sidebar placement
    const adjustSidebar = () => {
      const sidebar = document.querySelector('.left-sidebar');
      if (!sidebar) return;
      
      if (isMobileView()) {
        sidebar.style.position = 'static';
      } else {
        sidebar.style.position = 'sticky';
      }
    };
    
    // Adjust on load
    adjustSidebar();
    
    // Adjust on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(adjustSidebar, 100);
    });
    
    // Add lazy loading to images
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
}); 