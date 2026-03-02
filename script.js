document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const siteNav = document.getElementById('site-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const body = document.body;

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'active' class on the nav and 'no-scroll' on the body
            const isActive = siteNav.classList.toggle('active');
            body.classList.toggle('no-scroll', isActive);
            
            // Accessibility: update aria-expanded if you're using it
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        // Close menu and restore scroll when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                siteNav.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // --- Contact Form Logic (Your Original Code) ---
    const contactForm = document.getElementById('contact-form'); // Note: ID matched to your HTML

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";
            btn.disabled = true;

            setTimeout(() => {
                alert("Demo Request Sent! We will contact you within 24 hours to review your shop's online presence.");
                contactForm.reset();
                btn.innerText = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
            }, 1500);
        });
    }
});