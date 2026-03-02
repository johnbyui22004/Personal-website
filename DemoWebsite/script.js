document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const siteNav = document.getElementById('site-nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        siteNav.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                siteNav.classList.remove('active');
            }
        });
    });

    // 2. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent page reload

        // Grab values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        // Simple validation
        if (name === '' || phone === '') {
            formStatus.textContent = 'Please fill out all required fields.';
            formStatus.style.color = 'red';
            return;
        }

        // Simulate API call or form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Success state
            formStatus.textContent = `Thank you, ${name}! We will call you shortly at ${phone}.`;
            formStatus.className = 'form-status form-success';

            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;

            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);

        }, 1200); // Simulated delay
    });

    // --- Prevent parent page from auto-scrolling when clicking fragment links inside this iframe ---
    // Intercept clicks on same-document fragment links and perform in-iframe smooth scrolling.
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        // Only handle same-document fragment links (e.g. "#services")
        if (href && href.startsWith('#')) {
            // Prevent default browser anchor behavior which can trigger parent scroll alignment
            e.preventDefault();

            const id = href.slice(1);
            if (!id) return; // '#' alone

            const targetEl = document.getElementById(id);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Notify parent that a fragment navigation is occurring so it can preserve/restore scroll
                try {
                    window.parent.postMessage({ type: 'iframe-fragment-click', href }, '*');
                } catch (err) {
                    // ignore if parent is inaccessible (cross-origin)
                }
                // Update iframe URL hash without triggering default scroll jump in many browsers
                try {
                    history.replaceState(null, '', href);
                } catch (err) {
                    // fallback if replaceState is not available for some reason
                    location.hash = href;
                }
            }
        }
    });
});