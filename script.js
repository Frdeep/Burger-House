/* ============================================
   BURGER HOUSE - Franchise Manual App
   JavaScript - Smooth Navigation & Interactions
   Version 2.0 - Bug fixes & UX improvements
   ============================================ */

(function() {
    'use strict';
    
    // ============================================
    // State
    // ============================================
    const state = {
        currentScreen: 0,
        isAnimating: false,
        touchStartY: 0,
        touchStartX: 0,
        touchStartTime: 0,
        carousels: new Map()
    };
    
    // ============================================
    // DOM Elements
    // ============================================
    let splash, app, screens, progressIndicator;
    
    // ============================================
    // Initialize on DOM Ready
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Cache DOM elements
        splash = document.getElementById('splash');
        app = document.getElementById('app');
        screens = document.querySelectorAll('.screen');
        progressIndicator = document.getElementById('progressIndicator');
        
        if (!app || !screens.length) {
            console.error('Required elements not found');
            return;
        }
        
        // Initialize
        initSplashScreen();
        initProgressDots();
        initButtonNavigation();
        initSwipeNavigation();
        initKeyboardNavigation();
        initCarousels();
        initCTAButton();
        initScrollBehavior();
        
        // Set initial state
        screens[0].classList.add('active');
        updateProgressDots();
        
        console.log('🍔 Burger House Franchise Manual v2.0 loaded!');
    }
    
    // ============================================
    // Splash Screen
    // ============================================
    function initSplashScreen() {
        if (!splash) return;
        
        const duration = 1400;
        
        setTimeout(() => {
            splash.classList.add('hidden');
            app.classList.add('visible');
            
            // Remove splash from DOM after animation
            setTimeout(() => {
                splash.remove();
            }, 500);
        }, duration);
    }
    
    // ============================================
    // Progress Dots
    // ============================================
    function initProgressDots() {
        const dotsContainer = document.querySelector('.progress-dots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        screens.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Section ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });
    }
    
    function updateProgressDots() {
        const dots = document.querySelectorAll('.progress-dots span');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === state.currentScreen);
        });
        
        // Show progress indicator only in middle sections
        if (progressIndicator) {
            const shouldShow = state.currentScreen > 0 && state.currentScreen < screens.length - 1;
            progressIndicator.classList.toggle('visible', shouldShow);
        }
    }
    
    // ============================================
    // Screen Navigation
    // ============================================
    function goToScreen(index, skipAnimation = false) {
        // Validate
        if (state.isAnimating) return false;
        if (index === state.currentScreen) return false;
        if (index < 0 || index >= screens.length) return false;
        
        state.isAnimating = true;
        
        const currentEl = screens[state.currentScreen];
        const nextEl = screens[index];
        const goingForward = index > state.currentScreen;
        
        // Update state first
        const previousScreen = state.currentScreen;
        state.currentScreen = index;
        
        if (skipAnimation) {
            currentEl.classList.remove('active', 'exit-left');
            nextEl.classList.add('active');
            nextEl.scrollTop = 0;
            updateProgressDots();
            state.isAnimating = false;
            return true;
        }
        
        // Animate transition
        currentEl.classList.remove('active');
        if (goingForward) {
            currentEl.classList.add('exit-left');
        }
        
        nextEl.classList.add('active');
        nextEl.scrollTop = 0;
        
        updateProgressDots();
        
        // Clean up after animation
        const animationDuration = 350;
        setTimeout(() => {
            currentEl.classList.remove('exit-left');
            state.isAnimating = false;
            
            // Announce for screen readers
            announceScreenChange(index);
        }, animationDuration);
        
        return true;
    }
    
    function announceScreenChange(index) {
        // Create live region announcement
        const title = screens[index].querySelector('.screen-title, .welcome-title');
        if (title) {
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;';
            announcement.textContent = title.textContent;
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        }
    }
    
    // ============================================
    // Button Navigation
    // ============================================
    function initButtonNavigation() {
        document.addEventListener('click', handleButtonClick);
    }
    
    function handleButtonClick(e) {
        const btn = e.target.closest('[data-goto]');
        if (!btn) return;
        
        e.preventDefault();
        
        const targetIndex = parseInt(btn.dataset.goto, 10);
        if (isNaN(targetIndex)) return;
        
        // Visual feedback
        btn.style.transition = 'transform 0.1s ease';
        btn.style.transform = 'scale(0.97)';
        
        requestAnimationFrame(() => {
            setTimeout(() => {
                btn.style.transform = '';
                goToScreen(targetIndex);
            }, 80);
        });
    }
    
    // ============================================
    // Swipe Navigation
    // ============================================
    function initSwipeNavigation() {
        if (!app) return;
        
        app.addEventListener('touchstart', handleTouchStart, { passive: true });
        app.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    function handleTouchStart(e) {
        state.touchStartY = e.touches[0].clientY;
        state.touchStartX = e.touches[0].clientX;
        state.touchStartTime = Date.now();
    }
    
    function handleTouchEnd(e) {
        if (state.isAnimating) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = state.touchStartY - touchEndY;
        const diffX = state.touchStartX - touchEndX;
        const elapsed = Date.now() - state.touchStartTime;
        
        // Ignore if too slow (not a swipe) or if horizontal swipe
        if (elapsed > 500) return;
        if (Math.abs(diffY) < 50) return;
        if (Math.abs(diffX) > Math.abs(diffY) * 0.7) return;
        
        const activeScreen = screens[state.currentScreen];
        const scrollTop = activeScreen.scrollTop;
        const scrollHeight = activeScreen.scrollHeight;
        const clientHeight = activeScreen.clientHeight;
        
        const isAtTop = scrollTop <= 10;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
        
        // Swipe up at bottom of welcome screen → go to menu
        if (diffY > 50 && state.currentScreen === 0 && isAtBottom) {
            goToScreen(1);
            return;
        }
        
        // Swipe down at top of menu → go back to welcome
        if (diffY < -50 && state.currentScreen === 1 && isAtTop) {
            goToScreen(0);
            return;
        }
    }
    
    // ============================================
    // Keyboard Navigation
    // ============================================
    function initKeyboardNavigation() {
        document.addEventListener('keydown', handleKeyDown);
    }
    
    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                // Go to menu from any screen except welcome
                if (state.currentScreen !== 0 && state.currentScreen !== 1) {
                    goToScreen(1);
                } else if (state.currentScreen === 1) {
                    goToScreen(0);
                }
                break;
            
            case 'ArrowLeft':
            case 'Backspace':
                // Go back
                if (state.currentScreen > 1) {
                    goToScreen(1);
                } else if (state.currentScreen === 1) {
                    goToScreen(0);
                }
                break;
            
            case 'Enter':
            case ' ':
                // If on welcome screen, go to menu
                if (state.currentScreen === 0) {
                    e.preventDefault();
                    goToScreen(1);
                }
                break;
        }
    }
    
    // ============================================
    // Card Carousels
    // ============================================
    function initCarousels() {
        const carouselEls = document.querySelectorAll('.card-carousel');
        
        carouselEls.forEach((carousel, carouselIndex) => {
            const cards = carousel.querySelectorAll('.carousel-card');
            const prevBtn = carousel.querySelector('.carousel-btn.prev');
            const nextBtn = carousel.querySelector('.carousel-btn.next');
            const dots = carousel.querySelectorAll('.carousel-dots .dot');
            
            if (!cards.length) return;
            
            const carouselState = {
                currentCard: 0,
                totalCards: cards.length,
                touchStartX: 0
            };
            
            state.carousels.set(carouselIndex, carouselState);
            
            function updateCarousel() {
                cards.forEach((card, i) => {
                    card.classList.remove('active', 'prev');
                    if (i === carouselState.currentCard) {
                        card.classList.add('active');
                    } else if (i < carouselState.currentCard) {
                        card.classList.add('prev');
                    }
                });
                
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === carouselState.currentCard);
                });
                
                // Update button states
                if (prevBtn) {
                    prevBtn.disabled = carouselState.currentCard === 0;
                }
                if (nextBtn) {
                    nextBtn.disabled = carouselState.currentCard === carouselState.totalCards - 1;
                }
            }
            
            function goToCard(index) {
                if (index < 0 || index >= carouselState.totalCards) return;
                carouselState.currentCard = index;
                updateCarousel();
            }
            
            // Button handlers
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToCard(carouselState.currentCard - 1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToCard(carouselState.currentCard + 1);
                });
            }
            
            // Touch swipe on carousel
            carousel.addEventListener('touchstart', (e) => {
                carouselState.touchStartX = e.touches[0].clientX;
            }, { passive: true });
            
            carousel.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = carouselState.touchStartX - touchEndX;
                
                if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                        goToCard(carouselState.currentCard + 1);
                    } else {
                        goToCard(carouselState.currentCard - 1);
                    }
                }
            }, { passive: true });
            
            // Dot click navigation
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => goToCard(i));
                dot.style.cursor = 'pointer';
            });
            
            // Initialize
            updateCarousel();
        });
    }
    
    // ============================================
    // CTA Button
    // ============================================
    function initCTAButton() {
        const ctaBtn = document.getElementById('ctaBtn');
        if (!ctaBtn) return;
        
        let isSubmitting = false;
        
        ctaBtn.addEventListener('click', () => {
            if (isSubmitting) return;
            isSubmitting = true;
            
            const originalText = ctaBtn.textContent;
            
            // Success state
            ctaBtn.textContent = '✓ Demande envoyée !';
            ctaBtn.classList.add('success');
            
            // Reset after delay
            setTimeout(() => {
                ctaBtn.textContent = originalText;
                ctaBtn.classList.remove('success');
                isSubmitting = false;
            }, 2500);
        });
    }
    
    // ============================================
    // Scroll Behavior
    // ============================================
    function initScrollBehavior() {
        // Prevent overscroll on iOS
        document.body.addEventListener('touchmove', (e) => {
            const activeScreen = screens[state.currentScreen];
            if (!activeScreen) return;
            
            const scrollTop = activeScreen.scrollTop;
            const scrollHeight = activeScreen.scrollHeight;
            const clientHeight = activeScreen.clientHeight;
            
            const isAtTop = scrollTop <= 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;
            
            // Prevent overscroll when at boundaries
            if ((isAtTop && e.touches[0].clientY > state.touchStartY) ||
                (isAtBottom && e.touches[0].clientY < state.touchStartY)) {
                // Allow the swipe navigation to handle this
            }
        }, { passive: true });
        
        // Update touch start for scroll boundary detection
        document.body.addEventListener('touchstart', (e) => {
            state.touchStartY = e.touches[0].clientY;
        }, { passive: true });
    }
    
    // ============================================
    // Utility: Debounce
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ============================================
    // Expose API for debugging
    // ============================================
    window.BurgerHouseApp = {
        goToScreen,
        getState: () => ({ ...state }),
        version: '2.0'
    };
    
})();
