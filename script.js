// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const root = document.documentElement;

// Load theme from localStorage or system
function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) setTheme(savedTheme);
else setTheme(prefersDark ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// Loader Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 600);
    }, 900);
});

// Profile Image Flip Animation
const flipContainer = document.querySelector('.profile-img-flip');
const imgs = flipContainer ? flipContainer.querySelectorAll('.profile-img') : [];
let currentImg = 0;
if (imgs.length === 2) {
    setInterval(() => {
        flipContainer.classList.add('flipping');
        imgs[currentImg].classList.remove('active');
        currentImg = 1 - currentImg;
        setTimeout(() => {
            imgs[currentImg].classList.add('active');
            flipContainer.classList.remove('flipping');
        }, 200); // short delay for flip effect
    }, 7000);
}

// Animated Bubbles Background
function createBubbles() {
    const bubblesBg = document.querySelector('.bubbles-bg');
    if (!bubblesBg) return;
    for (let i = 0; i < 14; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble b' + ((i % 4) + 1);
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.width = bubble.style.height = (30 + Math.random() * 60) + 'px';
        bubble.style.animationDelay = (Math.random() * 18) + 's';
        bubblesBg.appendChild(bubble);
    }
}
createBubbles();

// Animated Text (typing effect)
const animatedText = document.querySelector('.animated-text');
if (animatedText) {
    const text = animatedText.textContent;
    animatedText.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            animatedText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    setTimeout(type, 600);
}

// Lightbox for Profile Images
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const profileImgFlip = document.getElementById('profile-img-flip');
const profileImgs = profileImgFlip ? profileImgFlip.querySelectorAll('.profile-img') : [];
let currentLightboxIndex = 0;

function openLightbox(index) {
    if (!profileImgs[index]) return;
    lightboxImg.src = profileImgs[index].src;
    lightboxImg.alt = profileImgs[index].alt;
    currentLightboxIndex = index;
    lightboxModal.classList.add('active');
}

function closeLightbox() {
    lightboxModal.classList.remove('active');
    setTimeout(() => { lightboxImg.src = ''; }, 300);
}

function showLightboxImg(index) {
    if (!profileImgs[index]) return;
    lightboxImg.src = profileImgs[index].src;
    lightboxImg.alt = profileImgs[index].alt;
    currentLightboxIndex = index;
}

if (profileImgFlip) {
    profileImgFlip.addEventListener('click', (e) => {
        // Only trigger if an image is clicked
        const img = e.target.closest('.profile-img');
        if (img) {
            openLightbox(Number(img.dataset.index));
        }
    });
}

if (lightboxClose) {
    lightboxClose.onclick = closeLightbox;
}
if (lightboxPrev) {
    lightboxPrev.onclick = () => showLightboxImg((currentLightboxIndex + profileImgs.length - 1) % profileImgs.length);
}
if (lightboxNext) {
    lightboxNext.onclick = () => showLightboxImg((currentLightboxIndex + 1) % profileImgs.length);
}
if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
    });
}
window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

// Ensure this script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing JavaScript for page loader, theme toggle, profile image flip, etc. should be here.
    // ... (Your existing script.js content goes here) ...

    // --- NEW: Volunteering Lightbox Functionality ---

    // Get references to the elements
    const openVolunteeringLightboxBtn = document.getElementById('open-volunteering-lightbox');
    const volunteeringLightbox = document.getElementById('volunteering-lightbox');
    const volunteeringLightboxClose = document.getElementById('volunteering-lightbox-close');
    const slider = volunteeringLightbox.querySelector('.image-slider');
    const images = slider.querySelectorAll('img');

    let currentSlide = 0;
    let sliderInterval; // Variable to hold the interval ID

    // Function to show a specific slide
    function showSlide(index) {
        // Ensure the index loops around if it goes out of bounds
        if (index >= images.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = images.length - 1;
        } else {
            currentSlide = index;
        }
        // Apply the transform to slide the images
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Function to advance to the next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Function to start the automatic slider
    function startSlider() {
        // Clear any existing interval to prevent multiple sliders running
        clearInterval(sliderInterval);
        // Start a new interval to change slides every 5 seconds (5000 milliseconds)
        sliderInterval = setInterval(nextSlide, 5000);
    }

    // Function to stop the automatic slider
    function stopSlider() {
        clearInterval(sliderInterval);
    }

    // Event listener to open the lightbox when "View Details" is clicked
    if (openVolunteeringLightboxBtn) {
        openVolunteeringLightboxBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            volunteeringLightbox.style.display = 'block'; // Show the lightbox
            showSlide(0); // Start with the first slide
            startSlider(); // Start the automatic slider
        });
    }

    // Event listener to close the lightbox when the close button is clicked
    if (volunteeringLightboxClose) {
        volunteeringLightboxClose.addEventListener('click', function() {
            volunteeringLightbox.style.display = 'none'; // Hide the lightbox
            stopSlider(); // Stop the automatic slider
        });
    }

    // Event listener to close the lightbox when clicking outside the content
    if (volunteeringLightbox) {
        volunteeringLightbox.addEventListener('click', function(event) {
            if (event.target === volunteeringLightbox) { // Check if the click was on the overlay itself
                volunteeringLightbox.style.display = 'none'; // Hide the lightbox
                stopSlider(); // Stop the automatic slider
            }
        });
    }
});
