/**
 * main.js - Initial D Drift Zone Interactivity
 * Minimal, modular script for handling UX behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth scrolling for internal anchors
    const setupSmoothScroll = () => {
        const anchors = document.querySelectorAll('a[href^="#"]');
        
        anchors.forEach(anchor => {
            anchor.addEventListener('click', (event) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return; // Skip top dummy links
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    
                    // Smoothly scroll to the target section
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Set focus on target element for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus({ preventScroll: true });
                }
            });
        });
    };

    // 2. Pause animations on Hero Section hover (prevents motion distraction while reading text)
    const setupAnimationControl = () => {
        const heroSection = document.querySelector('#hero-header');
        const heroBg = document.querySelector('#hero-bg-parallax');
        const heroCar = document.querySelector('#hero-car-sprite');
        
        if (!heroSection || !heroBg || !heroCar) {
            console.warn('Animation control targets not found.');
            return;
        }

        // Toggle play state to paused
        const pauseAnimations = () => {
            heroBg.style.animationPlayState = 'paused';
            heroCar.style.animationPlayState = 'paused';
        };

        // Toggle play state to running
        const playAnimations = () => {
            heroBg.style.animationPlayState = 'running';
            heroCar.style.animationPlayState = 'running';
        };

        heroSection.addEventListener('mouseenter', pauseAnimations);
        heroSection.addEventListener('mouseleave', playAnimations);
        
        // Touch events fallback for mobile (pause on touch start, play after delay)
        let touchTimeout;
        heroSection.addEventListener('touchstart', () => {
            pauseAnimations();
            clearTimeout(touchTimeout);
        }, { passive: true });
        
        heroSection.addEventListener('touchend', () => {
            touchTimeout = setTimeout(playAnimations, 2000);
        }, { passive: true });
    };

    // Initialize behaviors
    setupSmoothScroll();
    setupAnimationControl();
});
