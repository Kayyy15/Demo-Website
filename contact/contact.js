document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('i');

    form.addEventListener('submit', (e) => {
        // We let the default mailto: action happen, 
        // but we add a cool UI delay effect first!
        
        // 1. Check if form is valid
        if (form.checkValidity()) {
            e.preventDefault(); // Pause the submission briefly

            // 2. Animate the button to "Sending..."
            btnText.textContent = "ENCRYPTING & SENDING...";
            btnIcon.className = "fa-solid fa-spinner fa-spin";
            submitBtn.style.background = "var(--accent-primary, #3b82f6)";
            submitBtn.style.color = "#fff";

            // 3. Wait 1.5 seconds for dramatic effect, then actually submit
            setTimeout(() => {
                btnText.textContent = "TRANSMISSION SUCCESS";
                btnIcon.className = "fa-solid fa-check";
                submitBtn.style.background = "#10b981"; // Success Green
                submitBtn.style.borderColor = "#10b981";

                // Actually trigger the mailto action
                HTMLFormElement.prototype.submit.call(form);

                // Reset button after 3 seconds
                setTimeout(() => {
                    btnText.textContent = "INITIALIZE TRANSMISSION";
                    btnIcon.className = "fa-solid fa-paper-plane";
                    submitBtn.style.background = "transparent";
                    submitBtn.style.color = "var(--accent-primary, #3b82f6)";
                    submitBtn.style.borderColor = "var(--accent-primary, #3b82f6)";
                    form.reset();
                }, 3000);

            }, 1500);
        }
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