/* ============================================
   SMILE CRAFT - Premium Interactive Experience
   ============================================ */

// Scroll to top on page load/refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Also scroll on load event (after everything including images)
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
    // Scroll to top again after DOM is ready
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;

    // Initialize preloader first (only on main page)
    initPreloader();
    
    // Initialize page transitions
    initPageTransitions();
    
    // Initialize all components
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initParallaxEffects();
    initTestimonialsSlider();
    initContactForm();
    initSmoothScroll();
    initTextReveal();
    initCountUp();
    initDoctorModals();
    initFloatingMenu();
    initUserWayPosition();
    initHeroVideoPlaylist();
    initServicesSlider();
    initGallerySlider();
    initGalleryLightbox();
    initGalleryVideoAutoplay();
});

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // Check if preloader was already shown this session
    if (sessionStorage.getItem('preloaderShown')) {
        // Skip preloader, hide immediately
        preloader.classList.add('loaded');
        return;
    }
    
    // Mark preloader as shown for this session
    sessionStorage.setItem('preloaderShown', 'true');
    
    // Hide preloader after animation completes
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.style.overflow = '';
    }, 2200);
    
    // Prevent scroll during loading
    document.body.style.overflow = 'hidden';
}

/* ============================================
   PAGE TRANSITIONS
   ============================================ */
function initPageTransitions() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;
    
    // Add entrance animation to body
    document.body.classList.add('page-enter');
    
    // Get all internal page links (not anchor links on same page)
    const pageLinks = document.querySelectorAll('a');
    
    pageLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Check if it's an internal page link (not anchor, not external)
        const isInternalPage = (href.endsWith('.html') || href.includes('.html#')) && 
                              !href.startsWith('http') && 
                              !href.startsWith('//');
        
        // Skip if it's just an anchor link on the current page
        const isAnchorOnly = href.startsWith('#');
        
        // Skip external links and booking links
        const isExternal = href.startsWith('http') || href.startsWith('//') || link.getAttribute('target') === '_blank';
        
        if (isInternalPage && !isExternal) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetHref = this.getAttribute('href');
                
                // Activate transition
                transition.classList.add('active');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500);
            });
        }
    });
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    const closeBtn = document.querySelector('.mobile-menu-close');
    
    if (!toggle || !mobileMenu) return;
    
    function openMenu() {
        toggle.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    toggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* ============================================
   SCROLL ANIMATIONS - Enhanced
   ============================================ */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

/* ============================================
   PARALLAX EFFECTS
   ============================================ */
function initParallaxEffects() {
    if ('ontouchstart' in window) return;
    
    const heroVisual = document.querySelector('.hero-visual');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        floatingCards.forEach((card, i) => {
            const speed = 0.05 + (i * 0.02);
            card.style.transform = `translateY(${-scrolled * speed}px)`;
        });
    }, { passive: true });
    
    // Mouse parallax for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;
            
            floatingCards.forEach((card, i) => {
                const intensity = 15 + (i * 10);
                card.style.transform = `translate(${xPercent * intensity}px, ${yPercent * intensity}px)`;
            });
        });
    }
}

/* ============================================
   TEXT REVEAL ANIMATION
   ============================================ */
function initTextReveal() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    // Wrap each line in a span for animation
    const text = title.innerHTML;
    const lines = text.split('<span class="title-highlight">');
    
    if (lines.length > 1) {
        // Already has structure, animate after a delay
        setTimeout(() => {
            title.style.opacity = '1';
        }, 200);
    }
}

/* ============================================
   COUNT UP ANIMATION
   ============================================ */
function initCountUp() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const match = text.match(/(\d+\.?\d*)/);
                
                if (match) {
                    const target = parseFloat(match[1]);
                    const suffix = text.replace(match[1], '');
                    const duration = 2000;
                    const start = performance.now();
                    const isDecimal = text.includes('.');
                    
                    function update(currentTime) {
                        const elapsed = currentTime - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
                        const current = target * eased;
                        
                        if (isDecimal) {
                            el.textContent = current.toFixed(1) + suffix;
                        } else {
                            el.textContent = Math.floor(current) + suffix;
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            el.textContent = text; // Ensure final value is exact
                        }
                    }
                    
                    requestAnimationFrame(update);
                }
                
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

/* ============================================
   TESTIMONIALS SLIDER - Enhanced
   ============================================ */
function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonials-nav .prev');
    const nextBtn = document.querySelector('.testimonials-nav .next');
    const dots = document.querySelectorAll('.nav-dots .dot');
    
    if (!track || !cards.length) return;
    
    let currentIndex = 0;
    let isAnimating = false;
    
    function getCardsPerView() {
        return window.innerWidth <= 768 ? 1 : 2;
    }
    
    function getTotalSlides() {
        return Math.ceil(cards.length / getCardsPerView());
    }
    
    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 32; // gap
        const offset = -currentIndex * cardWidth * getCardsPerView();
        track.style.transform = `translateX(${offset}px)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function goTo(index) {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = Math.max(0, Math.min(index, getTotalSlides() - 1));
        updateSlider();
        setTimeout(() => isAnimating = false, 600);
    }
    
    function next() {
        goTo(currentIndex >= getTotalSlides() - 1 ? 0 : currentIndex + 1);
    }
    
    function prev() {
        goTo(currentIndex <= 0 ? getTotalSlides() - 1 : currentIndex - 1);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goTo(i));
    });
    
    // Touch support
    let startX = 0, endX = 0;
    
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
        }
    }, { passive: true });
    
    // Auto-play
    let interval = setInterval(next, 6000);
    
    track.addEventListener('mouseenter', () => clearInterval(interval));
    track.addEventListener('mouseleave', () => {
        interval = setInterval(next, 6000);
    });
    
    window.addEventListener('resize', debounce(() => {
        currentIndex = 0;
        updateSlider();
    }, 250));
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Add floating label effect
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        
        // Loading state
        btn.disabled = true;
        btn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" style="animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
            </svg>
        `;
        
        // Add spin animation
        const style = document.createElement('style');
        style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
        
        await new Promise(r => setTimeout(r, 1500));
        
        // Success state
        btn.innerHTML = `
            <span>Request Sent!</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
        `;
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
        
        form.reset();
        
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 3000);
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navHeight = document.getElementById('nav')?.offsetHeight || 0;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/* ============================================
   BONUS: Magnetic Buttons Effect
   ============================================ */
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    if ('ontouchstart' in window) return;
    
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* ============================================
   BONUS: Tilt Effect on Cards
   ============================================ */
document.querySelectorAll('.service-card, .team-card').forEach(card => {
    if ('ontouchstart' in window) return;
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const tiltX = (y - 0.5) * 8;
        const tiltY = (x - 0.5) * -8;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ============================================
   DOCTOR MODALS - Simple W3Schools Style
   ============================================ */
function initDoctorModals() {
    var teamCards = document.querySelectorAll('.team-card[data-modal]');
    var allModals = document.querySelectorAll('.doctor-modal');

    // Move modals to documentElement (html) to completely avoid any transform issues
    allModals.forEach(function(modal) {
        document.documentElement.appendChild(modal);
    });

    // Open modal - use class 'active' for CSS flexbox centering
    teamCards.forEach(function(card) {
        card.onclick = function(e) {
            e.preventDefault();
            var modalId = this.getAttribute('data-modal');
            var modal = document.getElementById('modal-' + modalId);
            if (modal) {
                var scrollY = window.scrollY;
                document.body.style.top = '-' + scrollY + 'px';
                document.body.classList.add('modal-open');
                modal.classList.add('active');
                // Scroll modal content to top
                var content = modal.querySelector('.modal-content');
                if (content) content.scrollTop = 0;
            }
        };
    });

    // Close modal function
    function closeModal(modal) {
        var scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.top = '';
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, scrollY);
        document.documentElement.style.scrollBehavior = '';
    }

    // Close button
    var closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(function(btn) {
        btn.onclick = function(e) {
            e.stopPropagation();
            var modal = this.closest('.doctor-modal');
            if (modal) closeModal(modal);
        };
    });

    // Close on backdrop click
    allModals.forEach(function(modal) {
        modal.onclick = function(event) {
            if (event.target === modal) closeModal(modal);
        };
    });

    // Close on Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            allModals.forEach(function(modal) {
                if (modal.classList.contains('active')) closeModal(modal);
            });
        }
    });
}

/* ============================================
   FLOATING MENU
   ============================================ */
function initFloatingMenu() {
    const container = document.getElementById('floating-contact');
    const toggle = document.getElementById('float-toggle');

    if (!container || !toggle) return;

    // Move to documentElement (html) to escape any body transforms/overflow issues
    document.documentElement.appendChild(container);

    toggle.addEventListener('click', () => {
        container.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            container.classList.remove('open');
        }
    });

    // Close when clicking menu items
    container.querySelectorAll('.float-item').forEach(item => {
        item.addEventListener('click', () => {
            container.classList.remove('open');
        });
    });
}

/* ============================================
   USERWAY WIDGET POSITIONING
   ============================================ */
function initUserWayPosition() {
    function moveUserWayToContainer() {
        const floatingContact = document.getElementById('floating-contact');
        const floatToggle = document.getElementById('float-toggle');

        // Try multiple selectors to find UserWay widget
        const userWayWidget = document.querySelector('.uwy') ||
                              document.querySelector('[class*="userway"]') ||
                              document.querySelector('.userway_buttons_wrapper') ||
                              document.querySelector('div[data-userway]');

        console.log('UserWay search:', { floatingContact: !!floatingContact, floatToggle: !!floatToggle, userWayWidget: userWayWidget });

        if (floatingContact && floatToggle && userWayWidget && !userWayWidget.dataset.uwmoved) {
            userWayWidget.dataset.uwmoved = 'true';

            // Reset all positioning
            userWayWidget.style.cssText = `
                position: relative !important;
                bottom: auto !important;
                right: auto !important;
                left: auto !important;
                top: auto !important;
                margin-bottom: 12px !important;
                width: auto !important;
            `;

            // Insert before float-toggle
            floatingContact.insertBefore(userWayWidget, floatToggle);
            console.log('UserWay widget moved successfully!');

            // Debug: log positions after a delay
            setTimeout(() => {
                const uwRect = userWayWidget.getBoundingClientRect();
                const ftRect = floatToggle.getBoundingClientRect();
                console.log('UserWay button position:', {
                    right: window.innerWidth - uwRect.right,
                    bottom: window.innerHeight - uwRect.bottom,
                    width: uwRect.width,
                    height: uwRect.height
                });
                console.log('Float-toggle position:', {
                    right: window.innerWidth - ftRect.right,
                    bottom: window.innerHeight - ftRect.bottom,
                    width: ftRect.width,
                    height: ftRect.height
                });
                console.log('Difference (UW right - FT right):', (window.innerWidth - uwRect.right) - (window.innerWidth - ftRect.right));
            }, 1000);

            return true;
        }
        return false;
    }

    // Try multiple times since widget loads async
    let attempts = 0;
    const tryMove = setInterval(() => {
        attempts++;
        if (moveUserWayToContainer() || attempts >= 30) {
            clearInterval(tryMove);
            if (attempts >= 30) console.log('UserWay widget not found after 30 attempts');
        }
    }, 500);
}

/* ============================================
   HERO VIDEO PLAYLIST
   ============================================ */
function initHeroVideoPlaylist() {
    const videoPlayer = document.getElementById('heroVideoPlayer');
    if (!videoPlayer) return;

    // List of videos to play in sequence (secretary videos first, tour last)
    const videos = [
        'assets/videos/DentalSecrateryOffice.mov',
        'assets/videos/DentalPractise.mov',
        'assets/videos/DentalPractiseBetter.mov',
        'assets/videos/DentalofficeTour.MOV'
    ];

    let currentIndex = 0;

    // Try to autoplay - if it fails, show play button overlay
    function tryAutoplay() {
        const playPromise = videoPlayer.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was prevented - add tap to play functionality
                const wrapper = videoPlayer.closest('.hero-image-wrapper');
                if (wrapper && !wrapper.querySelector('.video-play-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'video-play-overlay';
                    overlay.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    `;
                    overlay.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(0,0,0,0.3);
                        cursor: pointer;
                        z-index: 5;
                        border-radius: inherit;
                    `;
                    wrapper.appendChild(overlay);

                    overlay.addEventListener('click', () => {
                        videoPlayer.play();
                        overlay.remove();
                    }, { once: true });
                }
            });
        }
    }

    // Initial autoplay attempt
    tryAutoplay();

    // When current video ends, fade out and play next
    videoPlayer.addEventListener('ended', () => {
        // Add fade out class
        videoPlayer.classList.add('fading');

        // After fade out, switch video and fade in
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % videos.length;
            videoPlayer.src = videos[currentIndex];
            videoPlayer.load();
            videoPlayer.play();

            // Remove fade class to fade in
            setTimeout(() => {
                videoPlayer.classList.remove('fading');
            }, 50);
        }, 1000); // Match the CSS transition duration
    });
}

/* ============================================
   GALLERY VIDEOS - Mobile Autoplay Fix
   ============================================ */
function initGalleryVideoAutoplay() {
    const galleryVideos = document.querySelectorAll('.gallery-slider video, .slider-track video');

    galleryVideos.forEach(video => {
        // Try to play when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {
                        // Autoplay blocked - add click to play
                        video.style.cursor = 'pointer';
                        video.addEventListener('click', () => {
                            video.play();
                        }, { once: true });
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    });
}

/* ============================================
   SERVICES INFINITE SLIDER
   ============================================ */
function initServicesSlider() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    // Get all original service cards
    const serviceCards = servicesGrid.querySelectorAll('.service-card');
    if (!serviceCards.length) return;

    // Clone all cards and append to create infinite loop effect
    serviceCards.forEach(card => {
        const clone = card.cloneNode(true);
        // Remove animations from clones to prevent re-triggering
        clone.removeAttribute('data-animate');
        clone.removeAttribute('data-delay');
        clone.classList.add('animated'); // Ensure clones are visible
        servicesGrid.appendChild(clone);
    });
}

/* ============================================
   GALLERY SLIDER - Dynamic Height
   ============================================ */
function initGallerySlider() {
    const slider = document.querySelector('.gallery-slider');
    if (!slider) return;

    const container = slider.querySelector('.slider-container');
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dotsContainer = slider.querySelector('.slider-dots');

    if (!slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    // Update container height based on current slide
    function updateHeight() {
        const currentSlide = slides[currentIndex];
        const media = currentSlide.querySelector('img, video');
        
        if (media) {
            // Wait for media to load if needed
            if (media.complete || media.readyState >= 2) {
                container.style.height = currentSlide.offsetHeight + 'px';
            } else {
                media.addEventListener('load', () => {
                    container.style.height = currentSlide.offsetHeight + 'px';
                }, { once: true });
                media.addEventListener('loadeddata', () => {
                    container.style.height = currentSlide.offsetHeight + 'px';
                }, { once: true });
            }
        }
    }

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update height with small delay for smooth transition
        setTimeout(updateHeight, 50);
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;
        updateSlider();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    }, { passive: true });

    // Auto-play (optional - every 5 seconds)
    let autoPlayInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });

    // Initial height setup - wait for all media to load
    window.addEventListener('load', () => {
        updateHeight();
    });
    
    // Also try immediately in case images are cached
    setTimeout(updateHeight, 100);
}

/* ============================================
   GALLERY LIGHTBOX
   ============================================ */
function initGalleryLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const currentSpan = lightbox.querySelector('.lightbox-current');
    const totalSpan = lightbox.querySelector('.lightbox-total');

    // Get all gallery items with lightbox data attribute
    const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');
    const images = [];

    galleryItems.forEach((item) => {
        const img = item.querySelector('img');
        if (img) {
            images.push({
                src: img.src,
                alt: img.alt
            });
        }
    });

    let currentIndex = 0;
    let scrollPosition = 0;

    // Update total count
    if (totalSpan) {
        totalSpan.textContent = images.length;
    }

    function openLightbox(index) {
        currentIndex = index;
        scrollPosition = window.pageYOffset;
        document.body.style.top = '-' + scrollPosition + 'px';
        document.body.classList.add('modal-open');
        updateLightboxImage();
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }

    function updateLightboxImage() {
        if (images[currentIndex]) {
            lightboxImage.src = images[currentIndex].src;
            lightboxImage.alt = images[currentIndex].alt;
            if (currentSpan) {
                currentSpan.textContent = currentIndex + 1;
            }
        }
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }

    // Click handlers for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Close button
    closeBtn.addEventListener('click', closeLightbox);

    // Navigation buttons
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });
}

/* ============================================
   COOKIE CONSENT BANNER
   ============================================ */
function initCookieConsent() {
    const banner = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');

    if (!banner) return;

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');

    if (!cookieChoice) {
        // Show banner after a short delay
        setTimeout(() => {
            banner.classList.add('show');
        }, 1500);
    }

    // Helper function to handle both click and touch
    function addButtonHandler(btn, callback) {
        if (!btn) return;

        let handled = false;

        // Prevent double-firing on touch devices
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!handled) {
                handled = true;
                callback();
                setTimeout(() => handled = false, 300);
            }
        }, { passive: false });

        btn.addEventListener('click', (e) => {
            if (!handled) {
                handled = true;
                callback();
                setTimeout(() => handled = false, 300);
            }
        });
    }

    // Accept cookies
    addButtonHandler(acceptBtn, () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.classList.remove('show');
        // Enable tracking (GTM is already loaded, this just records consent)
        if (window.dataLayer) {
            window.dataLayer.push({'event': 'cookie_consent_given'});
        }
    });

    // Decline cookies
    addButtonHandler(declineBtn, () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.classList.remove('show');
    });
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', initCookieConsent);

console.log('✨ Smile Craft Premium Experience Loaded');
