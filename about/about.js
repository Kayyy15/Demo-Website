document.addEventListener('DOMContentLoaded', () => {
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