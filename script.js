
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




const mainSwiper = new Swiper('.main-jewelry-carousel', {
    loop: true,
    speed: 1200,
    grabCursor: true,
    keyboard: { enabled: true },
    effect: 'slide',

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


const categorySwiper = new Swiper(".categorySwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    grabCursor: true,
    freeMode: true,
});

// Timer For section
const targetDate = new Date("march 31, 2026 23:59:59").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const gap = targetDate - now;

            // Math for time units
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const d = Math.floor(gap / day);
            const h = Math.floor((gap % day) / hour);
            const m = Math.floor((gap % hour) / minute);
            const s = Math.floor((gap % minute) / second);

            // Update every card at once
            document.querySelectorAll('.js-days').forEach(el => el.innerText = d);
            document.querySelectorAll('.js-hours').forEach(el => el.innerText = h);
            document.querySelectorAll('.js-mins').forEach(el => el.innerText = m);
            document.querySelectorAll('.js-secs').forEach(el => el.innerText = s);
        };

        setInterval(updateCountdown, 1000);



        

