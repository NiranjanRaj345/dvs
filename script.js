document.addEventListener('DOMContentLoaded', function () {
    // Debounce Function for Improved Performance
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    // Throttle Function for Improved Performance
    const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return (...args) => {
            const context = this;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    };

    // Sticky Navigation Bar with Dynamic Opacity
    const navbar = document.querySelector('.top-nav');
    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        navbar.classList.toggle('sticky', scrollPosition > 0);
        navbar.style.backgroundColor = `rgba(0, 0, 0, ${scrollPosition > 50 ? 0.8 : 1})`;
    };
    window.addEventListener('scroll', throttle(handleScroll, 100));

    // Smooth Scrolling for Anchor Links with Offset for Sticky Navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const offset = 70; // Adjust this value based on navbar height
            const targetElement = document.querySelector(anchor.getAttribute('href'));
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Hamburger Menu for Mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Show/hide the menu
            hamburger.classList.toggle('is-active'); // Animate the hamburger icon
        });

        // Close menu when clicking a link
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                hamburger.classList.remove('is-active');
            }
        });
    } else {
        console.error('Hamburger menu or navigation menu not found.');
    }

    // Dropdown Menu Functionality
    const toggleDropdown = (toggleButton, dropdownMenu, arrow = null) => {
        const isActive = dropdownMenu.classList.contains('active');
        dropdownMenu.style.maxHeight = isActive ? null : `${dropdownMenu.scrollHeight}px`;
        dropdownMenu.classList.toggle('active', !isActive);
        arrow?.classList.toggle('active', !isActive);
        toggleButton.setAttribute('aria-expanded', !isActive);
    };

    // Dropdown Toggle Listeners
    document.querySelectorAll('.dropdown-toggle').forEach(toggleButton => {
        const dropdownMenu = toggleButton.nextElementSibling;
        const arrow = toggleButton.querySelector('.arrow');

        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = dropdownMenu.classList.contains('active');

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-content.active').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.style.maxHeight = null;
                    menu.classList.remove('active');
                }
            });

            // Toggle the current dropdown
            toggleDropdown(toggleButton, dropdownMenu, arrow);
        });
    });

    // Close All Dropdowns When Clicking Outside
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.dropdown-content.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                const toggleButton = menu.previousElementSibling;
                const arrow = toggleButton.querySelector('.arrow');
                toggleDropdown(toggleButton, menu, arrow);
            }
        });
    });

    // Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    document.body.appendChild(progressBar);

    const updateProgressBar = () => {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercent = (scrollPosition / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', throttle(updateProgressBar, 50));
});
