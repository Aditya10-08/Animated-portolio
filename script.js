
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        body.dataset.theme = savedTheme;
        const icon = themeToggle.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

        themeToggle.addEventListener('click', () => {
            const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
            body.dataset.theme = newTheme;
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('theme', newTheme);
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I\'ll get back to you soon.');
            e.target.reset();
        });

        // Header background on scroll
         // Navbar scroll effect
        const header = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Active link highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinksContainer = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            menuToggle.innerHTML = navLinksContainer.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinksContainer.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });

        // Responsive navbar
        function handleResponsiveNav() {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = 'block';
                navLinksContainer.classList.remove('active');
            } else {
                menuToggle.style.display = 'none';
                navLinksContainer.classList.add('active');
            }
        }

        window.addEventListener('resize', handleResponsiveNav);
        handleResponsiveNav();

        // Custom cursor
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Cursor effects on interactive elements
        // Smoother cursor logic (replace your existing cursor JS)
  document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    let followerSpeed = 0.15;

    // Improved animation loop using requestAnimationFrame
    function animate() {
      // Leader cursor (instant)
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      
      // Follower cursor (smooth delayed movement)
      posX += (mouseX - posX) * followerSpeed;
      posY += (mouseY - posY) * followerSpeed;
      follower.style.left = posX + 'px';
      follower.style.top = posY + 'px';
      
      requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Mouse movement
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, input, textarea, .skill-item, .nav-links li'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        follower.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
      });
    });
  });

        // Hero section animation
        const hero = document.querySelector('.hero');
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            hero.style.setProperty('--mouse-x', x);
            hero.style.setProperty('--mouse-y', y);
        });
  
        // Updated JavaScript for responsive navbar
        const navOverlay = document.getElementById('navOverlay');
        
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.innerHTML = isOpen 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on links (for mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    navOverlay.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        // Handle window resize




// Updated loader timeout
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.querySelector('.loader-wrapper');
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }, 2000); // Increased slightly for better loading experience
});
