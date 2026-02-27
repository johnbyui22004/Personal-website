document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple visual feedback
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