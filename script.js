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
    const slider = volunteeringLightbox ? volunteeringLightbox.querySelector('.image-slider') : null;
    const images = slider ? slider.querySelectorAll('img') : [];

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
            if (volunteeringLightbox) {
                volunteeringLightbox.style.display = 'block'; // Show the lightbox
                if (images.length > 0) {
                    showSlide(0); // Start with the first slide
                    startSlider(); // Start the automatic slider
                }
            }
        });
    }

    // Event listener to close the lightbox when the close button is clicked
    if (volunteeringLightboxClose) {
        volunteeringLightboxClose.addEventListener('click', function() {
            if (volunteeringLightbox) {
                volunteeringLightbox.style.display = 'none'; // Hide the lightbox
                stopSlider(); // Stop the automatic slider
            }
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

    // --- UMS Project Lightbox Functionality ---

    // Get references to the UMS lightbox elements
    const openUmsLightboxBtn = document.getElementById('open-ums-lightbox');
    const umsLightbox = document.getElementById('ums-lightbox');
    const umsLightboxClose = document.getElementById('ums-lightbox-close');

    // Event listener to open the UMS lightbox when "View Details" is clicked
    if (openUmsLightboxBtn) {
        openUmsLightboxBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            if (umsLightbox) {
                umsLightbox.style.display = 'block'; // Show the lightbox
            }
        });
    }

    // Event listener to close the UMS lightbox when the close button is clicked
    if (umsLightboxClose) {
        umsLightboxClose.addEventListener('click', function() {
            if (umsLightbox) {
                umsLightbox.style.display = 'none'; // Hide the lightbox
            }
        });
    }

    // Event listener to close the UMS lightbox when clicking outside the content
    if (umsLightbox) {
        umsLightbox.addEventListener('click', function(event) {
            if (event.target === umsLightbox) { // Check if the click was on the overlay itself
                umsLightbox.style.display = 'none'; // Hide the lightbox
            }
        });
    }

    // Close UMS lightbox with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && umsLightbox && umsLightbox.style.display === 'block') {
            umsLightbox.style.display = 'none';
        }
    });

    // --- CST Community Lightbox Functionality ---

    // Get references to the CST lightbox elements
    const openCstLightboxBtn = document.getElementById('open-cst-lightbox');
    const cstLightbox = document.getElementById('cst-lightbox');
    const cstLightboxClose = document.getElementById('cst-lightbox-close');

    // Event listener to open the CST lightbox when "View Details" is clicked
    if (openCstLightboxBtn) {
        openCstLightboxBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            if (cstLightbox) {
                cstLightbox.style.display = 'block'; // Show the lightbox
            }
        });
    }

    // Event listener to close the CST lightbox when the close button is clicked
    if (cstLightboxClose) {
        cstLightboxClose.addEventListener('click', function() {
            if (cstLightbox) {
                cstLightbox.style.display = 'none'; // Hide the lightbox
            }
        });
    }

    // Event listener to close the CST lightbox when clicking outside the content
    if (cstLightbox) {
        cstLightbox.addEventListener('click', function(event) {
            if (event.target === cstLightbox) { // Check if the click was on the overlay itself
                cstLightbox.style.display = 'none'; // Hide the lightbox
            }
        });
    }

    // Close CST lightbox with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && cstLightbox && cstLightbox.style.display === 'block') {
            cstLightbox.style.display = 'none';
        }
    });

    // --- Java Course Lightbox Functionality ---

    // Get references to the Java lightbox elements
    const openJavaLightboxBtn = document.getElementById('open-java-lightbox');
    const javaLightbox = document.getElementById('java-lightbox');
    const javaLightboxClose = document.getElementById('java-lightbox-close');

    // Event listener to open the Java lightbox when "View Course" is clicked
    if (openJavaLightboxBtn) {
        openJavaLightboxBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            if (javaLightbox) {
                javaLightbox.style.display = 'block'; // Show the lightbox
            }
        });
    }

    // Event listener to close the Java lightbox when the close button is clicked
    if (javaLightboxClose) {
        javaLightboxClose.addEventListener('click', function() {
            if (javaLightbox) {
                javaLightbox.style.display = 'none'; // Hide the lightbox
            }
        });
    }

    // Event listener to close the Java lightbox when clicking outside the content
    if (javaLightbox) {
        javaLightbox.addEventListener('click', function(event) {
            if (event.target === javaLightbox) { // Check if the click was on the overlay itself
                javaLightbox.style.display = 'none'; // Hide the lightbox
            }
        });
    }

    // Close Java lightbox with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && javaLightbox && javaLightbox.style.display === 'block') {
            javaLightbox.style.display = 'none';
        }
    });

    // --- Earthquake Fundraiser Lightbox Functionality ---

    // Get references to the Earthquake lightbox elements
    const openEarthquakeLightboxBtn = document.getElementById('open-earthquake-lightbox');
    const earthquakeLightbox = document.getElementById('earthquake-lightbox');
    const earthquakeLightboxClose = document.getElementById('earthquake-lightbox-close');

    // Event listener to open the Earthquake lightbox when "View Details" is clicked
    if (openEarthquakeLightboxBtn) {
        openEarthquakeLightboxBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            if (earthquakeLightbox) {
                earthquakeLightbox.style.display = 'block'; // Show the lightbox
            }
        });
    }

    // Event listener to close the Earthquake lightbox when the close button is clicked
    if (earthquakeLightboxClose) {
        earthquakeLightboxClose.addEventListener('click', function() {
            if (earthquakeLightbox) {
                earthquakeLightbox.style.display = 'none'; // Hide the lightbox
            }
        });
    }

    // Event listener to close the Earthquake lightbox when clicking outside the content
    if (earthquakeLightbox) {
        earthquakeLightbox.addEventListener('click', function(event) {
            if (event.target === earthquakeLightbox) { // Check if the click was on the overlay itself
                earthquakeLightbox.style.display = 'none'; // Hide the lightbox
            }
        });
    }

    // Close Earthquake lightbox with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && earthquakeLightbox && earthquakeLightbox.style.display === 'block') {
            earthquakeLightbox.style.display = 'none';
        }
    });
});
