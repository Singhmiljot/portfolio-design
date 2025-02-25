document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const nav = document.querySelector('.top-nav');
    const backToTopButton = document.querySelector('.back-to-top');
    const viewResumeBtn = document.getElementById('view-resume-btn');
    const titleElement = document.querySelector('#home h1');
    const homeSection = document.getElementById('home');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
  
    // Scroll tracking variables
    let lastScrollTop = 0;
    let scrollTimeout;
    let isScrolling = false;
  
    // Navigation scroll handling with debouncing
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Don't hide nav if at the very top of the page
        if (currentScrollTop <= 50) {
            nav.classList.remove('nav-hidden');
            return;
        }
  
        // Determine scroll direction
        if (currentScrollTop > lastScrollTop) {
            // Scrolling DOWN
            nav.classList.add('nav-hidden');
        } else {
            // Scrolling UP
            nav.classList.remove('nav-hidden');
        }
  
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  
        // Clear the existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
  
        // Set a timeout to hide the nav after scrolling stops
        scrollTimeout = setTimeout(() => {
            if (currentScrollTop > 50) { // Don't hide if at top of page
                nav.classList.add('nav-hidden');
            }
        }, 1500); // Adjust this value to change how long the nav stays visible after scrolling
    }
  
    // Mouse movement handling for nav
    function handleMouseMove(e) {
        if (e.clientY <= 60) { // Increased detection area slightly
            nav.classList.remove('nav-hidden');
        } else if (e.clientY > 150) { // Hide nav when mouse moves away
            if (!isScrolling && window.pageYOffset > 50) {
                nav.classList.add('nav-hidden');
            }
        }
    }
  
    // Smooth scroll functionality
    function smoothScroll(e) {
        e.preventDefault();
        nav.classList.remove('nav-hidden');
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setTimeout(() => {
                if (window.pageYOffset > 50) {
                    nav.classList.add('nav-hidden');
                }
            }, 1000);
        }
    }
  
    // Modal setup function
    function setupModal(buttonId, modalId, closeId) {
        const button = document.getElementById(buttonId);
        const modal = document.getElementById(modalId);
        const close = document.getElementById(closeId);
  
        console.log('Setting up modal:', { buttonId, modalId, closeId });
        console.log('Elements found:', { button, modal, close });
  
        if (button && modal && close) {
            button.onclick = function() {
                modal.style.display = "block";
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
  
            close.onclick = function() {
                modal.style.display = "none";
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
  
            // Close modal when clicking outside
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    document.body.style.overflow = 'auto';
                }
            }
        } else {
            console.error('Modal setup failed:', buttonId);
        }
    }
  
    // Typing effect function
    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1), 100);
        }
    }
  
    // Mobile layout handling
    function handleMobileLayout(e) {
        if (e.matches) {
            // Mobile layout adjustments
            console.log('Mobile layout applied');
        } else {
            // Desktop layout adjustments
            console.log('Desktop layout applied');
        }
    }
  
    // Event Listeners
    window.addEventListener('scroll', () => {
        isScrolling = true;
        handleScroll();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            if (window.pageYOffset > 50) {
                nav.classList.add('nav-hidden');
            }
        }, 150);
    }, false);
  
    document.addEventListener('mousemove', handleMouseMove);
  
    // Mobile menu toggle with nav visibility handling
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('active');
        nav.classList.remove('nav-hidden'); // Always show nav when menu is toggled
    });
  
    // Resume button event listener
    // Replace the existing resume button event listener with this:
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', function() {
        // Using window.location.href to get the base URL
        const baseUrl = window.location.href.split('/').slice(0, -1).join('/');
        // Construct the full path to the PDF
        const pdfPath = `${baseUrl}/Miljot_Singh_Gambhir.pdf`;
        
        // Open in new tab with specific features
        window.open(pdfPath, '_blank', 'noopener,noreferrer');
        
        // Prevent default behavior
        return false;
    });
  }
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
  
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        nav.classList.remove('nav-hidden');
    });
  
    // Initialize everything
    // Setup modals
    setupModal('learn-more-btn-about', 'about-modal', 'close-about');
    setupModal('learn-more-btn-bachelor', 'education-modal', 'close-bachelor');
    setupModal('learn-more-btn-master', 'education-modal-2', 'close-master');
  
    // Initialize typing effect
    const titleText = titleElement.textContent;
    titleElement.textContent = '';
    typeWriter(titleElement, titleText);
  
    // Initialize mobile layout
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    mobileQuery.addListener(handleMobileLayout);
    handleMobileLayout(mobileQuery);
  
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }
  });
  
  // Global function for going back
  function goBack() {
    window.history.back();
  }