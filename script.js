document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Theme Switcher Logic
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // Check localStorage or system preferences
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        bodyElement.className = savedTheme;
    } else {
        bodyElement.className = systemPrefersDark ? 'dark-theme' : 'light-theme';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (bodyElement.classList.contains('dark-theme')) {
            bodyElement.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('portfolio-theme', 'light-theme');
        } else {
            bodyElement.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('portfolio-theme', 'dark-theme');
        }
    });

    // ==========================================
    // Mobile Drawer Navigation
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileDrawerLinks = document.querySelectorAll('.mobile-nav-item');

    function toggleMenu() {
        mobileDrawer.classList.toggle('open');
        bodyElement.classList.toggle('drawer-open');
    }

    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Close drawer when clicking links
    mobileDrawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
            bodyElement.classList.remove('drawer-open');
        });
    });

    // ==========================================
    // Scroll Header Style & Scroll Top Button
    // ==========================================
    const header = document.querySelector('header');
    const scrollTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // Typing Cycle Effect for Hero Headline
    // ==========================================
    const typingElement = document.getElementById('typing-headline');
    const phrases = [
        "M.Tech Network & Security Student",
        "Cybersecurity Enthusiast",
        "Software Developer"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function cycleHeadline() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Standard typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(cycleHeadline, typingSpeed);
    }

    // Start cycling typing text
    setTimeout(cycleHeadline, 1000);

    // ==========================================
    // Intersection Observer (Scroll Reveal)
    // ==========================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // Skills Progress Bar Animation
    // ==========================================
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar-progress');

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                });
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.2
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ==========================================
    // Active Link Highlighting on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Adjust offset for sticky header
            if (window.scrollY >= (sectionTop - 120)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // Contact Form Validation & Submission
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSuccessAlert = document.getElementById('form-success');
    
    // Form Inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Email pattern regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(inputElement, errorElementId, validationFn) {
        const isValid = validationFn(inputElement.value.trim());
        const formGroup = inputElement.closest('.form-group');

        if (!isValid) {
            formGroup.classList.add('invalid');
            return false;
        } else {
            formGroup.classList.remove('invalid');
            return true;
        }
    }

    // Live validation on blur
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, 'name-error', value => value.length > 0);
    });

    emailInput.addEventListener('blur', () => {
        validateField(emailInput, 'email-error', value => emailRegex.test(value));
    });

    subjectInput.addEventListener('blur', () => {
        validateField(subjectInput, 'subject-error', value => value.length > 0);
    });

    messageInput.addEventListener('blur', () => {
        validateField(messageInput, 'message-error', value => value.length > 0);
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Run all validations
        const isNameValid = validateField(nameInput, 'name-error', value => value.length > 0);
        const isEmailValid = validateField(emailInput, 'email-error', value => emailRegex.test(value));
        const isSubjectValid = validateField(subjectInput, 'subject-error', value => value.length > 0);
        const isMessageValid = validateField(messageInput, 'message-error', value => value.length > 0);

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

            // Simulate server network delay
            setTimeout(() => {
                // Reset form and UI
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                // Show Success Message
                formSuccessAlert.style.display = 'flex';

                // Hide Success Message after 5 seconds
                setTimeout(() => {
                    formSuccessAlert.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });
});
