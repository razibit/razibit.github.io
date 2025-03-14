document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });

    
    navLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "#ff0000";
        });
        link.addEventListener("mouseout", () => {
            link.style.color = "";
        });
    });
    
    // Mobile menu toggle
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
        const menuLinks = document.querySelectorAll('nav a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const fullNewsToggle = document.getElementById("full-news-toggle");
    const newsItems = document.querySelectorAll(".news-item");
    let isExpanded = false;

    fullNewsToggle.addEventListener("click", function(event) {
        event.preventDefault();
        isExpanded = !isExpanded;

        newsItems.forEach((item, index) => {
            if (isExpanded) {
                item.style.display = "list-item";
            } else {
                item.style.display = index < 5 ? "list-item" : "none";
            }
        });

        fullNewsToggle.innerHTML = isExpanded ? "<i>[Collapse News]</i>" : "<i>[Full list of News]</i>";
    });
});

//for bibtex, abstract toggle functionality
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".expandable-button");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const target = this.getAttribute("data-target");
            const content = document.getElementById(target);
            
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});







