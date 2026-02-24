// 1. Manual Product Slider (Custom JS)
const slider = document.getElementById('product-slider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Only run if these elements exist to avoid errors
if (slider && nextBtn && prevBtn) {
    let currentIndex = 0;
    const itemsToShow = 2;
    const totalItems = slider.children.length;
    const maxIndex = totalItems - itemsToShow;

    function updateSlider() {
        const percentage = (currentIndex * 50);
        slider.style.transform = `translateX(-${percentage}%)`;
        prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
        nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) { currentIndex++; updateSlider(); }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) { currentIndex--; updateSlider(); }
    });

    updateSlider();
}

// 2. Main Jewelry Carousel (Swiper)
const mainJewelrySwiper = new Swiper('.main-jewelry-carousel', {
    loop: true,
    speed: 1200,
    grabCursor: true,
    keyboard: { enabled: true },
    autoplay: { delay: 5000, disableOnInteraction: false },
});

// 3. Category Swiper
const categorySwiper = new Swiper(".categorySwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    grabCursor: true,
    freeMode: true,
});

// 4. Jewelry Product Section Swiper (RENAMED to jewelrySwiper)
const jewelrySwiper = new Swiper('.myJewelrySwiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 }
    }
});

// 5. Reels Section Swiper (RENAMED to reelsSwiper)
const reelsSwiper = new Swiper('.reelSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    freeMode: true,
    speed: 10000,
    autoplay: {
        delay: 0, // Seamless loop
        disableOnInteraction: false
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 }
    }
});

// 6. Countdown Timer Logic
const targetDate = new Date("March 31, 2026 23:59:59").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const gap = targetDate - now;

    if (gap < 0) return; // Stop if date is passed

    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    document.querySelectorAll('.js-days').forEach(el => el.innerText = d);
    document.querySelectorAll('.js-hours').forEach(el => el.innerText = h);
    document.querySelectorAll('.js-mins').forEach(el => el.innerText = m);
    document.querySelectorAll('.js-secs').forEach(el => el.innerText = s);
};



setInterval(updateCountdown, 1000);
updateCountdown(); // Run immediately so it doesn't wait 1 second to show numbers


function closeModal() {
    const modal = document.getElementById('newsletter-modal');
    modal.style.display = 'none';
    
    // Logic for "Don't show again"
    const checkbox = document.getElementById('dont-show');
    if (checkbox.checked) {
      localStorage.setItem('hideNewsletter', 'true');
    }
  }

  // Check on page load
  window.onload = function() {
    if (localStorage.getItem('hideNewsletter') === 'true') {
      document.getElementById('newsletter-modal').style.display = 'none';
    }
  }

  