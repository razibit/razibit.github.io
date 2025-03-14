/**
 * Publications Page Specific JavaScript
 */

document.addEventListener("DOMContentLoaded", function() {
  // Initialize publication filters
  setupPublicationFilters();
  
  // Initialize abstract toggles
  setupAbstractToggles();
  
  // Initialize citation functionality
  setupCitationFeatures();
  
  // Initialize expandable buttons for BibTeX and Abstract
  setupExpandableButtons();
});

/**
 * Setup publication filtering by year
 */
function setupPublicationFilters() {
  const yearLinks = document.querySelectorAll('.year-link');
  const pubSections = document.querySelectorAll('.pub-year-section');
  const pubItems = document.querySelectorAll('.publication-item');
  
  if (!yearLinks.length) return;
  
  yearLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      yearLinks.forEach(lnk => lnk.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      const year = link.getAttribute('data-year');
      let visibleCount = 0;
      
      // If we're filtering by sections (grouped by year)
      if (pubSections.length) {
        if (year === 'all') {
          pubSections.forEach(section => {
            section.style.display = '';
            visibleCount += section.querySelectorAll('.publication-item').length;
          });
        } else {
          pubSections.forEach(section => {
            if (section.getAttribute('data-year') === year) {
              section.style.display = '';
              visibleCount += section.querySelectorAll('.publication-item').length;
            } else {
              section.style.display = 'none';
            }
          });
        }
      } 
      // If publications are not grouped in sections
      else if (pubItems.length) {
        if (year === 'all') {
          pubItems.forEach(item => {
            item.style.display = '';
            visibleCount++;
          });
        } else {
          pubItems.forEach(item => {
            if (item.getAttribute('data-year') === year) {
              item.style.display = '';
              visibleCount++;
            } else {
              item.style.display = 'none';
            }
          });
        }
      }
      
      // Announce to screen readers
      announceFilterResults(visibleCount, year);
    });
    
    // Add keyboard accessibility
    if (!link.hasAttribute('tabindex')) {
      link.setAttribute('tabindex', '0');
      link.setAttribute('role', 'button');
      
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    }
  });
  
  // Setup category/type filters if they exist
  const categoryFilters = document.querySelectorAll('.filter-btn');
  
  if (categoryFilters.length && pubItems.length) {
    categoryFilters.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryFilters.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        let visibleCount = 0;
        
        // Filter publications
        pubItems.forEach(item => {
          // Check if item is already hidden by year filter
          const isHiddenByYear = item.style.display === 'none';
          
          if (filter === 'all') {
            if (!isHiddenByYear) {
              item.style.display = '';
              visibleCount++;
            }
          } else {
            const categories = item.getAttribute('data-category').split(' ');
            if (categories.includes(filter) && !isHiddenByYear) {
              item.style.display = '';
              visibleCount++;
            } else {
              item.style.display = 'none';
            }
          }
        });
        
        // Announce to screen readers
        announceTypeFilterResults(visibleCount, filter);
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
}

/**
 * Announce filter results to screen readers
 */
function announceFilterResults(count, year) {
  let announcer = document.querySelector('.year-filter-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.classList.add('year-filter-announcer', 'sr-only');
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  const yearText = year === 'all' ? 'all years' : `year ${year}`;
  announcer.textContent = `Showing ${count} publications from ${yearText}`;
}

/**
 * Announce type filter results to screen readers
 */
function announceTypeFilterResults(count, filter) {
  let announcer = document.querySelector('.type-filter-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.classList.add('type-filter-announcer', 'sr-only');
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  const filterText = filter === 'all' ? 'all types' : `type "${filter}"`;
  announcer.textContent = `Showing ${count} publications of ${filterText}`;
}

/**
 * Setup abstract toggle functionality
 */
function setupAbstractToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-abstract');
  
  if (!toggleButtons.length) return;
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const pubItem = button.closest('.publication-item');
      const abstract = pubItem.querySelector('.publication-abstract');
      
      if (!abstract) return;
      
      abstract.classList.toggle('visible');
      button.classList.toggle('open');
      
      const isOpen = abstract.classList.contains('visible');
      button.setAttribute('aria-expanded', isOpen);
      
      // Update button text based on state
      const buttonText = isOpen ? 'Hide Abstract' : 'Show Abstract';
      button.innerHTML = `${buttonText} <svg aria-hidden="true" width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="${isOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}"></polyline></svg>`;
      
      // Announce to screen readers
      if (isOpen) {
        announceExpandedState('Abstract expanded');
      } else {
        announceExpandedState('Abstract collapsed');
      }
    });
    
    // Add accessibility attributes
    if (!button.hasAttribute('aria-expanded')) {
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', button.getAttribute('data-target') || '');
    }
  });
}

/**
 * Setup citation functionality
 */
function setupCitationFeatures() {
  setupCitationToggles();
  setupCitationFormats();
  setupCitationCopy();
}

/**
 * Setup citation toggle buttons
 */
function setupCitationToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-citation');
  
  if (!toggleButtons.length) return;
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const pubItem = button.closest('.publication-item');
      const citation = pubItem.querySelector('.citation-block');
      
      if (!citation) return;
      
      citation.classList.toggle('visible');
      button.classList.toggle('open');
      
      const isOpen = citation.classList.contains('visible');
      button.setAttribute('aria-expanded', isOpen);
      
      // Update button text based on state
      const buttonText = isOpen ? 'Hide Citation' : 'Cite';
      button.innerHTML = `${buttonText} <svg aria-hidden="true" width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="${isOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}"></polyline></svg>`;
      
      // Announce to screen readers
      if (isOpen) {
        announceExpandedState('Citation expanded');
      } else {
        announceExpandedState('Citation collapsed');
      }
    });
    
    // Add accessibility attributes
    if (!button.hasAttribute('aria-expanded')) {
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', 'citation-' + button.closest('.publication-item').id);
    }
  });
}

/**
 * Setup expandable buttons for publications (BibTeX & Abstract)
 */
function setupExpandableButtons() {
  const expandableButtons = document.querySelectorAll('.expandable-button');
  
  if (!expandableButtons.length) return;
  
  expandableButtons.forEach(button => {
    const targetId = button.getAttribute('data-target');
    const content = document.getElementById(targetId);
    
    if (!content) return;
    
    // Add accessibility attributes
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', targetId);
    content.setAttribute('aria-hidden', 'true');
    
    // Set initial state
    content.style.display = 'none';
    
    button.addEventListener('click', function() {
      const isExpanded = button.classList.contains('active');
      
      // Toggle visibility
      content.style.display = isExpanded ? 'none' : 'block';
      
      // Toggle active class on the button
      button.classList.toggle('active');
      
      // Update accessibility states
      button.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);
      
      // Announce to screen readers
      const buttonText = button.textContent.trim();
      announceExpandedState(isExpanded ? `${buttonText} collapsed` : `${buttonText} expanded`);
    });
  });
}

/**
 * Setup citation format switchers
 */
function setupCitationFormats() {
  const formatButtons = document.querySelectorAll('.citation-type');
  
  if (!formatButtons.length) return;
  
  formatButtons.forEach(button => {
    button.addEventListener('click', () => {
      const container = button.closest('.citation-controls');
      const allButtons = container.querySelectorAll('.citation-type');
      const format = button.getAttribute('data-format');
      const pubItem = button.closest('.publication-item');
      const citationTexts = pubItem.querySelectorAll('.citation-text');
      
      // Switch active button
      allButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show selected format
      citationTexts.forEach(text => {
        if (text.getAttribute('data-format') === format) {
          text.style.display = 'block';
        } else {
          text.style.display = 'none';
        }
      });
      
      // Announce to screen readers
      announceFormatChange(format);
    });
    
    // Add accessibility attributes
    if (!button.hasAttribute('role')) {
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', button.classList.contains('active'));
    }
  });
}

/**
 * Setup citation copy functionality
 */
function setupCitationCopy() {
  const copyButtons = document.querySelectorAll('.copy-citation');
  
  if (!copyButtons.length) return;
  
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const pubItem = button.closest('.publication-item');
      const activeFormat = pubItem.querySelector('.citation-type.active');
      const format = activeFormat ? activeFormat.getAttribute('data-format') : null;
      const citationText = pubItem.querySelector(format ? 
        `.citation-text[data-format="${format}"]` : 
        '.citation-text');
      
      if (!citationText) return;
      
      const textToCopy = citationText.textContent.trim();
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<svg aria-hidden="true" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Copied!';
        
        // Announce to screen readers
        announceCopiedState('Citation copied to clipboard');
        
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        button.innerHTML = 'Copy failed';
        
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      });
    });
  });
}

/**
 * Announce expanded state to screen readers
 */
function announceExpandedState(message) {
  let announcer = document.querySelector('.expand-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.classList.add('expand-announcer', 'sr-only');
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  announcer.textContent = message;
}

/**
 * Announce format change to screen readers
 */
function announceFormatChange(format) {
  let announcer = document.querySelector('.format-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.classList.add('format-announcer', 'sr-only');
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  announcer.textContent = `Citation format changed to ${format}`;
}

/**
 * Announce copied state to screen readers
 */
function announceCopiedState(message) {
  let announcer = document.querySelector('.copied-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.classList.add('copied-announcer', 'sr-only');
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
  }
  
  announcer.textContent = message;
} 