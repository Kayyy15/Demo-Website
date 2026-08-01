document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation slightly for each card
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 150); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- 2. Premium 3D Tilt Effect ---
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        const innerCard = card.querySelector('.card-inner');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Get mouse position relative to the center of the card
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Calculate rotation (higher division number = less dramatic tilt)
            const rotateX = -(y / 15); 
            const rotateY = (x / 15);

            // Apply the rotation using transform
            innerCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Add a subtle glare effect based on mouse position
            const glareX = (e.clientX - rect.left) / rect.width * 100;
            const glareY = (e.clientY - rect.top) / rect.height * 100;
            innerCard.style.background = `
                radial-gradient(
                    circle at ${glareX}% ${glareY}%, 
                    rgba(59, 130, 246, 0.1) 0%, 
                    var(--bg-card) 50%
                )
            `;
        });

        // Reset the card when the mouse leaves
        card.addEventListener('mouseleave', () => {
            innerCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
            innerCard.style.background = `var(--bg-card)`;
            // Smoothly transition back to flat
            innerCard.style.transition = `transform 0.5s ease, background 0.5s ease, box-shadow 0.3s ease`;
        });

        // Remove the transition when actively moving so it doesn't lag
        card.addEventListener('mouseenter', () => {
            innerCard.style.transition = `box-shadow 0.3s ease`;
        });
    });

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