/* ============================================
   BURGER HOUSE - Franchise Manual
   JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const menuBtn = document.querySelector('.nav-menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-list a');
    const progressFill = document.querySelector('.progress-fill');
    const mainContainer = document.querySelector('.main-container');
    
    // State
    let currentSlide = 0;
    let isAnimating = false;
    let touchStartY = 0;
    let touchEndY = 0;
    const totalSlides = slides.length;
    
    // ============================================
    // Slide Navigation
    // ============================================
    
    function goToSlide(index, direction = 'next') {
        if (isAnimating || index === currentSlide || index < 0 || index >= totalSlides) return;
        
        isAnimating = true;
        
        // Remove active from current slide
        slides[currentSlide].classList.remove('active');
        
        // Update current slide
        currentSlide = index;
        
        // Add active to new slide
        slides[currentSlide].classList.add('active');
        
        // Scroll to top of new slide
        slides[currentSlide].scrollTop = 0;
        
        // Update dots
        updateDots();
        
        // Update progress bar
        updateProgress();
        
        // Allow next animation after transition
        setTimeout(() => {
            isAnimating = false;
        }, 400);
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1, 'next');
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1, 'prev');
        }
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function updateProgress() {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    // Dot click navigation
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.section);
            goToSlide(index);
        });
    });
    
    // ============================================
    // Touch/Swipe Navigation
    // ============================================
    
    mainContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    mainContainer.addEventListener('touchmove', (e) => {
        if (isAnimating) return;
        
        touchEndY = e.changedTouches[0].screenY;
        const diff = touchStartY - touchEndY;
        const activeSlide = slides[currentSlide];
        
        // Only show feedback if at scroll boundaries
        const isAtTop = activeSlide.scrollTop === 0;
        const isAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 5;
        
        if (diff > 30 && isAtBottom) {
            activeSlide.classList.add('swiping-up');
        } else if (diff < -30 && isAtTop) {
            activeSlide.classList.add('swiping-down');
        }
    }, { passive: true });
    
    mainContainer.addEventListener('touchend', (e) => {
        if (isAnimating) return;
        
        touchEndY = e.changedTouches[0].screenY;
        const diff = touchStartY - touchEndY;
        const activeSlide = slides[currentSlide];
        
        // Remove swipe feedback
        activeSlide.classList.remove('swiping-up', 'swiping-down');
        
        // Check scroll position
        const isAtTop = activeSlide.scrollTop === 0;
        const isAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 5;
        
        // Swipe up (go to next slide) - only if at bottom of content
        if (diff > 80 && isAtBottom) {
            nextSlide();
        }
        // Swipe down (go to previous slide) - only if at top of content
        else if (diff < -80 && isAtTop) {
            prevSlide();
        }
    }, { passive: true });
    
    // ============================================
    // Keyboard Navigation
    // ============================================
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            prevSlide();
        }
    });
    
    // ============================================
    // Mouse Wheel Navigation (Desktop)
    // ============================================
    
    let wheelTimeout;
    let wheelDelta = 0;
    
    mainContainer.addEventListener('wheel', (e) => {
        if (isAnimating) return;
        
        const activeSlide = slides[currentSlide];
        const isAtTop = activeSlide.scrollTop === 0;
        const isAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 5;
        
        // Accumulate wheel delta
        wheelDelta += e.deltaY;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (Math.abs(wheelDelta) > 100) {
                if (wheelDelta > 0 && isAtBottom) {
                    nextSlide();
                } else if (wheelDelta < 0 && isAtTop) {
                    prevSlide();
                }
            }
            wheelDelta = 0;
        }, 50);
    }, { passive: true });
    
    // ============================================
    // Mobile Menu
    // ============================================
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });
    
    menuLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(link.dataset.section);
            
            // Close menu
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
            
            // Navigate to slide
            goToSlide(index);
        });
    });
    
    // Close menu on outside click (desktop)
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !menuOverlay.contains(e.target)) {
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
        }
    });
    
    // ============================================
    // Card Stack (Contract Section)
    // ============================================
    
    const cardStack = document.querySelector('.card-stack');
    const stackCards = document.querySelectorAll('.stack-card');
    const prevBtn = document.querySelector('.stack-nav-btn.prev');
    const nextBtn = document.querySelector('.stack-nav-btn.next');
    const stackCounter = document.querySelector('.stack-counter');
    
    let currentCard = 0;
    const totalCards = stackCards.length;
    
    function updateCardStack() {
        stackCards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            
            if (index === currentCard) {
                card.classList.add('active');
            } else if (index === currentCard - 1) {
                card.classList.add('prev');
            } else if (index === currentCard + 1) {
                card.classList.add('next');
            }
        });
        
        if (stackCounter) {
            stackCounter.textContent = `${currentCard + 1}/${totalCards}`;
        }
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentCard > 0) {
                currentCard--;
                updateCardStack();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentCard < totalCards - 1) {
                currentCard++;
                updateCardStack();
            }
        });
    }
    
    // Initialize card stack
    updateCardStack();
    
    // Card stack swipe
    if (cardStack) {
        let cardTouchStartX = 0;
        
        cardStack.addEventListener('touchstart', (e) => {
            cardTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        cardStack.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = cardTouchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentCard < totalCards - 1) {
                    currentCard++;
                } else if (diff < 0 && currentCard > 0) {
                    currentCard--;
                }
                updateCardStack();
            }
        }, { passive: true });
    }
    
    // ============================================
    // CTA Button Animation
    // ============================================
    
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Add click animation
            ctaButton.style.transform = 'translate(4px, 4px)';
            ctaButton.style.boxShadow = 'none';
            
            setTimeout(() => {
                ctaButton.style.transform = '';
                ctaButton.style.boxShadow = '';
                
                // Show confirmation or redirect
                alert('Merci pour votre intérêt ! Notre équipe vous contactera bientôt.');
            }, 200);
        });
    }
    
    // ============================================
    // Scroll Indicator Click
    // ============================================
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            nextSlide();
        });
        scrollIndicator.style.cursor = 'pointer';
    }
    
    // ============================================
    // Initialize
    // ============================================
    
    // Set initial state
    slides[0].classList.add('active');
    updateDots();
    updateProgress();
    
    // Preload animations
    slides.forEach(slide => {
        slide.style.willChange = 'transform, opacity';
    });
});
