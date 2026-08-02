document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('yearSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const toggleIcon = document.getElementById('toggleIcon');
    const yearButtons = document.querySelectorAll('.year-btn');
    const magazineViewer = document.getElementById('magazineViewer');

    // Toggle sidebar collapse/expand
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            toggleIcon.className = "fa-solid fa-chevron-left";
        } else {
            toggleIcon.className = "fa-solid fa-chevron-right";
        }
    });

    // Switch magazine publication source via iframe when clicking years
    yearButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all
            yearButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked button
            this.classList.add('active');

            // Update iframe src to target edition link
            const newSrc = this.getAttribute('data-src');
            if (newSrc) {
                magazineViewer.src = newSrc;
            }
        });
    });
});