
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
            link.style.color = "#FFD700";
        });
        link.addEventListener("mouseout", () => {
            link.style.color = "";
        });
    });
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

        fullNewsToggle.textContent = isExpanded ? "Show less" : "[Full list of news]";
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







