// Add this at the beginning of your script.js file
// Performance optimization flags
let isScrolling = false;
let scrollTimeout;
let imageObserver;

// Optimize scroll event
window.addEventListener('scroll', function() {
    if (!isScrolling) {
        isScrolling = true;
        
        // Debounce the scroll event
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            
            // Only update navbar on scroll end for better performance
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
        }, 100);
    }
}, { passive: true });

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const openBookBtn = document.getElementById('openBookBtn');
const bookModal = document.getElementById('bookModal');
const closeBook = document.querySelector('.close-book');
const easterEggBtn = document.getElementById('easterEggBtn');
const easterModal = document.getElementById('easterModal');
const closeEaster = document.querySelector('.close-easter');
const imageModal = document.getElementById('imageModal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalDesc = document.getElementById('modalDesc');
const galleryGrid = document.querySelector('.gallery-grid');

// Mixed gallery data with images AND videos (2 video placeholders included)
const galleryData = [
    {
        type: "image",
        media: "first.jpeg",
        thumbnail: "first.jpeg",
        title: "The first Day i captured your Smile in School",
        date: "2025",
        description: "I could remember how I was shy to pull out my phone in phase 3 that day, & yeah we later create magic."
    },
    {
        type: "image", 
        media: "corporate.jpeg",
        thumbnail: "corporate.jpeg",
        title: "Fashionista",
        date: "Always",
        description: "Everytime you're in Corporate; My favorite thing to capture."
    },
    {
        type: "image",
        media: "ourfirst.jpeg",
        thumbnail: "ourfirst.jpeg",
        title: "Me & U - I",
        date: "My Favorite",
        description: "Our first picture together in Corporate."
    },
    {
        type: "image",
        media: "couple.jpeg",
        thumbnail: "couple.jpeg",
        title: "Me & U- II",
        date: "2025",
        description: "One of our pictures in Corporate."
    },
    {
        type: "image",
        media: "Her.jpeg",
        thumbnail: "Her.jpeg",
        title: "HER",
        date: "2025",
        description: "Stunning pics of yourself."
    },
    {
        type: "image",
        media: "innocent.jpeg",
        thumbnail: "innocent.jpeg",
        title: "Innocent Oma",
        date: "2025",
        description: "Adding this cos why not?😅."
    },
    {
        type: "image",
        media: "beauty.jpeg",
        thumbnail: "beauty.jpeg",
        title: "Beautiful Moment",
        date: "2025",
        description: "One of my best Pocture!🤭",
    },
    {
        type: "video",
        media: "video.mp4",
        thumbnail: "queen.jpeg",
        title: "Our Departmental Day",
        date: "Dec 2025",
        description: "That amazing day prep for our departmental day. Click to play the video memory!"
    }
];

// Add color and icon properties to gallery items for the new modal functions
galleryData.forEach(item => {
    if (!item.color) {
        // Assign a color based on type
        item.color = item.type === 'video' ? '#ff6b8b' : '#4a6fa5';
    }
    if (!item.icon) {
        // Assign an icon based on type
        item.icon = item.type === 'video' ? 'fas fa-video' : 'fas fa-camera';
    }
    if (!item.emoji) {
        // Assign a default emoji
        item.emoji = item.type === 'video' ? '🎬' : '📸';
    }
});

// ===== SECRET GALLERY DATA =====
const secretGalleryData = [
    {
        type: "image",
        media: "nov1.jpeg",
        thumbnail: "nov1.jpeg",
        title: "Special Day",
        date: "November 2025",
        description: "This was our first special outing together. I remember every moment like it was yesterday.",
        color: "#ff6b8b",
        icon: "fas fa-heart",
        emoji: "💕"
    },
    {
        type: "image", 
        media: "novv1.jpeg",
        thumbnail: "novv1.jpeg",
        title: "Our First Adventure",
        date: "That Special Day",
        description: "Remember this amazing night we had? I cherish this memory so much: the dance & vibes!.",
        color: "#6b8bff",
        icon: "fas fa-star",
        emoji: "✨"
    }
];

// Add this password (change to your actual first outing date)
const SECRET_PASSWORD = "NOVEMBER2025"; // Change this to your actual date

// Secret gallery state
let secretUnlocked = false;
let secretAttempts = 3;

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize main gallery
    initializeGallery();
    
    // Initialize secret gallery section
    initializeSecretGallerySection();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add floating hearts
    createFloatingHearts();
    
    // Create YouTube modal (for Cardi B songs)
    createYouTubeModal();
    
    // Add toast animation styles
    addToastStyles();
    
    // Add text modal styles
    addTextModalStyles();
    
    // Check if already unlocked from localStorage
    if (localStorage.getItem('secretGalleryUnlocked') === 'true') {
        secretUnlocked = true;
        secretAttempts = 3; // Reset attempts if previously unlocked
        console.log('Secret gallery was previously unlocked');
    }
    
    // Add event listeners
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Book Modal functionality
    if (openBookBtn) {
        openBookBtn.addEventListener('click', function() {
            bookModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBook) {
        closeBook.addEventListener('click', function() {
            bookModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Easter Egg Modal functionality
    if (easterEggBtn) {
        easterEggBtn.addEventListener('click', function() {
            easterModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add Cardi B song click events after modal is shown
            setTimeout(addCardiBClickEvents, 100);
        });
    }

    if (closeEaster) {
        closeEaster.addEventListener('click', function() {
            easterModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Image Modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bookModal) {
            bookModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === easterModal) {
            easterModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== SIMPLE SECRET GALLERY - FIXED VERSION =====
function initializeSecretGallerySection() {
    console.log('Initializing secret gallery section...');
    
    const mainGallery = document.getElementById('gallery');
    
    if (!mainGallery) {
        console.error('Main gallery section not found!');
        setTimeout(initializeSecretGallerySection, 500);
        return;
    }
    
    // Create the secret gallery HTML
    const secretGalleryHTML = `
        <section id="secret-gallery" class="secret-gallery-section" style="padding: 60px 0; background: linear-gradient(135deg, #f9f7fe 0%, #f0edfc 100%);">
            <div class="container">
                
                <div class="secret-gallery-container" style="position: relative;">
                    <!-- Blur overlay that shows initially -->
                    <div id="secretBlurOverlay" style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(15px);
                        z-index: 10;
                        display: ${secretUnlocked ? 'none' : 'flex'};
                        align-items: center;
                        justify-content: center;
                        border-radius: 20px;
                        flex-direction: column;
                        padding: 50px 30px;
                        text-align: center;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                        border: 2px solid rgba(255, 107, 139, 0.2);
                    ">
                        <div style="margin-bottom: 30px;">
                            <i class="fas fa-lock" style="font-size: 4rem; color: #ff6b8b; margin-bottom: 20px;"></i>
                            <h3 style="color: #333; margin-bottom: 10px; font-size: 1.8rem;">Secret Gallery Locked</h3>
                            <p style="color: #666; margin-bottom: 25px; font-size: 1.1rem;">These are very special memories that require a password to unlock</p>
                        </div>
                        
                        <div style="width: 100%; max-width: 400px;">
                            <div class="password-input-group" style="margin-bottom: 20px;">
                                <input type="password" 
                                       id="secretPasswordInput" 
                                       placeholder="Enter password (MONTHYEAR)"
                                       maxlength="20"
                                       autocomplete="off"
                                       style="
                                           width: 100%;
                                           padding: 16px 20px;
                                           border: 2px solid #e0e0e0;
                                           border-radius: 12px;
                                           font-size: 1rem;
                                           transition: all 0.3s;
                                           background: white;
                                       ">
                                <div id="passwordMessage" style="
                                    margin-top: 12px;
                                    min-height: 20px;
                                    font-size: 0.9rem;
                                    text-align: center;
                                    font-weight: 500;
                                "></div>
                            </div>
                            
                            <div style="display: flex; gap: 12px; margin-bottom: 20px;">
                                <button id="submitSecretPassword" style="
                                    flex: 1;
                                    padding: 16px;
                                    background: linear-gradient(135deg, #ff6b8b, #ff8fa3);
                                    border: none;
                                    border-radius: 12px;
                                    color: white;
                                    font-size: 1.1rem;
                                    font-weight: 600;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 10px;
                                    transition: all 0.3s;
                                    box-shadow: 0 5px 15px rgba(255, 107, 139, 0.2);
                                ">
                                    <i class="fas fa-unlock"></i>
                                    <span>Unlock Gallery</span>
                                </button>
                                <button id="showHint" style="
                                    padding: 16px 20px;
                                    background: #f5f5f5;
                                    border: 1px solid #ddd;
                                    border-radius: 12px;
                                    color: #666;
                                    font-size: 1rem;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    <i class="fas fa-question-circle"></i>
                                </button>
                            </div>
                            
                            <div style="color: #999; font-size: 0.9rem; text-align: center;">
                                Attempts left: <span id="attemptsCount" style="color: #ff6b8b; font-weight: 600;">3</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Actual gallery grid -->
                    <div class="gallery-grid" id="secretGalleryGrid" style="
                        opacity: ${secretUnlocked ? '1' : '0.5'};
                        filter: ${secretUnlocked ? 'none' : 'blur(15px)'};
                        pointer-events: ${secretUnlocked ? 'auto' : 'none'};
                        transition: all 0.8s ease;
                    ">
                        <!-- Secret gallery items will be loaded here -->
                    </div>
                </div>
              
            </div>
        </section>
    `;
    
    // Insert the secret gallery after the main gallery
    mainGallery.insertAdjacentHTML('afterend', secretGalleryHTML);
    console.log('Secret gallery section added to DOM');
    
    // Load the secret gallery items
    loadSecretGalleryItems();
    
    // Initialize password system if not already unlocked
    if (!secretUnlocked) {
        setTimeout(initializePasswordSystem, 100);
    }
}

function loadSecretGalleryItems() {
    const secretGrid = document.getElementById('secretGalleryGrid');
    
    if (!secretGrid) {
        console.error('Secret gallery grid not found!');
        setTimeout(loadSecretGalleryItems, 500);
        return;
    }
    
    // Clear any existing content
    secretGrid.innerHTML = '';
    
    // Check if we have data
    if (!secretGalleryData || secretGalleryData.length === 0) {
        secretGrid.innerHTML = `
            <div class="no-images-message" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-image" style="font-size: 3rem; color: #ccc;"></i>
                <p style="color: #666; margin-top: 10px;">No secret memories found</p>
            </div>
        `;
        return;
    }
    
    // Create gallery items
    secretGalleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index + 100);
        
        if (item.type === 'video') {
            galleryItem.innerHTML = `
                <div class="gallery-video">
                    <video class="video-thumbnail" poster="${item.thumbnail}" preload="metadata">
                        <source src="${item.media}" type="video/mp4">
                    </video>
                    <div class="video-play-btn">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="video-badge">
                        <i class="fas fa-video"></i> Video
                    </div>
                </div>
                <div class="gallery-overlay">
                    <h4 class="gallery-title">${item.title}</h4>
                    <p class="gallery-date">${item.date}</p>
                    <p class="video-indicator"><i class="fas fa-play-circle"></i> Click to play</p>
                </div>
            `;
            
            const videoElement = galleryItem.querySelector('.video-thumbnail');
            const playBtn = galleryItem.querySelector('.video-play-btn');
            
            if (playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openVideoModal(item);
                });
            }
            
        } else {
            galleryItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h4 class="gallery-title">${item.title}</h4>
                    <p class="gallery-date">${item.date}</p>
                </div>
            `;
        }
        
        galleryItem.addEventListener('click', () => {
            openTextOnlyModal(item);
        });
        
        secretGrid.appendChild(galleryItem);
    });
    
    console.log(`Loaded ${secretGalleryData.length} secret gallery items`);
}

function initializePasswordSystem() {
    console.log('Initializing password system...');
    
    const passwordInput = document.getElementById('secretPasswordInput');
    const submitBtn = document.getElementById('submitSecretPassword');
    const hintBtn = document.getElementById('showHint');
    const messageDiv = document.getElementById('passwordMessage');
    const attemptsCount = document.getElementById('attemptsCount');
    const secretBlurOverlay = document.getElementById('secretBlurOverlay');
    const secretGrid = document.getElementById('secretGalleryGrid');
    
    if (!passwordInput || !submitBtn) {
        console.error('Password elements not found!');
        setTimeout(initializePasswordSystem, 500);
        return;
    }
    
    // Update attempts count
    if (attemptsCount) {
        attemptsCount.textContent = secretAttempts;
    }
    
    // Submit password
    submitBtn.addEventListener('click', checkPassword);
    
    // Press Enter to submit
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Show hint
    if (hintBtn) {
        hintBtn.addEventListener('click', () => {
            if (messageDiv) {
                messageDiv.innerHTML = `
                    <div style="background: #fff9fa; color: #ff6b8b; padding: 12px; border-radius: 8px; border: 1px solid #ffccd5;">
                        <strong><i class="fas fa-lightbulb"></i> Hint:</strong> It's the month and year we first met<br>
                        <small>Format: ALL CAPITAL LETTERS (e.g., FEBRUARY2026)</small>
                    </div>
                `;
                
                // Clear hint after 5 seconds
                setTimeout(() => {
                    if (messageDiv) {
                        messageDiv.textContent = '';
                    }
                }, 5000);
            }
        });
    }
    
    function checkPassword() {
        const input = passwordInput.value.trim().toUpperCase();
        
        if (!input) {
            showMessage('Please enter the password', 'error');
            return;
        }
        
        if (input === SECRET_PASSWORD) {
            // Correct password
            showMessage('Password correct! Unlocking gallery...', 'success');
            
            // Disable input and buttons
            passwordInput.disabled = true;
            submitBtn.disabled = true;
            if (hintBtn) hintBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Unlocking...</span>';
            
            // Show loading animation
            showUnlockAnimation(() => {
                // Unlock the gallery
                secretUnlocked = true;
                
                // Remove blur overlay
                if (secretBlurOverlay) {
                    secretBlurOverlay.style.opacity = '0';
                    secretBlurOverlay.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        secretBlurOverlay.style.display = 'none';
                    }, 500);
                }
                
                // Remove blur from gallery
                if (secretGrid) {
                    secretGrid.style.opacity = '1';
                    secretGrid.style.filter = 'none';
                    secretGrid.style.pointerEvents = 'auto';
                }
                
                // Show success message
                showToast('✨ Secret gallery unlocked! All memories are now visible.', 'success');
                
                // Save to localStorage
                localStorage.setItem('secretGalleryUnlocked', 'true');
                localStorage.setItem('secretPassword', SECRET_PASSWORD);
            });
            
        } else {
            // Wrong password
            secretAttempts--;
            if (attemptsCount) {
                attemptsCount.textContent = secretAttempts;
            }
            
            if (secretAttempts <= 0) {
                showMessage('Too many attempts. The gallery is now locked for 1 minute.', 'error');
                submitBtn.disabled = true;
                if (hintBtn) hintBtn.disabled = true;
                passwordInput.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-lock"></i><span>Locked</span>';
                
                // Lock for 1 minute
                setTimeout(() => {
                    secretAttempts = 3;
                    if (attemptsCount) {
                        attemptsCount.textContent = secretAttempts;
                    }
                    submitBtn.disabled = false;
                    if (hintBtn) hintBtn.disabled = false;
                    passwordInput.disabled = false;
                    passwordInput.value = '';
                    messageDiv.textContent = '';
                    submitBtn.innerHTML = '<i class="fas fa-unlock"></i><span>Unlock Gallery</span>';
                    showMessage('You can try again now', 'info');
                }, 60000);
                
            } else {
                showMessage(`Incorrect password. ${secretAttempts} attempt${secretAttempts !== 1 ? 's' : ''} remaining`, 'error');
                
                // Shake animation
                passwordInput.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    passwordInput.style.animation = '';
                }, 500);
            }
        }
    }
    
    function showMessage(text, type) {
        if (messageDiv) {
            messageDiv.textContent = text;
            messageDiv.style.color = type === 'error' ? '#e74c3c' : 
                                   type === 'success' ? '#2ecc71' : 
                                   '#3498db';
            
            // Auto-clear success messages
            if (type === 'success') {
                setTimeout(() => {
                    if (messageDiv) {
                        messageDiv.textContent = '';
                    }
                }, 3000);
            }
        }
    }
}

function showUnlockAnimation(callback) {
    const unlockOverlay = document.createElement('div');
    unlockOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        text-align: center;
    `;
    
    unlockOverlay.innerHTML = `
        <div style="max-width: 400px; padding: 40px;">
            <div class="unlock-icon" style="
                width: 100px;
                height: 100px;
                background: linear-gradient(135deg, #ff6b8b, #ff8fa3);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 30px;
                animation: pulse 1.5s infinite;
                box-shadow: 0 10px 30px rgba(255, 107, 139, 0.4);
            ">
                <i class="fas fa-unlock-alt" style="font-size: 3rem; color: white;"></i>
            </div>
            <h2 style="font-size: 2rem; margin-bottom: 15px; color: white;">Unlocking Memories...</h2>
            <p style="font-size: 1.1rem; color: #ddd; margin-bottom: 30px;">
                Loading your special moments...
            </p>
            <div class="loading-dots" style="display: flex; justify-content: center; gap: 10px;">
                <div style="width: 12px; height: 12px; background: #ff6b8b; border-radius: 50%; animation: bounce 1.4s infinite;"></div>
                <div style="width: 12px; height: 12px; background: #ff8fa3; border-radius: 50%; animation: bounce 1.4s infinite 0.2s;"></div>
                <div style="width: 12px; height: 12px; background: #ffccd5; border-radius: 50%; animation: bounce 1.4s infinite 0.4s;"></div>
            </div>
        </div>
    `;
    
    // Add animation styles
    if (!document.querySelector('#unlock-animations')) {
        const style = document.createElement('style');
        style.id = 'unlock-animations';
        style.textContent = `
            @keyframes heartbeat {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 139, 0.7); }
                70% { transform: scale(1.1); box-shadow: 0 0 0 20px rgba(255, 107, 139, 0); }
                100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 139, 0); }
            }
            
            @keyframes bounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-15px); }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(unlockOverlay);
    document.body.style.overflow = 'hidden';
    
    // Show for 2 seconds
    setTimeout(() => {
        unlockOverlay.style.opacity = '0';
        unlockOverlay.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            unlockOverlay.remove();
            document.body.style.overflow = 'auto';
            if (callback) callback();
        }, 500);
    }, 2000);
}

// ===== GALLERY FUNCTIONS =====

// Initialize gallery with mixed content (images + videos)
function initializeGallery() {
    if (!galleryGrid) {
        console.error('Gallery grid not found!');
        return;
    }
    
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);
        
        // Different HTML for images vs videos
        if (item.type === 'video') {
            galleryItem.innerHTML = `
                <div class="gallery-video">
                    <video class="video-thumbnail" poster="${item.thumbnail}" preload="metadata">
                        <source src="${item.media}" type="video/mp4">
                    </video>
                    <div class="video-play-btn">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="video-badge">
                        <i class="fas fa-video"></i> Video
                    </div>
                </div>
                <div class="gallery-overlay">
                    <h4 class="gallery-title">${item.title}</h4>
                    <p class="gallery-date">${item.date}</p>
                    <p class="video-indicator"><i class="fas fa-play-circle"></i> Click to play</p>
                </div>
            `;
            
            // Add video-specific event listeners
            const videoElement = galleryItem.querySelector('.video-thumbnail');
            const playBtn = galleryItem.querySelector('.video-play-btn');
            
            if (playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openVideoModal(item);
                });
            }
            
            // Preview on hover
            galleryItem.addEventListener('mouseenter', () => {
                if (videoElement) {
                    videoElement.play().catch(e => {
                        // Autoplay prevented, that's okay
                    });
                }
            });
            
            galleryItem.addEventListener('mouseleave', () => {
                if (videoElement) {
                    videoElement.pause();
                    videoElement.currentTime = 0;
                }
            });
            
        } else {
            // Regular image item
            galleryItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h4 class="gallery-title">${item.title}</h4>
                    <p class="gallery-date">${item.date}</p>
                </div>
            `;
        }
        
        // Update click event to use text-only modal instead
        galleryItem.addEventListener('click', () => {
            openTextOnlyModal(item);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Open image modal with clicked image (kept for backward compatibility)
function openImageModal(item) {
    modalImage.src = item.media;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalDate.textContent = item.date;
    modalDesc.textContent = item.description;
    
    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Open video modal (kept for backward compatibility)
function openVideoModal(item) {
    // Create video modal
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal active';
    videoModal.innerHTML = `
        <div class="video-modal-content">
            <span class="close-video-modal">&times;</span>
            <div class="video-player-container">
                <video id="fullscreenVideo" controls autoplay>
                    <source src="${item.media}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="video-modal-caption">
                <h3>${item.title}</h3>
                <p class="video-date">${item.date}</p>
                <p class="video-description">${item.description}</p>
                <div class="video-controls-tip">
                    <i class="fas fa-info-circle"></i> Double-click video for fullscreen
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(videoModal);
    document.body.style.overflow = 'hidden';
    
    // Close video modal
    const closeBtn = videoModal.querySelector('.close-video-modal');
    const videoElement = videoModal.querySelector('#fullscreenVideo');
    
    closeBtn.addEventListener('click', () => {
        videoElement.pause();
        videoModal.remove();
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoElement.pause();
            videoModal.remove();
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fullscreen on double click
    videoElement.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            videoElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });
    
    // Keyboard controls
    function handleKeydown(e) {
        if (e.key === 'Escape' && videoModal.parentNode) {
            videoElement.pause();
            videoModal.remove();
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleKeydown);
        }
        
        // Space bar to play/pause
        if (e.key === ' ' && videoModal.contains(document.activeElement)) {
            e.preventDefault();
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        }
    }
    
    document.addEventListener('keydown', handleKeydown);
    
    // Clean up event listener when modal closes
    const originalRemove = videoModal.remove;
    videoModal.remove = function() {
        document.removeEventListener('keydown', handleKeydown);
        return originalRemove.call(this);
    };
}

// Initialize scroll animations
function initScrollAnimations() {
    // Simple scroll animation implementation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.love-card, .gallery-item, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    if (!heartsContainer) return;
    
    // Create more hearts for better effect
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = ['❤', '💕', '💖', '💗', '💓', '💞'][Math.floor(Math.random() * 6)];
        
        // Random properties
        const size = Math.random() * 1.5 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        
        heart.style.fontSize = `${size}rem`;
        heart.style.left = `${left}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Create YouTube Modal (for Cardi B songs)
function createYouTubeModal() {
    const youtubeModal = document.createElement('div');
    youtubeModal.className = 'youtube-modal';
    youtubeModal.innerHTML = `
        <div class="youtube-modal-content">
            <div class="youtube-header">
                <h3>🎵 Cardi B - <span id="songTitle">UP</span> 🎵</h3>
                <button class="close-youtube">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="youtube-player">
                <iframe id="youtubeIframe" 
                        src="" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(youtubeModal);
    
    // Close YouTube modal
    const closeYoutube = youtubeModal.querySelector('.close-youtube');
    closeYoutube.addEventListener('click', () => {
        youtubeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Stop the video
        const iframe = document.getElementById('youtubeIframe');
        iframe.src = iframe.src.replace('&autoplay=1', '');
    });
    
    // Close modal when clicking outside
    youtubeModal.addEventListener('click', (e) => {
        if (e.target === youtubeModal) {
            youtubeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Stop the video
            const iframe = document.getElementById('youtubeIframe');
            iframe.src = iframe.src.replace('&autoplay=1', '');
        }
    });
}

// Add Cardi B song click events
function addCardiBClickEvents() {
    const songCards = document.querySelectorAll('.song-card');
    songCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const songTitle = this.getAttribute('data-title');
            playCardiBSong(videoId, songTitle);
        });
    });
}

// Play Cardi B songs
function playCardiBSong(videoId, songTitle) {
    // Update modal title
    const songTitleElement = document.getElementById('songTitle');
    if (songTitleElement) {
        songTitleElement.textContent = songTitle;
    }
    
    // Update iframe source
    const iframe = document.getElementById('youtubeIframe');
    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
    
    // Show modal
    const youtubeModal = document.querySelector('.youtube-modal');
    if (youtubeModal) {
        youtubeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Show toast notification
    showToast(`Now playing: Cardi B - ${songTitle}`, 'cardi-b');
}

// Show toast notification
function showToast(message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    if (type === 'cardi-b') {
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-crown" style="color: #ff6b8b;"></i>
                <span>${message}</span>
            </div>
        `;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 3000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: toastSlideIn 0.3s ease;
            border-left: 4px solid #ff6b8b;
            max-width: 300px;
        `;
    } else {
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #ff6b8b;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 3000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: toastSlideIn 0.3s ease;
        `;
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Add toast animation styles
function addToastStyles() {
    if (document.querySelector('#toast-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        @keyframes toastSlideIn {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes toastSlideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
        }
        .youtube-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 3000;
            align-items: center;
            justify-content: center;
        }
        .youtube-modal.active {
            display: flex;
        }
        .youtube-modal-content {
            width: 90%;
            max-width: 900px;
            background: #16213e;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
            animation: modalFadeIn 0.3s ease;
        }
        .youtube-header {
            background: #1a1a2e;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .youtube-header h3 {
            color: white;
            margin: 0;
        }
        .close-youtube {
            background: none;
            border: none;
            color: white;
            font-size: 1.8rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        .close-youtube:hover {
            color: #ff6b8b;
        }
        .youtube-player {
            padding: 30px;
            text-align: center;
        }
        .youtube-player iframe {
            width: 100%;
            height: 500px;
            border-radius: 10px;
            border: 3px solid #ff6b8b;
        }
        @media (max-width: 768px) {
            .youtube-player iframe {
                height: 300px;
            }
        }
        
        /* Video modal styles */
        .video-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .video-modal.active {
            display: flex;
        }
        .video-modal-content {
            width: 100%;
            max-width: 900px;
            background: #1a1a2e;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
            animation: modalFadeIn 0.3s ease;
        }
        .close-video-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2.5rem;
            color: white;
            cursor: pointer;
            z-index: 10;
            transition: color 0.3s ease;
            background: rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .close-video-modal:hover {
            color: #ff6b8b;
        }
        .video-player-container {
            width: 100%;
            background: #000;
            position: relative;
        }
        #fullscreenVideo {
            width: 100%;
            height: auto;
            max-height: 70vh;
            display: block;
            background: #000;
        }
        .video-modal-caption {
            padding: 25px;
            color: white;
        }
        .video-date {
            color: #ff8fa3;
            font-weight: 500;
            margin: 10px 0;
        }
        .video-description {
            color: #ddd;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .video-controls-tip {
            background: rgba(255, 107, 139, 0.2);
            padding: 12px 15px;
            border-radius: 8px;
            border-left: 3px solid #ff6b8b;
            font-size: 0.9rem;
            color: #ffccd5;
        }
        .video-controls-tip i {
            margin-right: 10px;
            color: #ff6b8b;
        }
        @media (max-width: 768px) {
            .video-modal-content {
                width: 95%;
            }
            #fullscreenVideo {
                max-height: 50vh;
            }
            .video-modal-caption {
                padding: 15px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add text modal styles with compact design
function addTextModalStyles() {
    if (document.querySelector('#text-modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'text-modal-styles';
    style.textContent = `
        .text-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.92);
            backdrop-filter: blur(10px);
            z-index: 4000;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.4s ease;
        }
        
        .text-modal.active {
            display: flex;
        }
        
        .text-modal-content {
            width: 95%;
            max-width: 500px;
            background: linear-gradient(145deg, #1a1a2e, #0f0f1a);
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: modalSlideIn 0.4s ease;
        }
        
        @keyframes modalSlideIn {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .text-modal-header {
            padding: 30px 25px 20px;
            text-align: center;
            position: relative;
        }
        
        .memory-icon-large {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: white;
            position: relative;
        }
        
        .memory-emoji-large {
            font-size: 1.5rem;
            position: absolute;
            top: -5px;
            right: -5px;
        }
        
        .text-modal-header h2 {
            color: white;
            font-size: 1.6rem;
            margin: 15px 0 10px;
            font-weight: 700;
            line-height: 1.3;
            padding: 0 10px;
        }
        
        .text-modal-date {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .text-modal-body {
            padding: 20px 25px;
        }
        
        .memory-description-box {
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .memory-description-box p {
            color: #ddd;
            font-size: 1rem;
            line-height: 1.6;
            margin: 0;
            text-align: center;
        }
        
        .action-section {
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .action-hint {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #ffccd5;
            margin-bottom: 15px;
            font-size: 0.9rem;
            justify-content: center;
        }
        
        .quick-stats {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            justify-content: center;
        }
        
        .stat-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #ddd;
            padding: 8px 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.9rem;
        }
        
        .action-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #ff6b8b, #ff8fa3);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            transition: all 0.3s;
        }
        
        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(255, 107, 139, 0.3);
        }
        
        .text-modal-footer {
            padding: 15px 25px;
            background: rgba(15, 15, 26, 0.8);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }
        
        .close-action-btn {
            padding: 10px 25px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50px;
            color: white;
            font-size: 0.95rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0 auto;
            transition: all 0.3s;
        }
        
        .close-action-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .close-text-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            font-size: 1.2rem;
            transition: all 0.3s;
        }
        
        .close-text-modal:hover {
            background: rgba(255, 107, 139, 0.5);
            border-color: #ff6b8b;
        }
        
        @media (max-width: 768px) {
            .text-modal-content {
                width: 100%;
                max-height: 85vh;
                overflow-y: auto;
            }
            
            .text-modal-header h2 {
                font-size: 1.4rem;
            }
            
            .memory-description-box p {
                font-size: 0.95rem;
            }
            
            .quick-stats {
                flex-direction: column;
                gap: 8px;
            }
            
            .action-btn {
                padding: 12px;
                font-size: 1rem;
            }
        }
        
        @media (max-width: 480px) {
            .text-modal-header {
                padding: 20px 15px 15px;
            }
            
            .text-modal-body {
                padding: 15px;
            }
            
            .text-modal-header h2 {
                font-size: 1.3rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Open text-only modal with compact design
function openTextOnlyModal(item) {
    const textModal = document.createElement('div');
    textModal.className = 'text-modal active';
    
    // Truncate description if too long
    const maxDescLength = 150;
    const truncatedDesc = item.description.length > maxDescLength 
        ? item.description.substring(0, maxDescLength) + '...' 
        : item.description;
    
    // More compact modal design
    textModal.innerHTML = `
        <div class="text-modal-content">
            <button class="close-text-modal">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="text-modal-header" style="background: linear-gradient(135deg, ${item.color}dd, ${adjustColor(item.color, -20)}dd);">
                <div class="memory-icon-large">
                    <i class="${item.icon}"></i>
                    <span class="memory-emoji-large">${item.emoji}</span>
                </div>
                <h2>${item.title}</h2>
                <div class="text-modal-date">
                    <i class="far fa-calendar"></i>
                    ${item.date}
                </div>
            </div>
            
            <div class="text-modal-body">
                <div class="memory-description-box">
                    <p>${truncatedDesc}</p>
                </div>
                
                ${item.type === 'video' ? `
                    <div class="action-section">
                        <div class="action-hint">
                            <i class="fas fa-info-circle"></i>
                            <span>Click below to watch this special memory</span>
                        </div>
                        <button class="action-btn play-video-btn" data-video="${item.media}">
                            <i class="fas fa-play"></i>
                            <span>Play Memory</span>
                        </button>
                    </div>
                ` : `
                    <div class="action-section">
                        <div class="action-hint">
                            <i class="fas fa-star"></i>
                            <span>A beautiful moment captured</span>
                        </div>
                        <div class="quick-stats">
                            <span class="stat-item"><i class="fas fa-camera"></i> Photo</span>
                            <span class="stat-item"><i class="fas fa-heart"></i> Special</span>
                        </div>
                        <button class="action-btn view-image-btn" data-image="${item.media}">
                            <i class="fas fa-eye"></i>
                            <span>View Image</span>
                        </button>
                    </div>
                `}
            </div>
            
            <div class="text-modal-footer">
                <button class="close-action-btn">
                    <i class="fas fa-times"></i>
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(textModal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functions
    const closeBtn = textModal.querySelector('.close-text-modal');
    const closeActionBtn = textModal.querySelector('.close-action-btn');
    
    const closeModalFunc = () => {
        textModal.style.animation = 'modalFadeOut 0.3s ease';
        setTimeout(() => {
            textModal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModalFunc);
    closeActionBtn.addEventListener('click', closeModalFunc);
    
    // Close when clicking outside (dark background)
    textModal.addEventListener('click', (e) => {
        if (e.target === textModal) {
            closeModalFunc();
        }
    });
    
    // Handle video play button with loading screen
    if (item.type === 'video') {
        const playBtn = textModal.querySelector('.play-video-btn');
        playBtn.addEventListener('click', () => {
            showLoadingScreen('video', () => {
                openModernVideoPlayer(item);
            });
        });
    }
    
    // Handle image view button with loading screen
    if (item.type === 'image') {
        const viewBtn = textModal.querySelector('.view-image-btn');
        viewBtn.addEventListener('click', () => {
            showLoadingScreen('image', () => {
                openModernImagePreview(item);
            });
        });
    }
    
    // Keyboard close with animation
    function handleKeydown(e) {
        if (e.key === 'Escape' && textModal.parentNode) {
            closeModalFunc();
            document.removeEventListener('keydown', handleKeydown);
        }
    }
    document.addEventListener('keydown', handleKeydown);
    
    // Add fade out animation
    if (!document.querySelector('#modal-fade-out')) {
        const style = document.createElement('style');
        style.id = 'modal-fade-out';
        style.textContent = `
            @keyframes modalFadeOut {
                from { opacity: 1; }
                to { opacity: 0; transform: scale(0.95); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Helper function to adjust colors for gradients
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    
    r = Math.min(Math.max(0, r), 255);
    g = Math.min(Math.max(0, g), 255);
    b = Math.min(Math.max(0, b), 255);
    
    return '#' + (b | (g << 8) | (r << 16)).toString(16).padStart(6, '0');
}

// Show loading screen
function showLoadingScreen(type, callback) {
    const loadingModal = document.createElement('div');
    loadingModal.className = 'loading-modal active';
    
    loadingModal.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div class="loading-text">
                <h3>Loading Memory</h3>
                <p>A wonderful memory is loading...</p>
                <div class="loading-dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingModal);
    
    // Add loading screen styles if they don't exist
    if (!document.querySelector('#loading-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-modal-styles';
        style.textContent = `
            .loading-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
                z-index: 6000;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .loading-modal.active {
                display: flex;
            }
            
            .loading-content {
                text-align: center;
                padding: 40px;
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                border-radius: 20px;
                border: 1px solid rgba(255, 107, 139, 0.3);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                max-width: 400px;
                width: 90%;
            }
            
            .loading-spinner {
                font-size: 3.5rem;
                color: #ff6b8b;
                margin-bottom: 25px;
            }
            
            .loading-spinner i {
                animation: spin 1.5s linear infinite;
            }
            
            .loading-text h3 {
                color: white;
                font-size: 1.8rem;
                margin-bottom: 10px;
                font-weight: 600;
            }
            
            .loading-text p {
                color: #ddd;
                font-size: 1.1rem;
                margin-bottom: 20px;
                opacity: 0.9;
            }
            
            .loading-dots {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
            }
            
            .loading-dots .dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #ff6b8b;
                opacity: 0.6;
                animation: pulse 1.5s ease-in-out infinite;
            }
            
            .loading-dots .dot:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .loading-dots .dot:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show loading screen for 2-3 seconds before executing callback
    setTimeout(() => {
        loadingModal.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            loadingModal.remove();
            callback();
        }, 500);
    }, 1000 + Math.random() * 100); // Random between 2-3 seconds
}

// Open modern image preview
function openModernImagePreview(item) {
    const imageModal = document.createElement('div');
    imageModal.className = 'modern-image-modal active';
    
    imageModal.innerHTML = `
        <div class="modern-image-content">
            <button class="close-modern-image">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="image-modal-header" style="background: linear-gradient(135deg, ${item.color}dd, ${adjustColor(item.color, -20)}dd);">
                <h3>${item.title}</h3>
                <div class="image-date">
                    <i class="far fa-calendar"></i>
                    ${item.date}
                </div>
            </div>
            
            <div class="image-container-modern">
                <div class="image-loader">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <img src="${item.media}" alt="${item.title}" 
                     loading="eager" 
                     onload="this.parentElement.querySelector('.image-loader').style.display='none'">
            </div>
            
            <div class="image-modal-footer">
                <div class="image-actions">
                    <button class="image-action-btn love-btn">
                        <i class="fas fa-heart"></i>
                        <span>Love This</span>
                    </button>
                    <button class="image-action-btn close-image-btn">
                        <i class="fas fa-times"></i>
                        <span>Close</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(imageModal);
    document.body.style.overflow = 'hidden';
    
    // Add the CSS styles for the modal if they don't exist
    if (!document.querySelector('#modern-image-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modern-image-modal-styles';
        style.textContent = `
            .modern-image-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.98);
                backdrop-filter: blur(20px);
                z-index: 5000;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeInModal 0.4s ease;
            }
            
            .modern-image-modal.active {
                display: flex;
            }
            
            .modern-image-content {
                width: 95%;
                max-width: 600px;
                background: linear-gradient(145deg, #1a1a2e, #0f0f1a);
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                animation: modalSlideIn 0.4s ease;
            }
            
            .image-modal-header {
                padding: 25px;
                text-align: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .image-modal-header h3 {
                color: white;
                font-size: 1.8rem;
                margin-bottom: 10px;
                font-weight: 600;
            }
            
            .image-date {
                color: rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-size: 1rem;
            }
            
            .image-container-modern {
                width: 100%;
                height: 400px;
                max-height: 60vh;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #000;
                position: relative;
            }
            
            .image-loader {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 2rem;
                z-index: 1;
            }
            
            .image-container-modern img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
                transition: transform 0.3s;
                position: relative;
                z-index: 2;
            }
            
            .image-container-modern img:hover {
                transform: scale(1.02);
            }
            
            .image-modal-footer {
                padding: 20px;
                background: rgba(15, 15, 26, 0.8);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .image-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
            }
            
            .image-action-btn {
                padding: 12px 25px;
                border-radius: 50px;
                border: none;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: all 0.3s;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .image-action-btn:hover {
                transform: translateY(-2px);
                background: rgba(255, 107, 139, 0.2);
            }
            
            .love-btn:hover {
                background: linear-gradient(135deg, #ff6b8b, #ff8fa3);
            }
            
            .close-modern-image {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                font-size: 1.2rem;
            }
            
            @keyframes fadeInModal {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes modalSlideIn {
                from { opacity: 0; transform: translateY(30px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @media (max-width: 768px) {
                .modern-image-content {
                    width: 100%;
                    max-height: 90vh;
                }
                
                .image-container-modern {
                    height: 300px;
                    max-height: 50vh;
                }
                
                .image-actions {
                    flex-direction: column;
                }
                
                .image-modal-header h3 {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const closeBtn = imageModal.querySelector('.close-modern-image');
    const closeImageBtn = imageModal.querySelector('.close-image-btn');
    const loveBtn = imageModal.querySelector('.love-btn');
    
    const closeImageFunc = () => {
        imageModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            imageModal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeImageFunc);
    closeImageBtn.addEventListener('click', closeImageFunc);
    
    loveBtn.addEventListener('click', () => {
        loveBtn.innerHTML = '<i class="fas fa-heart"></i> <span>Loved!</span>';
        loveBtn.style.background = '#ff6b8b';
        setTimeout(() => {
            loveBtn.innerHTML = '<i class="fas fa-heart"></i> <span>Love This</span>';
            loveBtn.style.background = '';
        }, 2000);
    });
    
    // Close on outside click
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeImageFunc();
        }
    });
    
    // Keyboard close
    function handleKeydown(e) {
        if (e.key === 'Escape' && imageModal.parentNode) {
            closeImageFunc();
            document.removeEventListener('keydown', handleKeydown);
        }
    }
    document.addEventListener('keydown', handleKeydown);
}

// Open modern video player
function openModernVideoPlayer(item) {
    const videoModal = document.createElement('div');
    videoModal.className = 'modern-video-modal active';

    videoModal.innerHTML = `
        <div class="modern-video-content">
            <button class="close-modern-video">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="video-modal-header" style="background: linear-gradient(135deg, ${item.color}dd, ${adjustColor(item.color, -20)}dd);">
                <h3>${item.title}</h3>
                <div class="video-date">
                    <i class="far fa-calendar"></i>
                    ${item.date}
                </div>
            </div>
            
            <div class="video-player-modern">
                <div class="video-loader">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading memory...</p>
                </div>
                <video controls autoplay playsinline>
                    <source src="${item.media}" type="video/mp4">
                    Your browser doesn't support video.
                </video>
                <div class="video-controls-overlay">
                    <button class="fullscreen-btn">
                        <i class="fas fa-expand"></i>
                    </button>
                    <button class="replay-btn">
                        <i class="fas fa-redo"></i>
                    </button>
                </div>
            </div>
            
            <div class="video-modal-footer">
                <p class="video-tip">
                    <i class="fas fa-lightbulb"></i>
                    <span>Double-tap video for fullscreen</span>
                </p>
                <button class="close-video-btn">
                    <i class="fas fa-times"></i>
                    Close Player
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(videoModal);
    document.body.style.overflow = 'hidden';
    
    // Add CSS styles for video modal if they don't exist
    if (!document.querySelector('#modern-video-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modern-video-modal-styles';
        style.textContent = `
            .modern-video-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.98);
                backdrop-filter: blur(20px);
                z-index: 5000;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeInModal 0.4s ease;
            }
            
            .modern-video-modal.active {
                display: flex;
            }
            
            .modern-video-content {
                width: 95%;
                max-width: 800px;
                background: linear-gradient(145deg, #1a1a2e, #0f0f1a);
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                animation: modalSlideIn 0.4s ease;
            }
            
            .video-modal-header {
                padding: 25px;
                text-align: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .video-modal-header h3 {
                color: white;
                font-size: 1.8rem;
                margin-bottom: 10px;
                font-weight: 600;
            }
            
            .video-date {
                color: rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-size: 1rem;
            }
            
            .video-player-modern {
                width: 100%;
                height: 450px;
                max-height: 60vh;
                background: #000;
                position: relative;
                overflow: hidden;
            }
            
            .video-player-modern video {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
            }
            
            .video-loader {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                text-align: center;
                z-index: 1;
            }
            
            .video-loader i {
                font-size: 2rem;
                margin-bottom: 10px;
                display: block;
            }
            
            .video-controls-overlay {
                position: absolute;
                bottom: 20px;
                right: 20px;
                display: flex;
                gap: 10px;
                z-index: 2;
            }
            
            .fullscreen-btn,
            .replay-btn {
                background: rgba(0, 0, 0, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 1.2rem;
                transition: all 0.3s;
            }
            
            .fullscreen-btn:hover,
            .replay-btn:hover {
                background: rgba(255, 107, 139, 0.8);
                transform: scale(1.1);
            }
            
            .video-modal-footer {
                padding: 20px;
                background: rgba(15, 15, 26, 0.8);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .video-tip {
                color: #ddd;
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0;
                font-size: 0.9rem;
            }
            
            .close-video-btn {
                padding: 10px 20px;
                border-radius: 50px;
                border: none;
                font-size: 1rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: all 0.3s;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .close-video-btn:hover {
                background: rgba(255, 107, 139, 0.2);
                transform: translateY(-2px);
            }
            
            .close-modern-video {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                font-size: 1.2rem;
            }
            
            @media (max-width: 768px) {
                .modern-video-content {
                    width: 100%;
                    max-height: 90vh;
                }
                
                .video-player-modern {
                    height: 300px;
                    max-height: 50vh;
                }
                
                .video-modal-footer {
                    flex-direction: column;
                    gap: 15px;
                    text-align: center;
                }
                
                .video-modal-header h3 {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    const video = videoModal.querySelector('video');
    const closeBtn = videoModal.querySelector('.close-modern-video');
    const closeVideoBtn = videoModal.querySelector('.close-video-btn');
    const fullscreenBtn = videoModal.querySelector('.fullscreen-btn');
    const replayBtn = videoModal.querySelector('.replay-btn');
    const videoLoader = videoModal.querySelector('.video-loader');

    video.onloadeddata = () => {
        videoLoader.style.display = 'none';
    };
    
    video.onerror = () => {
        videoLoader.innerHTML = '<i class="fas fa-exclamation-triangle"></i><p>Failed to load video</p>';
    };

    const closeVideoFunc = () => {
        video.pause();
        videoModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            videoModal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    };

    closeBtn.addEventListener('click', closeVideoFunc);
    closeVideoBtn.addEventListener('click', closeVideoFunc);

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            video.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    replayBtn.addEventListener('click', () => {
        video.currentTime = 0;
        video.play();
    });

    video.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            video.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // Close on outside click
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoFunc();
        }
    });
    
    // Keyboard close
    function handleKeydown(e) {
        if (e.key === 'Escape' && videoModal.parentNode) {
            closeVideoFunc();
            document.removeEventListener('keydown', handleKeydown);
        }
    }
    document.addEventListener('keydown', handleKeydown);
}

// Optimize gallery initialization
function optimizeGallery() {
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);
        galleryItem.setAttribute('data-loaded', 'false');
        
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            // Different HTML for images vs videos
            if (item.type === 'video') {
                galleryItem.innerHTML = `
                    <div class="gallery-video">
                        <video class="video-thumbnail" 
                               poster="${item.thumbnail}" 
                               preload="none"
                               playsinline
                               muted>
                            <source src="${item.media}" type="video/mp4">
                        </video>
                        <div class="video-play-btn">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="video-badge">
                            <i class="fas fa-video"></i> Video
                        </div>
                    </div>
                    <div class="gallery-overlay">
                        <h4 class="gallery-title">${item.title}</h4>
                        <p class="gallery-date">${item.date}</p>
                        <p class="video-indicator"><i class="fas fa-play-circle"></i> Click to play</p>
                    </div>
                `;
                
                // Lazy load video metadata
                const videoElement = galleryItem.querySelector('.video-thumbnail');
                
                // Only load video when in viewport
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            videoElement.load();
                            videoObserver.unobserve(videoElement);
                        }
                    });
                }, { threshold: 0.1 });
                
                videoObserver.observe(videoElement);
                
                // Add video-specific event listeners
                const playBtn = galleryItem.querySelector('.video-play-btn');
                
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    openVideoModal(item);
                });
                
                // Optimize hover preview - use touch events for mobile
                let hoverTimeout;
                galleryItem.addEventListener('mouseenter', () => {
                    if (videoElement && window.innerWidth > 768) {
                        hoverTimeout = setTimeout(() => {
                            videoElement.play().catch(e => {
                                // Autoplay prevented, that's okay
                            });
                        }, 300);
                    }
                });
                
                galleryItem.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimeout);
                    if (videoElement) {
                        videoElement.pause();
                        videoElement.currentTime = 0;
                    }
                });
                
                // Touch events for mobile
                galleryItem.addEventListener('touchstart', () => {
                    if (videoElement && window.innerWidth <= 768) {
                        videoElement.play().catch(e => {
                            // Autoplay prevented
                        });
                    }
                }, { passive: true });
                
                galleryItem.addEventListener('touchend', () => {
                    if (videoElement && window.innerWidth <= 768) {
                        videoElement.pause();
                        videoElement.currentTime = 0;
                    }
                });
                
            } else {
                // Use low-quality placeholder first
                galleryItem.innerHTML = `
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f5f5f5'/%3E%3C/svg%3E"
                         data-src="${item.thumbnail}"
                         alt="${item.title}"
                         loading="lazy"
                         class="lazy-image">
                    <div class="gallery-overlay">
                        <h4 class="gallery-title">${item.title}</h4>
                        <p class="gallery-date">${item.date}</p>
                    </div>
                `;
                
                // Lazy load image
                const img = galleryItem.querySelector('img');
                img.onload = () => {
                    galleryItem.setAttribute('data-loaded', 'true');
                    galleryItem.classList.add('loaded');
                };
                
                // Use Intersection Observer for lazy loading
                if (!imageObserver) {
                    imageObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const img = entry.target;
                                const src = img.getAttribute('data-src');
                                if (src) {
                                    img.src = src;
                                    img.removeAttribute('data-src');
                                }
                                imageObserver.unobserve(img);
                            }
                        });
                    }, {
                        rootMargin: '50px 0px',
                        threshold: 0.01
                    });
                }
                
                imageObserver.observe(img);
            }
            
            // Optimize click event - use passive listeners
            galleryItem.addEventListener('click', (e) => {
                e.preventDefault();
                openTextOnlyModal(item);
            }, { passive: false });
            
            if (galleryGrid) {
                galleryGrid.appendChild(galleryItem);
            }
        });
    });
}

// Clean up resources
function cleanupResources() {
    // Clean up observers
    if (imageObserver) {
        imageObserver.disconnect();
    }
    
    // Stop all videos
    document.querySelectorAll('video').forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.src = '';
        video.load();
    });
    
    // Clear timeouts
    clearTimeout(scrollTimeout);
}

// Add cleanup on page unload
window.addEventListener('beforeunload', cleanupResources);
window.addEventListener('pagehide', cleanupResources);

// Optimize resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any layout-dependent values
    }, 250);
}, { passive: true });

// Optimize touch events for mobile
document.addEventListener('touchstart', function() {}, { passive: true });
document.addEventListener('touchmove', function() {}, { passive: true });

// Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'ikigai-cover.jpeg',
        // Add other important images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload after page load
window.addEventListener('load', function() {
    setTimeout(preloadCriticalImages, 1000);
    
    // Remove loading skeletons after everything is loaded
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.add('loaded');
    });
});

