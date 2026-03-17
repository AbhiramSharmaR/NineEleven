document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    
    // Minimum load time for the aesthetic effect (2 seconds)
    setTimeout(() => {
        document.body.classList.add('loaded');
        // Initialize Hero Text Animations after preloader is done
        setTimeout(initHeroAnimations, 500);
    }, 2000);

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // We only enable custom cursor on non-touch devices
    if(window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Native cursor moves instantly
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Add easing to follower
        const updateFollower = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(updateFollower);
        };
        updateFollower();

        // Cursor Hover Effects
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    // 3. Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // 4. Parallax Effect on Hero Background
    const parallaxBg = document.querySelector('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if(parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. Scroll Reveal with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-element, .reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Hero Text Stagger Animation
    function initHeroAnimations() {
        const titleLines = document.querySelectorAll('.hero-title .reveal-text');
        titleLines.forEach((line, index) => {
            // Animate each line in
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            line.style.transition = `all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) ${index * 0.2}s`;
            
            // Trigger reflow
            void line.offsetWidth;
            
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        });
    }

    // ==========================================
    // NEW ADVANCED 3D & INTERACTIVE FEATURES
    // ==========================================

    // 7. 3D Typography Mouse Tracking
    const text3dContainer = document.querySelector('.3d-text-container');
    const text3dElements = document.querySelectorAll('.text-3d, .text-3d-glow');

    if (text3dContainer && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;

            text3dElements.forEach(el => {
                el.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
            });
        });
    }

    // 8. Tilt & Depth Effects for Cards
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(card => {
        const inner = card.querySelector('.insight-card-inner');
        const overlay = card.querySelector('.gloss-overlay');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the center of the card
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Rotation multipliers (adjust for more/less tilt)
            const rotateX = (y / rect.height) * -30;
            const rotateY = (x / rect.width) * 30;

            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Interactive gloss reflection base on mouse position
            if(overlay) {
                const glossX = (e.clientX - rect.left) / rect.width * 100;
                const glossY = (e.clientY - rect.top) / rect.height * 100;
                overlay.style.background = `radial-gradient(circle at ${glossX}% ${glossY}%, rgba(255,255,255,0.2) 0%, transparent 50%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            // Reset to default flip state or base state
            inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
            if(overlay) {
                overlay.style.background = `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)`;
            }
        });
    });

    // 9. Rotating Image Gallery (3D Carousel)
    const carousel = document.querySelector('.carousel-3d');
    const items = document.querySelectorAll('.carousel-item');
    
    if (carousel && items.length > 0) {
        const totalItems = items.length;
        const radius = Math.round((300 / 2) / Math.tan(Math.PI / totalItems)) + 100; // 300 is item width
        
        let currAngle = 0;
        let diffAngle = 0;
        let startX = 0;
        let isDragging = false;
        let rotationVelocity = 0;
        let lastX = 0;
        let animationFrame;

        // Position items in 3D circle
        items.forEach((item, index) => {
            const theta = (360 / totalItems) * index;
            item.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
        });

        const updateCarousel = () => {
            carousel.style.transform = `rotateY(${currAngle}deg)`;
            
            // Highlight front-facing image
            const normalizedAngle = ((currAngle % 360) + 360) % 360; // Keep between 0-360
            items.forEach((item, index) => {
                const itemAngle = (360 - (360 / totalItems) * index) % 360;
                const diff = Math.abs(normalizedAngle - itemAngle);
                const isFront = diff < (360 / totalItems / 2) || diff > 360 - (360 / totalItems / 2);
                
                const img = item.querySelector('img');
                if (isFront) {
                    img.style.filter = 'brightness(1.1)';
                    item.style.boxShadow = '0 20px 50px rgba(255, 78, 0, 0.4)';
                } else {
                    img.style.filter = 'brightness(0.3)';
                    item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
                }
            });
        };

        // Inertia animation loop
        const loop = () => {
            if (!isDragging) {
                currAngle += rotationVelocity;
                rotationVelocity *= 0.95; // Friction

                // Auto rotate slowly if no interaction
                if (Math.abs(rotationVelocity) < 0.01) {
                    rotationVelocity = -0.15;
                }
            }
            updateCarousel();
            animationFrame = requestAnimationFrame(loop);
        };

        // Initialize Carousel State
        updateCarousel();
        loop();

        // Drag events
        const startDrag = (e) => {
            isDragging = true;
            startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            lastX = startX;
            cancelAnimationFrame(animationFrame);
            
            // specific hover cursor targetting
            if(window.innerWidth > 768) {
                cursor.classList.add('active');
                follower.classList.add('active');
                follower.style.transform = `translate(-50%, -50%) scale(0.5)`;
            }
        };

        const onDrag = (e) => {
            if (!isDragging) return;
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            
            const diff = clientX - startX;
            const deltaX = clientX - lastX;
            
            currAngle += deltaX * 0.4; // Drag speed modifier
            rotationVelocity = deltaX * 0.4;
            
            lastX = clientX;
            updateCarousel();
        };

        const stopDrag = () => {
            isDragging = false;
            loop(); // re-initiate loop with velocity
            if(window.innerWidth > 768) {
                cursor.classList.remove('active');
                follower.classList.remove('active');
                follower.style.transform = `translate(-50%, -50%) scale(1)`;
            }
        };

        carousel.addEventListener('mousedown', startDrag);
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);
        
        carousel.addEventListener('touchstart', startDrag);
        window.addEventListener('touchmove', onDrag);
        window.addEventListener('touchend', stopDrag);

        // Scroll to rotate capability over the gallery section container
        const gallerySection = document.getElementById('gallery');
        gallerySection.addEventListener('wheel', (e) => {
            e.preventDefault(); // Prevent page scrolling slightly when over the carousel
            rotationVelocity += e.deltaY > 0 ? 0.5 : -0.5;
        }, { passive: false });
    }
});
