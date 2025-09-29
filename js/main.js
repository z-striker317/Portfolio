// Main JavaScript for Aakarsh Ahlawat Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initTypingAnimation();
    initSmoothScrolling();
    initSkillAnimations();
    initProjectsLoader();
    initContactForm();
    initScrollEffects();
    initParallaxEffects();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const titles = [
        'Data Scientist',
        'AI Engineer',
        'Machine Learning Expert',
        'Research Analyst',
        'Python Developer',
        'Data Visualizer'
    ];
    
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeWriter() {
        const currentTitle = titles[currentIndex];
        
        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % titles.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    if (typingText) {
        typeWriter();
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Progress Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-item .bg-gradient-to-r');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease-out';
                    progressBar.style.width = width;
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Projects Loader (GitHub Integration)
function initProjectsLoader() {
    loadGitHubProjects();
}

async function loadGitHubProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const loadingIndicator = document.getElementById('projects-loading');
    
    try {
        // Try to load GitHub integration if available, otherwise use sample projects
        if (typeof GitHubPortfolio !== 'undefined') {
            const github = new GitHubPortfolio('z-striker317');
            const projects = await github.getTopProjects(6);
            displayProjects(projects);
        } else {
            // Fallback to sample projects with simulated delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Enhanced sample projects with more realistic data
            const sampleProjects = [
                {
                name: 'Customer Churn Prediction',
                description: 'Machine learning model to predict customer churn using ensemble methods. Achieved 94% accuracy with Random Forest and XGBoost.',
                technologies: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost'],
                githubUrl: 'https://github.com/z-striker317',
                stars: 15,
                language: 'Python'
            },
            {
                name: 'Stock Price Forecasting LSTM',
                description: 'Deep learning model using LSTM networks to predict stock prices. Implemented with TensorFlow and real-time data visualization.',
                technologies: ['Python', 'TensorFlow', 'LSTM', 'Matplotlib'],
                githubUrl: 'https://github.com/z-striker317',
                stars: 28,
                language: 'Python'
            },
            {
                name: 'Sentiment Analysis Dashboard',
                description: 'Real-time sentiment analysis of social media data with interactive dashboard. Uses NLP and data visualization.',
                technologies: ['Python', 'NLTK', 'Streamlit', 'Plotly'],
                githubUrl: 'https://github.com/z-striker317',
                stars: 22,
                language: 'Python'
            },
            {
                name: 'E-commerce Recommendation System',
                description: 'Collaborative filtering recommendation system for e-commerce platform. Implemented matrix factorization techniques.',
                technologies: ['Python', 'Surprise', 'Pandas', 'Flask'],
                githubUrl: 'https://github.com/z-striker317',
                stars: 31,
                language: 'Python'
            },
            {
                name: 'COVID-19 Data Analysis',
                description: 'Comprehensive analysis of COVID-19 data with interactive visualizations and statistical insights.',
                technologies: ['Python', 'Pandas', 'Seaborn', 'Plotly'],
                githubUrl: 'https://github.com/z-striker317',
                stars: 18,
                language: 'Python'
            },
            {
                name: 'Image Classification CNN',
                description: 'Convolutional Neural Network for image classification with transfer learning. Achieved 96% accuracy on test set.',
                technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
                githubUrl: 'https://github.com/z-striker317',
                stars: 25,
                language: 'Python'
            }
        ];
        
            displayProjects(sampleProjects);
            
            if (loadingIndicator) {
                loadingIndicator.classList.add('hidden');
            }
            if (projectsGrid) {
                projectsGrid.classList.remove('hidden');
            }
        }
        
    } catch (error) {
        console.error('Error loading projects:', error);
        showProjectsError();
    }
}

function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden">
            <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="text-xl font-semibold text-blue-400 mb-2">${project.name}</h3>
                    <div class="flex items-center space-x-2 text-gray-400">
                        <i class="fas fa-star text-yellow-500"></i>
                        <span class="text-sm">${project.stars}</span>
                    </div>
                </div>
                
                <p class="text-gray-300 mb-4 leading-relaxed">${project.description}</p>
                
                <div class="mb-4">
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `
                            <span class="tech-badge px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-600">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center text-gray-400">
                        <i class="fas fa-code mr-2"></i>
                        <span class="text-sm">${project.language}</span>
                    </div>
                    
                    <div class="flex space-x-3">
                        <a href="${project.githubUrl}" target="_blank" 
                           class="text-gray-400 hover:text-blue-400 transition-colors">
                            <i class="fab fa-github text-lg"></i>
                        </a>
                        ${project.demoUrl ? `
                            <a href="${project.demoUrl}" target="_blank" 
                               class="text-gray-400 hover:text-green-400 transition-colors">
                                <i class="fas fa-external-link-alt text-lg"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function showProjectsError() {
    const loadingIndicator = document.getElementById('projects-loading');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (loadingIndicator) {
        loadingIndicator.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                <p class="text-gray-400">Unable to load projects at the moment.</p>
                <p class="text-gray-500 text-sm mt-2">Please visit my GitHub profile to view my latest work.</p>
            </div>
        `;
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link
            const mailtoLink = `mailto:aakarsh3172002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Email client opened! Please send the email to complete your message.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-exclamation' : 'fa-info'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background opacity
        if (scrollTop > 100) {
            navbar.classList.add('bg-gray-900/95');
            navbar.classList.remove('bg-gray-900/95');
            navbar.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Update active nav link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-blue-400');
                    link.classList.add('text-gray-300');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-gray-300');
                        link.classList.add('text-blue-400');
                    }
                });
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.neural-network');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
}

// Intersection Observer for Animations
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.bg-gray-800\\/50, .bg-gray-900\\/50');
    animatedElements.forEach(element => observer.observe(element));
}

// Performance Optimization
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

// Add debounced scroll listener
window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based animations can be added here
}, 10));

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme Toggle (if needed in future)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }
    }
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker Registration (for PWA functionality if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration can be added here for PWA functionality
    });
}

// Certificate Download Functionality
function downloadCertificate(url, filename) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    
    // Temporarily add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show download notification
    showNotification('Certificate download started!', 'success');
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set notification styling based on type
    switch(type) {
        case 'success':
            notification.className += ' bg-green-600 text-white';
            break;
        case 'error':
            notification.className += ' bg-red-600 text-white';
            break;
        case 'warning':
            notification.className += ' bg-yellow-600 text-white';
            break;
        default:
            notification.className += ' bg-blue-600 text-white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Certificate Gallery Interactions
function initCertificateInteractions() {
    // Add click handlers for certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button/link
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a, button')) {
                return;
            }
            
            // Add visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
        
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const viewButton = card.querySelector('a[href*=".pdf"]');
                if (viewButton) {
                    viewButton.click();
                }
            }
        });
    });
}

// Enhanced Project Loading with Featured Projects
function enhancedProjectLoader() {
    const loadMoreButton = document.getElementById('load-more-projects');
    const projectsGrid = document.getElementById('projects-grid');
    const projectsLoading = document.getElementById('projects-loading');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', async function() {
            // Show loading state
            loadMoreButton.disabled = true;
            loadMoreButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
            projectsLoading?.classList.remove('hidden');
            
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show projects grid
                projectsGrid?.classList.remove('hidden');
                projectsLoading?.classList.add('hidden');
                
                // Update button
                loadMoreButton.innerHTML = '<i class="fas fa-check mr-2"></i>Projects Loaded';
                loadMoreButton.classList.add('bg-green-600', 'hover:bg-green-700');
                loadMoreButton.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-purple-600');
                
                // Initialize GitHub integration if available
                if (window.GitHubPortfolio) {
                    const github = new GitHubPortfolio('z-striker317');
                    const repos = await github.fetchRepositories();
                    github.displayRepositories(repos.slice(0, 6)); // Show first 6 additional repos
                }
                
            } catch (error) {
                console.error('Error loading projects:', error);
                showNotification('Error loading projects. Please try again.', 'error');
                loadMoreButton.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Try Again';
                loadMoreButton.disabled = false;
            }
        });
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize certificate interactions
    initCertificateInteractions();
    
    // Initialize enhanced project loader
    enhancedProjectLoader();
    
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
});