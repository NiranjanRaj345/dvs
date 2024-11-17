document.addEventListener('DOMContentLoaded', function () {
    // Sticky navigation bar effect
    const navbar = document.querySelector('.top-nav');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        // Toggle sticky class and adjust background opacity
        navbar.classList.toggle('sticky', scrollPosition > 0);
        navbar.style.backgroundColor = `rgba(0, 0, 0, ${scrollPosition > 50 ? 0.8 : 1})`;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const targetElement = document.querySelector(anchor.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Show/hide menu
            hamburger.classList.toggle('is-active'); // Animate hamburger icon
        });
    } else {
        console.error('Hamburger menu or navigation menu not found in DOM.');
    }

    // Dropdown menu functionality for "Our Team"
    const ourTeamToggle = document.getElementById('ourTeamToggle');
    const ourTeamMenu = document.getElementById('ourTeamMenu');
    const arrow = ourTeamToggle?.querySelector('.arrow');

    if (ourTeamToggle && ourTeamMenu) {
        const showDropdown = () => {
            ourTeamMenu.classList.add('active');
            arrow?.classList.add('active');
        };
        const hideDropdown = () => {
            ourTeamMenu.classList.remove('active');
            arrow?.classList.remove('active');
        };

        // Desktop: Show/hide dropdown on hover
        ['mouseover', 'focus'].forEach(eventType => ourTeamToggle.addEventListener(eventType, showDropdown));
        ['mouseout', 'blur'].forEach(eventType => ourTeamToggle.addEventListener(eventType, hideDropdown));

        // Mobile: Toggle dropdown on click
        ourTeamToggle.addEventListener('click', e => {
            e.preventDefault();

            // Close all other dropdowns before toggling current
            document.querySelectorAll('.dropdown-content.active').forEach(menu => {
                if (menu !== ourTeamMenu) {
                    menu.classList.remove('active');
                }
            });

            // Toggle current dropdown
            ourTeamMenu.classList.toggle('active');
            arrow?.classList.toggle('active');
        });

        // Close "Our Team" dropdown if clicking outside
        document.addEventListener('click', e => {
            if (!ourTeamToggle.contains(e.target) && !ourTeamMenu.contains(e.target)) {
                hideDropdown();
            }
        });
    } else {
        console.warn('Our Team dropdown menu or toggle button not found in DOM.');
    }

    // General dropdown functionality for other dropdowns
    document.querySelectorAll('.dropdown-toggle').forEach(toggleButton => {
        toggleButton.addEventListener('click', e => {
            e.preventDefault();
            const dropdownMenu = toggleButton.nextElementSibling;

            // Close other open dropdowns before toggling current
            document.querySelectorAll('.dropdown-content.active').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('active');
                }
            });

            // Toggle the current dropdown
            dropdownMenu?.classList.toggle('active');
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', e => {
        document.querySelectorAll('.dropdown-content.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    });

    // Disable dropdown functionality in mobile view and make links straightforward
    const checkMobileView = () => {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.classList.remove('active'); // Close dropdowns on mobile
            });
            document.querySelectorAll('.dropdown-toggle').forEach(toggleButton => {
                toggleButton.removeEventListener('click', toggleDropdownHandler);
                toggleButton.href = '#'; // Make sure it acts like a regular link
            });
        }
    };

    const toggleDropdownHandler = e => {
        e.preventDefault();
        const dropdownMenu = e.target.nextElementSibling;

        // Close other open dropdowns before toggling current
        document.querySelectorAll('.dropdown-content.active').forEach(menu => {
            if (menu !== dropdownMenu) {
                menu.classList.remove('active');
            }
        });

        // Toggle the current dropdown
        dropdownMenu?.classList.toggle('active');
    };

    // Ensure proper behavior on window resize
    window.addEventListener('resize', checkMobileView);
    checkMobileView(); // Initial check
});
