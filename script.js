// ========== INITIALIZE SERVICES ==========

// Initialize Firebase
const initFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyB6CL0qoMps-gowMuWDjkrRqGAp9Qn0ZDo",
        authDomain: "dream-team-services.firebaseapp.com",
        projectId: "dream-team-services",
        storageBucket: "dream-team-services.firebasestorage.app",
        messagingSenderId: "982013853596",
        appId: "1:982013853596:web:6b39bcb25b85791c8ad259",
        measurementId: "G-87CZR2BM3K"
    };
    
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized");
};

// Initialize Cloudinary
const cl = window.cloudinary.createInstance({
    cloud_name: "dmunsmu40",
    secure: true
});

// ========== DOM LOADED EVENT ==========
document.addEventListener('DOMContentLoaded', () => {
    // Show loading animation first
    showLoadingAnimation();
    
    // Initialize all services with a slight delay to show loading animation
    setTimeout(() => {
        initFirebase();
        
        // Set up all components
        setupThemeToggle();
        setupCustomCursor();
        setupNavbar();
        loadCloudinaryAssets();
        setupHeroSection();
        setupScrollAnimations();
        setupAdvanced3DEffects();
        setupAuthModal();
        initCounters();
        setupTestimonialSlider();
        setupContactForm();
        setupParallaxEffects();
        addParticlesBackground();
        
        // Hide loading animation after everything is loaded
        setTimeout(hideLoadingAnimation, 800);
        
        console.log("All components initialized");
    }, 1000);
});

// ========== LOADING ANIMATION ==========
function showLoadingAnimation() {
    // Create loading overlay if it doesn't exist
    if (!document.querySelector('.loading-overlay')) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-element"></div>
                <div class="spinner-element"></div>
                <div class="spinner-element"></div>
                <div class="spinner-element"></div>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }
}

function hideLoadingAnimation() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }
}

// ========== THEME TOGGLE ==========
function setupThemeToggle() {
    // Check for saved theme preference or use system preference as fallback
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Get the existing theme toggle button from HTML
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Update title based on current theme
        themeToggle.setAttribute('title', savedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
        
        // Add event listener to toggle theme
        themeToggle.addEventListener('click', toggleTheme);

        // Add keyboard shortcut (Alt+T) for toggling theme
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 't') {
                toggleTheme();
            }
        });
    }

    // Update theme-dependent images
    updateThemeImages(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition class to body for smooth theme change
    document.body.classList.add('theme-transitioning');
    
    // Apply theme change
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update toggle button title
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute('title', newTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }

    // Update images based on theme
    updateThemeImages(newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
    }, 500);

    // Announce theme change to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = `Theme switched to ${newTheme} mode`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

// Update images based on current theme
function updateThemeImages(theme) {
    // Optional: Load different images based on theme
    // For example, you might want to load darker/lighter versions of some images

    // Update particle colors if particles are initialized
    if (window.pJSDom && window.pJSDom.length > 0) {
        const particles = window.pJSDom[0].pJS.particles;
        particles.color.value = theme === 'dark' ? '#ffffff' : '#0066ff';
        particles.line_linked.color = theme === 'dark' ? '#ffffff' : '#0066ff';
        
        // Refresh particles
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// ========== CUSTOM CURSOR ==========
function setupCustomCursor() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'custom-cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    // Enhanced cursor interactions with different elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .cta-button, .social-icon, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(0, 102, 255, 0.3)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'rgba(0, 102, 255, 0.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Handle cursor on interactive elements to avoid double cursors
    interactiveElements.forEach(el => {
        el.style.cursor = 'none';
    });
}

// ========== ADVANCED 3D EFFECTS ==========
function setupAdvanced3DEffects() {
    // Add 3D effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add 3D classes
        card.classList.add('tilt-card');
        
        // Wrap card content for 3D effect
        const cardContent = card.innerHTML;
        const newContent = document.createElement('div');
        newContent.className = 'tilt-card-inner';
        newContent.innerHTML = `<div class="tilt-card-3d-layer">${cardContent}</div>`;
        
        card.innerHTML = '';
        card.appendChild(newContent);
        
        // Add 3D tilt effect on mousemove
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const angleX = -(e.clientY - cardCenterY) / 15;
            const angleY = (e.clientX - cardCenterX) / 15;
            
            gsap.to(card.querySelector('.tilt-card-inner'), {
                rotateX: angleX,
                rotateY: angleY,
                ease: "power2.out",
                duration: 0.5
            });
            
            // Dynamic shadow based on tilt
            const shadowX = (e.clientX - cardCenterX) / 20;
            const shadowY = (e.clientY - cardCenterY) / 20;
            
            gsap.to(card, {
                boxShadow: `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2)`,
                duration: 0.5
            });
        });
        
        // Reset card on mouse leave
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.tilt-card-inner'), {
                rotateX: 0,
                rotateY: 0,
                ease: "power3.out",
                duration: 0.7
            });
            
            gsap.to(card, {
                boxShadow: 'var(--shadow-md)',
                duration: 0.7
            });
        });
    });
    
    // Add 3D effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .submit-btn, .auth-btn');
    ctaButtons.forEach(button => {
        button.classList.add('btn-3d');
        button.classList.add('glow-effect');
        button.classList.add('button-shimmer');
    });
    
    // Add float animation to info icons and stats
    const floatingElements = document.querySelectorAll('.info-icon, .stat-item');
    floatingElements.forEach(element => {
        element.classList.add('animate-float');
    });
}

// ========== PARTICLES BACKGROUND ==========
function addParticlesBackground() {
    // Create particle container for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && !heroSection.querySelector('.particle-container')) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.id = 'particles-js';
        heroSection.insertBefore(particleContainer, heroSection.firstChild);
        
        // Load particles.js if available
        if (typeof particlesJS !== 'undefined') {
            const theme = document.documentElement.getAttribute('data-theme');
            const particleColor = theme === 'dark' ? '#ffffff' : '#0066ff';
            const particleOpacity = theme === 'dark' ? 0.3 : 0.2;

            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": { "enable": true, "value_area": 800 }
                    },
                    "color": { "value": particleColor },
                    "opacity": {
                        "value": particleOpacity,
                        "random": true,
                        "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": particleColor,
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": true,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": { "enable": true, "mode": "grab" },
                        "onclick": { "enable": true, "mode": "push" },
                        "resize": true
                    },
                    "modes": {
                        "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                        "push": { "particles_nb": 4 }
                    }
                },
                "retina_detect": true
            });
        } else {
            // Fallback if particles.js is not loaded
            console.log("particles.js not available");
        }
    }

    // Add animated background to sections
    const sections = document.querySelectorAll('.services-overview, .about-section, .testimonials-section, .contact-section');
    sections.forEach(section => {
        section.classList.add('animated-bg');
    });
}

// ========== ENHANCED SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Convert existing animate-on-scroll elements to reveal-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('reveal-on-scroll');
    });
    
    // Add new reveal classes to section elements
    document.querySelectorAll('.service-card').forEach((el, i) => {
        el.classList.add('reveal-on-scroll');
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    document.querySelectorAll('.feature').forEach((el, i) => {
        if (i % 2 === 0) {
            el.classList.add('reveal-left');
        } else {
            el.classList.add('reveal-right');
        }
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    // Add stagger animation to stats
    document.querySelectorAll('.stat-item').forEach((el, i) => {
        el.classList.add('stagger-item');
        el.style.transitionDelay = `${i * 0.15}s`;
    });
    
    // Intersection Observer for scroll animations
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .stagger-item').forEach(el => {
        appearOnScroll.observe(el);
    });
    
    // Enhanced parallax effect for service detail backgrounds
    document.querySelectorAll('.parallax-background').forEach(bg => {
        gsap.to(bg, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: bg.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    // Create scroll-driven animations for additional elements
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
    
    // Image reveal animations
    gsap.utils.toArray('.image-container').forEach(container => {
        const img = container.querySelector('img');
        
        gsap.set(container, { overflow: 'hidden' });
        
        gsap.from(img, {
            scrollTrigger: {
                trigger: container,
                start: "top 75%"
            },
            scale: 1.2,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });
}

// ========== EXISTING FUNCTIONS WITH ENHANCEMENTS ==========

// Enhance Hero Section with interactive elements
function setupHeroSection() {
    // Add some dynamic text effect to the hero title using GSAP
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = 0;
            heroTitle.appendChild(span);
            
            gsap.to(span, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.05 * i,
                ease: "power2.out"
            });
        });
    }
    
    // Animate the CTA buttons with a slight delay
    gsap.from('.hero-cta .cta-button', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Add interactive spotlight effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const spotlight = document.createElement('div');
            spotlight.className = 'hero-spotlight';
            spotlight.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: 300px;
                height: 300px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 1;
                opacity: 0;
            `;
            
            heroSection.appendChild(spotlight);
            
            gsap.to(spotlight, {
                opacity: 1,
                duration: 0.2,
                onComplete: () => {
                    gsap.to(spotlight, {
                        opacity: 0,
                        duration: 0.8,
                        onComplete: () => {
                            spotlight.remove();
                        }
                    });
                }
            });
        });
    }
}

// Enhance contact form with advanced animations
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Save data to Firebase
        const db = firebase.firestore();
        
        db.collection('contacts').add({
            name,
            email,
            service,
            message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'flex';
            
            // Animate success message
            gsap.from(formSuccess, {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: "back.out"
            });
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
            
            // Show error message
            formError.style.display = 'flex';
            
            // Hide error after delay
            setTimeout(() => {
                formError.style.display = 'none';
            }, 5000);
        });
    });

    // Add focus effects to form fields
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        const label = input.previousElementSibling;
        
        input.addEventListener('focus', () => {
            label.style.color = 'var(--primary)';
            gsap.to(label, { y: -5, scale: 0.95, duration: 0.3, ease: "power2.out" });
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.color = '';
                gsap.to(label, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
            }
        });
        
        // Check if input already has value (e.g., after form submission error)
        if (input.value) {
            label.style.color = 'var(--primary)';
            gsap.set(label, { y: -5, scale: 0.95 });
        }
    });
}

// Enhance testimonial slider with smoother transitions
function setupTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!track || slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Set up the slide width
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Arrange slides next to each other
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });
    
    // Move to specified slide
    function moveToSlide(targetIndex) {
        // Boundary check
        if (targetIndex < 0) targetIndex = slides.length - 1;
        if (targetIndex >= slides.length) targetIndex = 0;
        
        // Update current slide
        currentSlide = targetIndex;
        
        // Move the track
        track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');

        // Add smooth crossfade animation
        gsap.to(slides, { opacity: 0.3, duration: 0.3 });
        gsap.to(slides[targetIndex], { opacity: 1, duration: 0.5, delay: 0.2 });
    }
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        moveToSlide(currentSlide + 1);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        moveToSlide(currentSlide - 1);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(() => {
        moveToSlide(currentSlide + 1);
    }, 5000);
    
    // Stop auto slide on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Resume auto slide on mouse leave
    track.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            moveToSlide(currentSlide + 1);
        }, 5000);
    });
}

// ========== NAVBAR FUNCTIONALITY WITH SCROLL INDICATOR ==========
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Toggle hamburger to X
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.toggle('active');
    });
    
    // Active link highlighting
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu when clicking a link
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', highlightActiveSection);

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // Show progress bar only when scrolling
        progressBar.style.opacity = winScroll > 100 ? '1' : '0';
    });
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// ========== CLOUDINARY ASSET LOADING ==========
function loadCloudinaryAssets() {
    // Hero video
    const heroVideo = document.getElementById('hero-video');
    const videoUrl = cl.url('hero-background', {
        resource_type: 'video',
        transformation: [
            { width: 1920, crop: 'scale' },
            { quality: 'auto' }
        ]
    });
    heroVideo.src = videoUrl || 'https://res.cloudinary.com/dmunsmu40/video/upload/v1625876543/digital_abstract_blue.mp4';
    
    // Service background images
    const serviceBackgrounds = document.querySelectorAll('.parallax-background');
    const serviceImages = [
        'web_design_background',
        'software_dev_background',
        'ai_security_background'
    ];
    
    serviceBackgrounds.forEach((bg, index) => {
        if (index < 3) {
            const url = cl.url(serviceImages[index], {
                transformation: [
                    { width: 1920, height: 1080, crop: 'fill' },
                    { quality: 'auto' }
                ]
            });
            if (url) {
                bg.style.backgroundImage = `url(${url})`;
            } else {
                // Fallback gradients if images don't load
                const fallbackGradients = [
                    'linear-gradient(135deg, #0c2558 0%, #1d4e8c 100%)',
                    'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)',
                    'linear-gradient(135deg, #002f6c 0%, #01579b 100%)'
                ];
                bg.style.background = fallbackGradients[index];
            }
        }
    });
    
    // About image
    const aboutImg = document.getElementById('about-img');
    const aboutImgUrl = cl.url('team_photo', {
        transformation: [
            { width: 600, height: 400, crop: 'fill' },
            { quality: 'auto' }
        ]
    });
    aboutImg.src = aboutImgUrl || 'https://res.cloudinary.com/dmunsmu40/image/upload/v1625876543/team_photo.jpg';
    
    // Testimonial avatars
    const testimonialImgs = [
        document.getElementById('testimonial-img-1'),
        document.getElementById('testimonial-img-2'),
        document.getElementById('testimonial-img-3')
    ];
    
    const avatarNames = ['avatar_woman', 'avatar_man', 'avatar_woman2'];
    
    testimonialImgs.forEach((img, index) => {
        const url = cl.url(avatarNames[index], {
            transformation: [
                { width: 100, height: 100, crop: 'fill', gravity: 'face' },
                { radius: 'max' },
                { quality: 'auto' }
            ]
        });
        img.src = url || `https://res.cloudinary.com/dmunsmu40/image/upload/v1625876543/${avatarNames[index]}.jpg`;
    });
}

// ========== AUTHENTICATION MODAL ==========
function setupAuthModal() {
    const loginBtn = document.getElementById('login-btn');
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.querySelector('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('firebase-login');
    const signupForm = document.getElementById('firebase-signup');
    const googleAuthBtn = document.querySelector('.google-auth-btn');
    
    // Open modal
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Animate modal opening
        gsap.from('.modal-content', {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        closeModal();
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        gsap.to('.modal-content', {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset form
                loginForm.reset();
                signupForm.reset();
                document.querySelectorAll('.auth-form .form-error').forEach(el => {
                    el.textContent = '';
                    el.style.display = 'none';
                });
            }
        });
    }
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${target}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Handle successful login
                showAuthSuccess('login');
                setTimeout(closeModal, 2000);
            })
            .catch((error) => {
                // Show error message
                const errorElement = loginForm.querySelector('.form-error') || document.createElement('div');
                errorElement.className = 'form-error';
                errorElement.textContent = error.message;
                if (!loginForm.querySelector('.form-error')) {
                    loginForm.appendChild(errorElement);
                }
                errorElement.style.display = 'block';
            });
    });
    
    // Signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            const errorElement = signupForm.querySelector('.form-error') || document.createElement('div');
            errorElement.className = 'form-error';
            errorElement.textContent = 'Passwords do not match';
            if (!signupForm.querySelector('.form-error')) {
                signupForm.appendChild(errorElement);
            }
            errorElement.style.display = 'block';
            return;
        }
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Update profile with name
                return userCredential.user.updateProfile({
                    displayName: name
                }).then(() => {
                    // Show success message
                    showAuthSuccess('signup');
                    setTimeout(closeModal, 2000);
                });
            })
            .catch((error) => {
                const errorElement = signupForm.querySelector('.form-error') || document.createElement('div');
                errorElement.className = 'form-error';
                errorElement.textContent = error.message;
                if (!signupForm.querySelector('.form-error')) {
                    signupForm.appendChild(errorElement);
                }
                errorElement.style.display = 'block';
            });
    });
    
    // Google Auth
    googleAuthBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                showAuthSuccess('google');
                setTimeout(closeModal, 2000);
            }).catch((error) => {
                console.error("Google auth error:", error);
            });
    });
    
    function showAuthSuccess(type) {
        const successElement = document.createElement('div');
        successElement.className = 'auth-success';
        successElement.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${type === 'login' ? 'Login successful!' : type === 'signup' ? 'Account created successfully!' : 'Google sign-in successful!'}</p>
        `;
        
        if (type === 'login') {
            loginForm.style.display = 'none';
            loginForm.parentNode.appendChild(successElement);
        } else if (type === 'signup') {
            signupForm.style.display = 'none';
            signupForm.parentNode.appendChild(successElement);
        } else {
            authForms.forEach(form => form.style.display = 'none');
            document.querySelector('.auth-tabs').style.display = 'none';
            document.querySelector('.auth-social').style.display = 'none';
            document.querySelector('.modal-content').appendChild(successElement);
        }
    }
    
    // Listen for auth state changes
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            loginBtn.textContent = 'My Account';
            loginBtn.classList.add('logged-in');
        } else {
            // User is signed out
            loginBtn.textContent = 'Login';
            loginBtn.classList.remove('logged-in');
        }
    });
}

// ========== COUNTER ANIMATIONS ==========
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        // Set up ScrollTrigger for each counter
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => animateCounter(counter, target)
        });
    });
}

function animateCounter(counter, target) {
    let count = 0;
    const speed = 200; // Lower = faster
    const increment = Math.ceil(target / (2000 / speed));
    
    const updateCount = () => {
        if (count < target) {
            count += increment;
            if (count > target) count = target;
            counter.innerText = count;
            requestAnimationFrame(updateCount);
        }
    };
    
    updateCount();
}

// ========== PARALLAX EFFECTS ==========
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax-speed');
            const offset = -scrollPosition * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
    
    // Service cards hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate the rotation based on cursor position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply 3D rotation effect
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            card.style.transition = 'transform 0.1s ease-out';
            
            // Add highlight effect
            const intensity = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) / Math.sqrt(centerX ** 2 + centerY ** 2);
            const highlightOpacity = 0.1 + intensity * 0.1;
            card.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.2), 
                                   inset 0 0 80px rgba(255, 255, 255, ${highlightOpacity})`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset to default state
            card.style.transform = '';
            card.style.transition = 'all var(--transition-medium)';
            card.style.boxShadow = '';
        });
    });
}
