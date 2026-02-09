

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
        type: "video",
        media: "video.mp4",
        thumbnail: "queen.jpeg",
        title: "Our Departmental Day",
        date: "Dec 2025",
        description: "That amazing day prep for our departmental day. Click to play the video memory!"
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
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery
    initializeGallery();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add floating hearts
    createFloatingHearts();
    
    // Create YouTube modal (for Cardi B songs)
    createYouTubeModal();
    
    // Add toast animation styles
    addToastStyles();
});

// Toggle mobile menu
menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Book Modal functionality
openBookBtn.addEventListener('click', function() {
    bookModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeBook.addEventListener('click', function() {
    bookModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Easter Egg Modal functionality
easterEggBtn.addEventListener('click', function() {
    easterModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add Cardi B song click events after modal is shown
    setTimeout(addCardiBClickEvents, 100);
});

closeEaster.addEventListener('click', function() {
    easterModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Image Modal functionality
closeModal.addEventListener('click', function() {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

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

// Initialize gallery with mixed content (images + videos)
function initializeGallery() {
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-aos', 'fade-up');
        galleryItem.setAttribute('data-aos-delay', `${index * 100}`);
        
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
            
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openVideoModal(item);
            });
            
            // Preview on hover
            galleryItem.addEventListener('mouseenter', () => {
                if (videoElement) {
                    videoElement.play().catch(e => {
                        // Autoplay prevented, that's okay
                        console.log("Video preview autoplay prevented");
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
        
        galleryItem.addEventListener('click', () => {
            if (item.type === 'video') {
                openVideoModal(item);
            } else {
                openImageModal(item);
            }
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Open image modal with clicked image
function openImageModal(item) {
    modalImage.src = item.media;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalDate.textContent = item.date;
    modalDesc.textContent = item.description;
    
    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Open video modal
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
    document.getElementById('songTitle').textContent = songTitle;
    
    // Update iframe source
    const iframe = document.getElementById('youtubeIframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    
    // Show modal
    const youtubeModal = document.querySelector('.youtube-modal');
    youtubeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
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
            background: var(--primary);
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
    const style = document.createElement('style');
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
            border-left: 3px solid var(--primary);
            font-size: 0.9rem;
            color: #ffccd5;
        }
        .video-controls-tip i {
            margin-right: 10px;
            color: var(--primary);
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

