
/**
 * Main Application Script
 * Handles smooth scrolling, form submissions, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    initSmoothScroll();
    initFormHandling();
    initScrollAnimations();
});

/**
 * Smooth Scroll Navigation
 * Intercepts clicks on anchor links and scrolls to target element.
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Contact Form Handling
 * Manages form submission and provides visual feedback to the user.
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Select the submit button (using class or type)
            const submitBtn = form.querySelector('button[type="submit"]');
            
            if (submitBtn) {
                const originalText = submitBtn.innerText;
                
                // Show Success State
                submitBtn.innerText = 'تم الإرسال بنجاح!';
                submitBtn.style.backgroundColor = '#22c55e';
                
                // Reset Form
                form.reset();
                
                // Revert button state after delay
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
}

/**
 * Scroll Animations using Intersection Observer
 * Triggers fade-in effects when elements enter the viewport.
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach observer to all elements with .fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}
