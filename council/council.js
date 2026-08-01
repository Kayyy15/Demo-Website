// --- Custom Toggle Switch Logic ---
function switchTeam(year, btnElement) {
    // 1. Manage button active states
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    // 2. Move the pill slider
    const track = document.querySelector('.toggle-track');
    if (year === '2024') {
        track.classList.add('shifted');
    } else {
        track.classList.remove('shifted');
    }

    // 3. Swap the grids instantly
    const team2025 = document.getElementById("team2025");
    const team2024 = document.getElementById("team2024");

    if (year === '2024') {
        team2025.classList.remove("active-roster");
        team2024.classList.add("active-roster");
    } else {
        team2024.classList.remove("active-roster");
        team2025.classList.add("active-roster");
    }
}

// --- Modern Slideshow Logic ---
let slideIndex = 1;
let slideTimer = null;

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const lines = document.getElementsByClassName("slide-line");
    
    if (!slides.length) return;
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < lines.length; i++) {
        lines[i].className = lines[i].className.replace(" active", "");
    }
    
    slides[slideIndex - 1].style.display = "block";
    if(lines.length) lines[slideIndex - 1].className += " active";
}

function plusSlides(n) {
    clearInterval(slideTimer);
    showSlides(slideIndex += n);
    startTimer();
}

function currentSlide(n) {
    clearInterval(slideTimer);
    showSlides(slideIndex = n);
    startTimer();
}

function startTimer() {
    slideTimer = setInterval(function() {
        slideIndex++;
        showSlides(slideIndex);
    }, 4000); // 4 seconds per slide
}

// Initialize on load
document.addEventListener("DOMContentLoaded", function() {
    showSlides(slideIndex);
    startTimer();

    // Pause slideshow when hovering over the jumbotron
    const jumbotron = document.querySelector('.jumbotron-container');
    if(jumbotron) {
        jumbotron.addEventListener('mouseenter', () => clearInterval(slideTimer));
        jumbotron.addEventListener('mouseleave', () => startTimer());
    }

    // --- Mobile Navigation Menu ---
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');
    const navLinks = document.getElementById('nav-links');

    if (openMenu && closeMenu && navLinks) {
        // Open menu
        openMenu.addEventListener('click', () => {
            navLinks.classList.add('active');
        });

        // Close menu
        closeMenu.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });

        // Auto-close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});