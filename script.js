document.addEventListener('DOMContentLoaded', function () {
    // Sticky navigation bar effect with debounce
    const navbar = document.querySelector('.top-nav');
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = window.pageYOffset;

            // Toggle sticky class and adjust background opacity
            navbar.classList.toggle('sticky', scrollPosition > 0);
            navbar.style.backgroundColor = `rgba(0, 0, 0, ${scrollPosition > 50 ? 0.8 : 1})`;
        }, 100); // Debounce for better performance
    });

    // Smooth scroll for anchor links with fallback
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const targetElement = document.querySelector(anchor.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView
                    ? targetElement.scrollIntoView({ behavior: 'smooth' })
                    : window.scrollTo(0, targetElement.offsetTop);
            }
        });
    });

    // Mobile hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
    
            navMenu.classList.toggle('active'); // Show/hide menu
            hamburger.classList.toggle('is-active'); // Animate hamburger icon
        });

        // Close mobile menu when a link is clicked
        navMenu.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('is-active');
        });
    } else {
        console.error('Hamburger menu or navigation menu not found in DOM.');
    }

    // Dropdown menu functionality for "Our Team"
    const ourTeamToggle = document.getElementById('ourTeamToggle');
    const ourTeamMenu = document.getElementById('ourTeamMenu');
    const arrow = ourTeamToggle?.querySelector('.arrow');

    if (ourTeamToggle && ourTeamMenu) {
        const expandPanel = () => {
            ourTeamMenu.style.maxHeight = `${ourTeamMenu.scrollHeight}px`;
            ourTeamMenu.classList.add('active');
            arrow?.classList.add('active');
        };

        const collapsePanel = () => {
            ourTeamMenu.style.maxHeight = null;
            ourTeamMenu.classList.remove('active');
            arrow?.classList.remove('active');
        };

        // Desktop: Show/hide dropdown on hover
        ['mouseover', 'focus'].forEach(eventType => {
            ourTeamToggle.addEventListener(eventType, expandPanel);
        });

        ['mouseout', 'blur'].forEach(eventType => {
            ourTeamToggle.addEventListener(eventType, collapsePanel);
        });

        // Mobile: Toggle dropdown on click
        ourTeamToggle.addEventListener('click', e => {
            e.preventDefault();
            const isActive = ourTeamMenu.classList.contains('active');
            isActive ? collapsePanel() : expandPanel();
        });

        // Close "Our Team" dropdown if clicking outside
        document.addEventListener('click', e => {
            if (!ourTeamToggle.contains(e.target) && !ourTeamMenu.contains(e.target)) {
                collapsePanel();
            }
        });
    } else {
        console.warn('Our Team dropdown menu or toggle button not found in DOM.');
    }

    // General dropdown functionality for other dropdowns
    
    const toggleDropdown = (toggleButton, dropdownMenu, arrow) => {
        const isActive = dropdownMenu.classList.contains('active');
        if (isActive) {
            dropdownMenu.style.maxHeight = null;
            dropdownMenu.classList.remove('active');
            arrow?.classList.remove('active');
        } else {
            dropdownMenu.style.maxHeight = `${dropdownMenu.scrollHeight}px`;
            dropdownMenu.classList.add('active');
            arrow?.classList.add('active');
        }
    };

    document.querySelectorAll('.dropdown-toggle').forEach(toggleButton => {
    
        const dropdownMenu = toggleButton.nextElementSibling;

        toggleButton.addEventListener('click', e => {
            e.preventDefault();
            const isActive = dropdownMenu.classList.contains('active');

            if (isActive) {
                dropdownMenu.style.maxHeight = null;
                dropdownMenu.classList.remove('active');
            } else {
                // Close other open dropdowns
                document.querySelectorAll('.dropdown-content.active').forEach(menu => {
                    menu.style.maxHeight = null;
                    menu.classList.remove('active');
                });

                dropdownMenu.style.maxHeight = `${dropdownMenu.scrollHeight}px`;
                dropdownMenu.classList.add('active');
            }

            // Update ARIA attributes for accessibility
            toggleButton.setAttribute('aria-expanded', dropdownMenu.classList.contains('active'));
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', e => {
        document.querySelectorAll('.dropdown-content.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.style.maxHeight = null;
                menu.classList.remove('active');
            }
        });
    });

    // Mobile dropdown functionality
    document.querySelectorAll('#nav-menu .dropdown-toggle').forEach(toggleButton => {
        const dropdownMenu = toggleButton.nextElementSibling;
        const arrow = toggleButton.querySelector('.arrow');

        toggleButton.addEventListener('click', e => {
            e.preventDefault();

            const isActive = dropdownMenu.classList.contains('active');
            if (isActive) {
                dropdownMenu.style.maxHeight = null;
                dropdownMenu.classList.remove('active');
                arrow?.classList.remove('active');
            } else {
                navMenu.querySelectorAll('.dropdown-content.active').forEach(menu => {
                    menu.style.maxHeight = null;
                    menu.classList.remove('active');
                    menu.previousElementSibling.querySelector('.arrow')?.classList.remove('active');
                });

                dropdownMenu.style.maxHeight = `${dropdownMenu.scrollHeight}px`;
                dropdownMenu.classList.add('active');
                arrow?.classList.add('active');
            }

            // Update ARIA attributes
            toggleButton.setAttribute('aria-expanded', dropdownMenu.classList.contains('active'));
        });
    });
});

