/**
 * Softappix Portfolio Website - JavaScript
 * Handles dynamic functionality including:
 * - Case studies loading from JSON
 * - Smooth scrolling navigation
 * - Navbar effects
 * - Mobile menu toggle
 * - Form handling
 * - Animations
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const caseStudiesContainer = document.getElementById('caseStudiesContainer');
const contactForm = document.getElementById('contactForm');

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    loadCaseStudies();
    initFormHandling();
    initScrollAnimations();
});

// ============================================
// Navbar Effects
// ============================================
function initNavbar() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ============================================
// Smooth Scrolling
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Case Studies Data (Embedded for local file access)
// ============================================
const caseStudiesData = {
  "caseStudies": [
    {
      "id": 1,
      "company": "Alacrity Enterprises",
      "hook": "Building a High-Performance Digital Identity",
      "challenge": "Establishing a professional, fast-loading web presence to capture leads and showcase service reliability.",
      "solution": "Leveraged a React + Vite architecture to ensure sub-second load times and a 'mobile-first' responsive design.",
      "keyFeature": "Custom-integrated business email systems and a high-conversion hero section designed for immediate user engagement.",
      "techUsed": ["React", "Vite", "Tailwind CSS", "Custom Domain/Email Configuration"],
      "outcome": "Established a professional digital identity and streamlined lead generation.",
      "tag": "Web Development"
    },
    {
      "id": 2,
      "company": "Global Tech Industries",
      "hook": "Scalable Infrastructure and Corporate Web Design",
      "challenge": "Creating a robust, scalable platform that reflects a global tech standard while maintaining ease of management.",
      "solution": "Focused on domain strategy and architectural setup. Built a clean, modern UI that aligns with international tech aesthetics.",
      "keyFeature": "Optimized DNS management and SEO-ready site structure to ensure the brand is discoverable across global markets.",
      "techUsed": ["Web Architecture", "DNS Management", "SEO Optimization", "Python-based Logic"],
      "outcome": "Improved global visibility with a scalable, maintainable digital presence.",
      "tag": "Digital Strategy"
    }
  ]
};

// ============================================
// Load Case Studies
// ============================================
function loadCaseStudies() {
    if (!caseStudiesContainer) return;
    
    try {
        const data = caseStudiesData;
        
        if (data.caseStudies && data.caseStudies.length > 0) {
            renderCaseStudies(data.caseStudies);
        } else {
            caseStudiesContainer.innerHTML = '<p class="no-data">No case studies available yet.</p>';
        }
        
    } catch (error) {
        console.error('Error loading case studies:', error);
        caseStudiesContainer.innerHTML = '<p class="no-data">Unable to load case studies. Please try again later.</p>';
    }
}

function renderCaseStudies(caseStudies) {
    caseStudiesContainer.innerHTML = caseStudies.map(study => `
        <article class="case-card">
            <div class="case-header">
                <span class="case-tag">${study.tag}</span>
                <h3 class="case-hook">${study.hook}</h3>
                <p class="case-company">${study.company}</p>
            </div>
            <div class="case-body" style="padding-top: 16px; border-top: 1px solid var(--border-light); margin-top: 16px;">
                <p class="case-section-content" style="margin-bottom: 24px; color: var(--text-secondary);">${study.outcome}</p>
                <div class="case-tech">
                    ${study.techUsed.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');
}

// ============================================
// Form Handling
// ============================================
function initFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Validate
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send to Web3Forms via AJAX
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            showFormSuccess(data);
            contactForm.reset();
        } else {
            console.error('Web3Forms Error:', json);
            alert(json.message || 'There was an error sending your message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function validateForm(data) {
    // Basic validation
    if (!data.name || data.name.trim().length < 2) {
        alert('Please enter your name');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!data.projectType) {
        alert('Please select a project type');
        return false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        alert('Please provide more details about your project');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormSuccess(data) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <h3>Message Sent!</h3>
            <p>Thank you, ${data.name}! We'll get back to you soon.</p>
        </div>
    `;
    
    // Insert success message
    contactForm.insertAdjacentElement('beforebegin', successMessage);
    
    // Add styles for success message
    successMessage.style.cssText = `
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 20px;
        text-align: center;
    `;
    
    const successContent = successMessage.querySelector('.success-content');
    successContent.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    `;
    
    const successIcon = successMessage.querySelector('.success-icon');
    successIcon.style.cssText = `
        width: 48px;
        height: 48px;
        background: rgba(16, 185, 129, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #10b981;
    `;
    
    const successH3 = successMessage.querySelector('h3');
    successH3.style.cssText = `
        font-size: 1.25rem;
        font-weight: 700;
        color: #10b981;
        margin: 0;
    `;
    
    const successP = successMessage.querySelector('p');
    successP.style.cssText = `
        color: #94a3b8;
        margin: 0;
    `;
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.service-card, .case-card, .tech-category, .about-card, .local-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.animate-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
    
    // Trigger initial check
    setTimeout(() => {
        document.querySelectorAll('.animate-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadCaseStudies,
        initNavbar,
        initMobileMenu
    };
}

