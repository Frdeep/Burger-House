/* ============================================
   BURGER HOUSE - Franchise Manual App
   JavaScript - Smooth Navigation & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // Elements
    // ============================================
    const splash = document.getElementById('splash');
    const app = document.getElementById('app');
    const screens = document.querySelectorAll('.screen');
    const progressIndicator = document.getElementById('progressIndicator');
    
    let currentScreen = 0;
    let isAnimating = false;
    let touchStartY = 0;
    let touchStartX = 0;
    
    // ============================================
    // Splash Screen
    // ============================================
    setTimeout(() => {
        splash.classList.add('hidden');
        app.classList.add('visible');
        initProgressDots();
    }, 1800);
    
    // ============================================
    // Progress Dots
    // ============================================
    function initProgressDots() {
        const dotsContainer = document.querySelector('.progress-dots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        screens.forEach((_, i) => {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });
    }
    
    function updateProgressDots() {
        const dots = document.querySelectorAll('.progress-dots span');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentScreen);
        });
        
        // Show/hide progress indicator
        if (currentScreen > 0 && currentScreen < screens.length - 1) {
            progressIndicator.classList.add('visible');
        } else {
            progressIndicator.classList.remove('visible');
        }
    }
    
    // ============================================
    // Screen Navigation
    // ============================================
    function goToScreen(index) {
        if (isAnimating || index === currentScreen || index < 0 || index >= screens.length) return;
        
        isAnimating = true;
        
        const currentEl = screens[currentScreen];
        const nextEl = screens[index];
        
        // Determine direction
        const goingForward = index > currentScreen;
        
        // Animate out current screen
        currentEl.classList.remove('active');
        if (goingForward) {
            currentEl.classList.add('exit-left');
        }
        
        // Animate in next screen
        nextEl.classList.add('active');
        
        // Scroll to top of new screen
        nextEl.scrollTop = 0;
        
        // Update current
        currentScreen = index;
        updateProgressDots();
        
        // Clean up after animation
        setTimeout(() => {
            currentEl.classList.remove('exit-left');
            isAnimating = false;
        }, 400);
    }
    
    // ============================================
    // Button Navigation
    // ============================================
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-goto]');
        if (btn) {
            const targetIndex = parseInt(btn.dataset.goto, 10);
            goToScreen(targetIndex);
            
            // Button press animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        }
    });
    
    // ============================================
    // Swipe Navigation (Vertical)
    // ============================================
    app.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    app.addEventListener('touchend', (e) => {
        if (isAnimating) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;
        
        // Check if it's a vertical swipe (not horizontal)
        if (Math.abs(diffY) < 60 || Math.abs(diffX) > Math.abs(diffY)) return;
        
        const activeScreen = screens[currentScreen];
        const isAtTop = activeScreen.scrollTop <= 5;
        const isAtBottom = activeScreen.scrollTop + activeScreen.clientHeight >= activeScreen.scrollHeight - 5;
        
        // Swipe up at bottom = next screen
        if (diffY > 60 && isAtBottom) {
            // Only allow sequential navigation from welcome screen
            if (currentScreen === 0) {
                goToScreen(1);
            }
        }
        
        // Swipe down at top = previous screen
        if (diffY < -60 && isAtTop) {
            if (currentScreen === 1) {
                goToScreen(0);
            }
        }
    }, { passive: true });
    
    // ============================================
    // Keyboard Navigation
    // ============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            goToScreen(1); // Go to menu
        }
    });
    
    // ============================================
    // Card Carousel
    // ============================================
    const carousels = document.querySelectorAll('.card-carousel');
    
    carousels.forEach(carousel => {
        const cards = carousel.querySelectorAll('.carousel-card');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dots = carousel.querySelectorAll('.carousel-dots .dot');
        let currentCard = 0;
        
        function updateCarousel() {
            cards.forEach((card, i) => {
                card.classList.remove('active', 'prev');
                if (i === currentCard) {
                    card.classList.add('active');
                } else if (i < currentCard) {
                    card.classList.add('prev');
                }
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentCard);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentCard > 0) {
                    currentCard--;
                    updateCarousel();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentCard < cards.length - 1) {
                    currentCard++;
                    updateCarousel();
                }
            });
        }
        
        // Swipe on carousel
        let carouselTouchStartX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            carouselTouchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = carouselTouchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentCard < cards.length - 1) {
                    currentCard++;
                } else if (diff < 0 && currentCard > 0) {
                    currentCard--;
                }
                updateCarousel();
            }
        }, { passive: true });
        
        // Initialize
        updateCarousel();
    });
    
    // ============================================
    // CTA Button
    // ============================================
    const ctaBtn = document.getElementById('ctaBtn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            // Visual feedback
            ctaBtn.textContent = '✓ Demande envoyée !';
            ctaBtn.style.background = '#4CAF50';
            ctaBtn.style.color = '#fff';
            
            setTimeout(() => {
                ctaBtn.textContent = 'Démarrer mon projet';
                ctaBtn.style.background = '';
                ctaBtn.style.color = '';
            }, 3000);
        });
    }
    
    // ============================================
    // Scroll Reveal Animations
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add reveal animation to cards
    document.querySelectorAll('.bento-card, .menu-card, .timeline-item, .principle-card, .team-role').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        revealObserver.observe(el);
    });
    
    // Stagger animation delay
    document.querySelectorAll('.screen').forEach(screen => {
        const cards = screen.querySelectorAll('.bento-card, .menu-card, .timeline-item, .principle-card, .team-role, .excl-item');
        cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.05}s`;
        });
    });
    
    // ============================================
    // Haptic Feedback (if supported)
    // ============================================
    function haptic(style = 'light') {
        if ('vibrate' in navigator) {
            const patterns = {
                light: [10],
                medium: [20],
                heavy: [30]
            };
            navigator.vibrate(patterns[style] || patterns.light);
        }
    }
    
    // Add haptic to buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => haptic('light'));
    });
    
    // ============================================
    // Prevent Pull-to-Refresh on Mobile
    // ============================================
    document.body.addEventListener('touchmove', (e) => {
        const activeScreen = screens[currentScreen];
        if (activeScreen && activeScreen.scrollTop === 0) {
            // Allow normal scrolling behavior
        }
    }, { passive: false });
    
    // ============================================
    // Initialize
    // ============================================
    screens[0].classList.add('active');
    updateProgressDots();
    
    // Preload for smooth animations
    screens.forEach(screen => {
        screen.style.willChange = 'transform, opacity';
    });
    
    console.log('🍔 Burger House Franchise Manual loaded!');
});
