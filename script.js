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
        initRevealAnimations();
        
        // Set initial state
        screens[0].classList.add('active');
        updateProgressDots();
        
        // Trigger initial reveals after splash
        setTimeout(() => {
            triggerReveals(0);
        }, 1500);
        
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
        
        // Trigger reveal animations on new screen
        triggerReveals(index);
        
        // Clean up after animation
        const animationDuration = 350;
        setTimeout(() => {
            currentEl.classList.remove('exit-left');
            state.isAnimating = false;
            
            // Reset reveals on previous screen for next visit
            resetReveals(previousScreen);
            
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
    // Reveal Animations
    // ============================================
    function initRevealAnimations() {
        // Add reveal classes to elements in each screen
        screens.forEach((screen, screenIndex) => {
            // Skip welcome screen (has its own CSS animations)
            if (screenIndex === 0) return;
            
            const revealConfigs = [
                { selector: '.menu-card', type: 'reveal', stagger: true },
                { selector: '.bento-card', type: 'reveal-pop', stagger: true },
                { selector: '.info-box', type: 'reveal', stagger: false },
                { selector: '.highlight-box', type: 'reveal-scale', stagger: false },
                { selector: '.zone-card', type: 'reveal', stagger: true },
                { selector: '.stat-box', type: 'reveal-pop', stagger: true },
                { selector: '.timeline-item', type: 'reveal', stagger: true },
                { selector: '.excl-item', type: 'reveal', stagger: true },
                { selector: '.warning-box', type: 'reveal-scale', stagger: false },
                { selector: '.alert-box', type: 'reveal', stagger: false },
                { selector: '.investment-card', type: 'reveal-scale', stagger: false },
                { selector: '.redevance-box', type: 'reveal-pop', stagger: true },
                { selector: '.obj-box', type: 'reveal-pop', stagger: true },
                { selector: '.principle-card', type: 'reveal', stagger: true },
                { selector: '.certification-badge', type: 'reveal', stagger: false },
                { selector: '.convention-box', type: 'reveal-scale', stagger: false },
                { selector: '.team-role', type: 'reveal', stagger: true },
                { selector: '.cta-section', type: 'reveal-scale', stagger: false },
                { selector: '.card-carousel', type: 'reveal', stagger: false },
            ];
            
            revealConfigs.forEach(config => {
                const elements = screen.querySelectorAll(config.selector);
                elements.forEach((el, i) => {
                    el.classList.add(config.type);
                    if (config.stagger && i < 8) {
                        el.classList.add(`reveal-delay-${i + 1}`);
                    }
                });
            });
        });
    }
    
    function triggerReveals(screenIndex) {
        const screen = screens[screenIndex];
        if (!screen) return;
        
        // Small delay to let the screen transition start
        setTimeout(() => {
            const revealElements = screen.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-pop, .reveal-fade');
            revealElements.forEach(el => {
                el.classList.add('revealed');
            });
        }, 100);
    }
    
    function resetReveals(screenIndex) {
        const screen = screens[screenIndex];
        if (!screen) return;
        
        const revealElements = screen.querySelectorAll('.revealed');
        revealElements.forEach(el => {
            el.classList.remove('revealed');
        });
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
    // Contract Modals
    // ============================================
    function initContractModals() {
        const contractPreviews = document.querySelectorAll('.contract-preview');
        const modals = {
            france: document.getElementById('contractModalFrance'),
            international: document.getElementById('contractModalInternational')
        };
        
        // Open modal on preview click
        contractPreviews.forEach(preview => {
            preview.addEventListener('click', () => {
                const contractType = preview.dataset.contract;
                const modal = modals[contractType];
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    hapticFeedback();
                }
            });
        });
        
        // Close modal handlers
        Object.values(modals).forEach(modal => {
            if (!modal) return;
            
            // Close button
            const closeBtn = modal.querySelector('.modal-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
            
            // Click outside to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Download button feedback
            const downloadBtn = modal.querySelector('.btn-download');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', () => {
                    downloadBtn.textContent = '✅ Téléchargement simulé !';
                    downloadBtn.style.background = '#4CAF50';
                    downloadBtn.style.color = 'white';
                    hapticFeedback();
                    
                    setTimeout(() => {
                        downloadBtn.textContent = '📥 Télécharger le modèle PDF';
                        downloadBtn.style.background = '';
                        downloadBtn.style.color = '';
                    }, 2000);
                });
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                Object.values(modals).forEach(modal => {
                    if (modal && modal.classList.contains('active')) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    }
    
    // Initialize contract modals
    initContractModals();
    
    // ============================================
    // Burgerbot Chatbot
    // ============================================
    function initChatbot() {
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const chatSendBtn = document.getElementById('chatSendBtn');
        const quickReplies = document.getElementById('quickReplies');
        const chatContainer = document.getElementById('chatContainer');
        
        if (!chatMessages || !chatInput) return;
        
        let conversationStep = 0;
        let userName = '';
        let userCity = '';
        let hasExperience = null;
        
        const botResponses = {
            welcome: [
                "Bonjour ! 👋 Je suis Burgerbot, votre assistant expert en franchise Burger House.",
                "Je suis là pour répondre à toutes vos questions et vous accompagner dans votre projet. Pour commencer, comment vous appelez-vous ?"
            ],
            afterName: (name) => [
                `Enchanté ${name} ! 🍔`,
                "C'est super de vous avoir ici. Dans quelle ville ou région souhaitez-vous ouvrir votre franchise ?"
            ],
            afterCity: (city) => [
                `${city}, excellent choix ! C'est une zone avec un bon potentiel.`,
                "Avez-vous déjà une expérience dans la restauration ?"
            ],
            withExperience: [
                "Parfait ! Votre expérience sera un vrai atout. 💪",
                "Notre formation de 4 semaines sera adaptée à votre profil pour renforcer vos compétences sur les spécificités Burger House."
            ],
            withoutExperience: [
                "Pas de souci ! 76% de nos franchisés n'avaient aucune expérience avant de nous rejoindre. 🎓",
                "Notre formation complète de 4 semaines vous donnera toutes les clés pour réussir."
            ],
            investment: [
                "💰 L'investissement total se situe entre 200 000€ et 300 000€, incluant :",
                "• Droit d'entrée : 25 000 - 35 000€\n• Travaux : 80 000 - 120 000€\n• Équipements : 60 000 - 80 000€\n• Fonds de roulement : 35 000 - 65 000€"
            ],
            redevances: [
                "📊 Les redevances sont très compétitives :",
                "• 5% du CA HT pour l'exploitation\n• 2% du CA HT pour la communication\n\nEn contrepartie, vous bénéficiez d'un accompagnement permanent et de la force du réseau !"
            ],
            formation: [
                "🎓 La formation dure 4 semaines et couvre :",
                "• Semaine 1 : Immersion dans l'univers Burger House\n• Semaine 2 : Maîtrise culinaire et recettes\n• Semaine 3 : Service client et hygiène HACCP\n• Semaine 4 : Management et gestion\n\nEt après l'ouverture, un formateur reste 2 semaines avec vous !"
            ],
            exclusivite: [
                "🛡️ L'exclusivité territoriale est un point clé de notre contrat.",
                "Vous bénéficiez d'une zone protégée où aucun autre Burger House ne pourra s'implanter. La délimitation se fait selon la zone de chalandise, généralement 3-5 km en zone urbaine."
            ],
            contrat: [
                "📋 Le contrat de franchise a une durée de 5 ans en France (7 ans à l'international), renouvelable.",
                "Il est encadré par la loi Doubin qui vous protège : vous recevrez le DIP (Document d'Information Précontractuelle) 20 jours avant la signature."
            ],
            rentabilite: [
                "📈 Nos objectifs de rentabilité :",
                "• CA mensuel : 80 000 - 120 000€\n• Ticket moyen : 15-18€\n• Rentabilité nette : 12-18%\n• Seuil de rentabilité : 12-18 mois\n\nBien sûr, cela dépend de l'emplacement et de votre engagement !"
            ],
            nextSteps: [
                "🚀 Pour démarrer votre projet, voici les prochaines étapes :",
                "1. Candidature et entretien\n2. Validation par le comité\n3. Formation 4 semaines\n4. Recherche du local\n5. Travaux d'aménagement\n6. Ouverture avec accompagnement\n\nVoulez-vous qu'on planifie un premier entretien ?"
            ],
            entretien: [
                "Parfait ! 🎉 Notre équipe développement va vous contacter très rapidement.",
                "En attendant, n'hésitez pas à consulter les autres sections du manuel pour vous familiariser avec notre concept. Avez-vous d'autres questions ?"
            ],
            default: [
                "Je comprends votre question ! 🤔",
                "Pour une réponse plus précise, je vous invite à contacter notre équipe développement qui pourra vous accompagner personnellement. Avez-vous d'autres questions sur la franchise ?"
            ],
            thanks: [
                `Merci ${userName || 'à vous'} ! 😊`,
                "C'était un plaisir d'échanger. N'hésitez pas à revenir si vous avez d'autres questions. Bonne continuation dans votre projet ! 🍔"
            ]
        };
        
        const quickReplyOptions = {
            initial: [
                { text: "💰 Investissement", action: "investment" },
                { text: "🎓 Formation", action: "formation" },
                { text: "📋 Contrat", action: "contrat" },
                { text: "📈 Rentabilité", action: "rentabilite" }
            ],
            afterInfo: [
                { text: "🛡️ Exclusivité", action: "exclusivite" },
                { text: "💵 Redevances", action: "redevances" },
                { text: "🚀 Prochaines étapes", action: "nextSteps" },
                { text: "Merci !", action: "thanks" }
            ],
            experience: [
                { text: "✅ Oui, j'ai de l'expérience", action: "hasExperience" },
                { text: "❌ Non, je débute", action: "noExperience" }
            ],
            entretien: [
                { text: "Oui, planifions !", action: "entretien" },
                { text: "J'ai d'autres questions", action: "moreQuestions" }
            ]
        };
        
        function addMessage(content, isBot = true, delay = 0) {
            return new Promise(resolve => {
                setTimeout(() => {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = `chat-message ${isBot ? 'bot' : 'user'}`;
                    messageDiv.innerHTML = `
                        <div class="message-avatar">${isBot ? '🍔' : '👤'}</div>
                        <div class="message-content">
                            <p>${content.replace(/\n/g, '<br>')}</p>
                        </div>
                    `;
                    chatMessages.appendChild(messageDiv);
                    scrollToBottom();
                    resolve();
                }, delay);
            });
        }
        
        function addTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message bot';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="message-avatar">🍔</div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            scrollToBottom();
        }
        
        function removeTypingIndicator() {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) indicator.remove();
        }
        
        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function showQuickReplies(options) {
            quickReplies.innerHTML = '';
            options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.textContent = option.text;
                btn.onclick = () => handleQuickReply(option);
                quickReplies.appendChild(btn);
            });
        }
        
        function hideQuickReplies() {
            quickReplies.innerHTML = '';
        }
        
        async function sendBotMessages(messages, afterOptions = null) {
            addTypingIndicator();
            await new Promise(r => setTimeout(r, 800));
            removeTypingIndicator();
            
            for (let i = 0; i < messages.length; i++) {
                await addMessage(messages[i], true, i * 600);
            }
            
            if (afterOptions) {
                setTimeout(() => showQuickReplies(afterOptions), messages.length * 600 + 300);
            }
        }
        
        async function handleUserMessage(text) {
            await addMessage(text, false);
            hideQuickReplies();
            
            const lowerText = text.toLowerCase();
            
            // Check for keywords
            if (lowerText.includes('investissement') || lowerText.includes('coût') || lowerText.includes('prix') || lowerText.includes('budget')) {
                await sendBotMessages(botResponses.investment, quickReplyOptions.afterInfo);
                return;
            }
            if (lowerText.includes('formation') || lowerText.includes('apprendre')) {
                await sendBotMessages(botResponses.formation, quickReplyOptions.afterInfo);
                return;
            }
            if (lowerText.includes('contrat') || lowerText.includes('juridique') || lowerText.includes('doubin')) {
                await sendBotMessages(botResponses.contrat, quickReplyOptions.afterInfo);
                return;
            }
            if (lowerText.includes('rentab') || lowerText.includes('chiffre') || lowerText.includes('ca ') || lowerText.includes('objectif')) {
                await sendBotMessages(botResponses.rentabilite, quickReplyOptions.afterInfo);
                return;
            }
            if (lowerText.includes('exclusiv') || lowerText.includes('territoire') || lowerText.includes('zone')) {
                await sendBotMessages(botResponses.exclusivite, quickReplyOptions.afterInfo);
                return;
            }
            if (lowerText.includes('redevance') || lowerText.includes('royalt') || lowerText.includes('pourcentage')) {
                await sendBotMessages(botResponses.redevances, quickReplyOptions.afterInfo);
                return;
            }
            if (lowerText.includes('étape') || lowerText.includes('processus') || lowerText.includes('comment') || lowerText.includes('démarrer')) {
                await sendBotMessages(botResponses.nextSteps, quickReplyOptions.entretien);
                return;
            }
            if (lowerText.includes('merci') || lowerText.includes('super') || lowerText.includes('génial')) {
                await sendBotMessages(botResponses.thanks, []);
                return;
            }
            
            // Conversation flow
            if (conversationStep === 0) {
                // User just said their name
                userName = text.split(' ')[0];
                userName = userName.charAt(0).toUpperCase() + userName.slice(1);
                conversationStep = 1;
                await sendBotMessages(botResponses.afterName(userName), []);
                return;
            }
            
            if (conversationStep === 1) {
                // User said their city
                userCity = text;
                conversationStep = 2;
                await sendBotMessages(botResponses.afterCity(userCity), quickReplyOptions.experience);
                return;
            }
            
            // Default response
            await sendBotMessages(botResponses.default, quickReplyOptions.initial);
        }
        
        async function handleQuickReply(option) {
            await addMessage(option.text, false);
            hideQuickReplies();
            
            switch (option.action) {
                case 'investment':
                    await sendBotMessages(botResponses.investment, quickReplyOptions.afterInfo);
                    break;
                case 'formation':
                    await sendBotMessages(botResponses.formation, quickReplyOptions.afterInfo);
                    break;
                case 'contrat':
                    await sendBotMessages(botResponses.contrat, quickReplyOptions.afterInfo);
                    break;
                case 'rentabilite':
                    await sendBotMessages(botResponses.rentabilite, quickReplyOptions.afterInfo);
                    break;
                case 'exclusivite':
                    await sendBotMessages(botResponses.exclusivite, quickReplyOptions.afterInfo);
                    break;
                case 'redevances':
                    await sendBotMessages(botResponses.redevances, quickReplyOptions.afterInfo);
                    break;
                case 'nextSteps':
                    await sendBotMessages(botResponses.nextSteps, quickReplyOptions.entretien);
                    break;
                case 'entretien':
                    await sendBotMessages(botResponses.entretien, quickReplyOptions.initial);
                    break;
                case 'moreQuestions':
                    await sendBotMessages(["Bien sûr ! Que voulez-vous savoir ?"], quickReplyOptions.initial);
                    break;
                case 'hasExperience':
                    hasExperience = true;
                    conversationStep = 3;
                    await sendBotMessages(botResponses.withExperience, quickReplyOptions.initial);
                    break;
                case 'noExperience':
                    hasExperience = false;
                    conversationStep = 3;
                    await sendBotMessages(botResponses.withoutExperience, quickReplyOptions.initial);
                    break;
                case 'thanks':
                    await sendBotMessages(botResponses.thanks, []);
                    break;
                default:
                    await sendBotMessages(botResponses.default, quickReplyOptions.initial);
            }
        }
        
        function handleSend() {
            const text = chatInput.value.trim();
            if (!text) return;
            
            chatInput.value = '';
            handleUserMessage(text);
        }
        
        // Event listeners
        chatSendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });
        
        // Start conversation when section becomes active
        let chatStarted = false;
        const chatbotScreen = document.querySelector('[data-index="9"]');
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('active') && !chatStarted) {
                    chatStarted = true;
                    setTimeout(() => {
                        sendBotMessages(botResponses.welcome, []);
                    }, 500);
                }
            });
        });
        
        if (chatbotScreen) {
            observer.observe(chatbotScreen, { attributes: true, attributeFilter: ['class'] });
        }
    }
    
    // Initialize chatbot
    initChatbot();
    
    // ============================================
    // Expose API for debugging
    // ============================================
    window.BurgerHouseApp = {
        goToScreen,
        getState: () => ({ ...state }),
        version: '3.0'
    };
    
})();
