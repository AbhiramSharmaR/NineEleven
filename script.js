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

    // 9. Interactive World Map Selector
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    if (mapMarkers.length > 0) {
        mapMarkers.forEach(marker => {
            marker.addEventListener('click', (e) => {
                // Prevent bubbling if there are other click listeners
                e.stopPropagation();

                // Check if this marker is already active
                const isActive = marker.classList.contains('active');

                // Remove active class from ALL markers first
                mapMarkers.forEach(m => m.classList.remove('active'));

                // If it wasn't active before, make it active now
                if (!isActive) {
                    marker.classList.add('active');
                    
                    // Optional: Custom cursor reaction on click
                    if(window.innerWidth > 768 && typeof cursor !== 'undefined' && typeof follower !== 'undefined') {
                        follower.style.transform = `translate(-50%, -50%) scale(0.8)`;
                        setTimeout(() => {
                            follower.style.transform = `translate(-50%, -50%) scale(1.5)`;
                        }, 150);
                    }
                }
            });
        });

        // Click anywhere outside a marker resets the map
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.map-marker')) {
                mapMarkers.forEach(m => m.classList.remove('active'));
            }
        });
    }
});
