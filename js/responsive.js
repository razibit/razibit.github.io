// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('nav');
    
    if (mobileMenuButton && navMenu) {
        // Add ID to nav if not present
        if (!navMenu.id) {
            navMenu.id = 'nav-menu';
        }
        
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // News list toggle functionality (for homepage)
    const fullNewsToggle = document.getElementById('full-news-toggle');
    if (fullNewsToggle) {
        fullNewsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const newsItems = document.querySelectorAll('.news-item');
            let expanded = this.getAttribute('data-expanded') === 'true';
            
            newsItems.forEach((item, index) => {
                if (index >= 5) {
                    item.style.display = expanded ? 'none' : 'list-item';
                }
            });
            
            expanded = !expanded;
            this.setAttribute('data-expanded', expanded);
            this.innerHTML = expanded ? '<i>[Collapse News]</i>' : '<i>[Full list of News]</i>';
        });
    }
    
    // Publication expandable content (for publications page)
    const expandButtons = document.querySelectorAll('.toggle-abstract');
    if (expandButtons.length > 0) {
        expandButtons.forEach(button => {
            button.addEventListener('click', function() {
                const content = this.nextElementSibling;
                if (content && content.classList.contains('expandable-content')) {
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }
}); 