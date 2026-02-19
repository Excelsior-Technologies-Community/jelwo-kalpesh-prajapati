
const slider = document.getElementById('product-slider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentIndex = 0;
const itemsToShow = 2; // Number of items visible at once
const totalItems = slider.children.length;
const maxIndex = totalItems - itemsToShow;

function updateSlider() {
    // Calculate movement: (Width of one item + gap) * index
    // Since we use flex gap-4 (16px), we account for that
    const percentage = (currentIndex * 50);
    slider.style.transform = `translateX(-${percentage}%)`;

    // Optional: Style buttons when at start or end
    prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
    nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

// Initialize button state
updateSlider();





const swiper = new Swiper('.main-jewelry-carousel', {
    loop: true,
    speed: 1200,
    grabCursor: true, // Enables dragging with mouse
    keyboard: {
        enabled: true, // Enables Arrow keys
    },
    effect: 'slide', // Smooth cross-fade between background images
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

