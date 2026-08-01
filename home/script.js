document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // Gives a nice cinematic loading feel

    // --- Typing Animation (Hero Heading) ---
    const heading = document.getElementById('typing-heading');
    const textToType = "IEEE PCE";
    let charIndex = 0;
    
    // We wait for the preloader to finish before typing
    setTimeout(() => {
        const typeWriter = () => {
            if (charIndex < textToType.length) {
                heading.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 150); // Typing speed
            } else {
                // Remove cursor blink effect when done
                heading.style.borderRight = "none";
                // Show the rest of the hero content
                document.querySelector('.hero-details').classList.add('show');
                document.querySelector('.hero-image').classList.add('show');
            }
        };
        typeWriter();
    }, 1800);

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Image Modal / Lightbox Logic ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    const posterImages = document.querySelectorAll('.card-img-wrapper img');

    // Open modal on image click
    posterImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex";
            // Tiny delay to let display:flex apply before triggering the CSS animation
            setTimeout(() => {
                modal.classList.add('show-modal');
            }, 10);
            modalImg.src = this.src;
        });
    });

    // Close function
    const hideModal = () => {
        modal.classList.remove('show-modal');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300); // Matches the CSS transition time
    };

    // Close when clicking the 'X'
    closeModal.addEventListener('click', hideModal);

    // Close when clicking anywhere in the dark background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // --- Interactive Particle Constellation ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        // Match canvas size to the hero section
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        let mouse = {
            x: null,
            y: null,
            radius: 150 // How close the mouse needs to be to connect to particles
        };

        // Track mouse movement
        window.addEventListener('mousemove', function(event) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });

        // Clear mouse when it leaves the browser window
        window.addEventListener('mouseleave', function() {
            mouse.x = undefined;
            mouse.y = undefined;
        });
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            
            // Draw individual particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            
            // Update particle position and bounce off edges
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                
                this.x += this.directionX;
                this.y += this.directionY;
                
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000; // Density
            
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1; // Random size 1-3px
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 1) - 0.5; // Speed X
                let directionY = (Math.random() * 1) - 0.5; // Speed Y
                let color = 'rgba(59, 130, 246, 0.5)'; // Matches your --accent-primary

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Draw lines between close particles
        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                                   ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        let opacityValue = 1 - (distance / 10000);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.2})`; // Faint blue lines
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
                
                // Connect particles to mouse
                if (mouse.x != undefined && mouse.y != undefined) {
                    let dx = mouse.x - particlesArray[a].x;
                    let dy = mouse.y - particlesArray[a].y;
                    let distance = dx * dx + dy * dy;
                    if (distance < mouse.radius * mouse.radius) {
                        ctx.strokeStyle = `rgba(96, 165, 250, ${1 - (distance/(mouse.radius*mouse.radius))})`; // Brighter line to mouse
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            init();
        });

        init();
        animate();
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