// BMW Data
const bmwData = {
    m5: {
        title: 'BMW <span>M5 F90</span>',
        sub: 'SPORTS SEDAN',
        badgeClass: 'PERFORMANCE',
        badgeYear: 'COMPETITION',
        desc: 'The legend of the M division featuring M xDrive all-wheel drive and a 4.4-liter V8 TwinPower Turbo engine.',
        accel: '3.3',
        power: '625',
        speed: '305',
        images: {
            frozen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVh5nsx_vVWTjJOGeNwHX8yxCMaIwPYcGeqX2avD9EQ&s=10',
            blue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQShYLnqumM6HRzSTvPQP0pSuFvW67-bbbfXdPKrBhAMA&s=10',
            red: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq9Ucue7xk-KKv8PPr_RzjtlSl6bZ31SCRsiESwcbTfw&s=10'
        }
    },
    i8: {
        title: 'BMW <span>i8</span>',
        sub: 'HYBRID SPORTS CAR',
        badgeClass: 'HYBRID SPORT',
        badgeYear: 'FUTURE ICON',
        desc: 'Innovative hybrid sports car featuring butterfly doors and a full carbon-fiber monocoque chassis.',
        accel: '4.4',
        power: '374',
        speed: '250',
        images: {
            frozen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxms7A_FIveQYaas88Rm86uALUjMXvj5AETAr5repCWQ&s=10',
            blue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN1fdZSRFdvC1kEhdq7fWuDKkiCZofLC9YPmWSG73tag&s=10',
            red: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHF3K01PVppfH2bY9Tq5816MGl7YnbgYbvzbqL7-fiWw&s=10'
        }
    },
    x7: {
        title: 'BMW <span>X7</span>',
        sub: 'FLAGSHIP SUV',
        badgeClass: 'SAV LUXURY',
        badgeYear: '7-SEATER',
        desc: 'Ultimate luxury experience, offering 7 spacious seats and supreme comfort paired with twin-turbo power.',
        accel: '4.7',
        power: '530',
        speed: '250',
        images: {
            frozen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjdUcakTpyYqTCV26dzJPDpYuSekr2uNbFR7wlLEELAg&s=10',
            blue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9mXKxyXBgj5ZODJ_oKNMi4NOND8IuBr4LWmQrBAsZ7MVWU0l9FGj2RJo&s=10',
            red: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHXHAmeB8hEhgNOPQ5yL5hoJmMBLf4CErbkVu3cN-y-g&s=10'
        }
    }
};

const modelKeys = ['m5', 'i8', 'x7'];
let currentIndex = 0;
let currentColor = 'frozen';

const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');
const colorBtns = document.querySelectorAll('.color-btn');
const fadeElements = document.querySelectorAll('.fade-element');

// Update UI display with Smooth Animation
function updateDisplay(isColorChange = false) {
    const modelKey = modelKeys[currentIndex];
    const data = bmwData[modelKey];

    if (!data) return;

    // Update active thumb
    thumbs.forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-model') === modelKey);
    });

    if (isColorChange) {
        if (data.images[currentColor]) {
            mainImage.src = data.images[currentColor];
        }
        return;
    }

    // Smooth fade out
    fadeElements.forEach(el => {
        el.classList.remove('fade-in');
        el.classList.add('fade-out');
    });

    setTimeout(() => {
        // Swap content
        mainImage.src = data.images[currentColor] || data.images.frozen;
        document.getElementById('modelTitle').innerHTML = data.title;
        document.getElementById('modelSub').textContent = data.sub;
        document.getElementById('modelClassBtn').textContent = data.badgeClass;
        document.getElementById('modelYearBtn').textContent = data.badgeYear;
        document.getElementById('modelDesc').textContent = data.desc;

        document.getElementById('specAccel').innerHTML = `${data.accel} <small>sec</small>`;
        document.getElementById('specPower').innerHTML = `${data.power} <small>hp</small>`;
        document.getElementById('specSpeed').innerHTML = `${data.speed} <small>km/h</small>`;

        // Smooth fade in
        fadeElements.forEach(el => {
            el.classList.remove('fade-out');
            el.classList.add('fade-in');
        });
    }, 250);
}

// Arrow Navigation Events
document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + modelKeys.length) % modelKeys.length;
    updateDisplay(false);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % modelKeys.length;
    updateDisplay(false);
});

// Thumbnails Click Event
thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const selectedModel = thumb.getAttribute('data-model');
        currentIndex = modelKeys.indexOf(selectedModel);
        updateDisplay(false);
    });
});

// Color Picker Click Event
colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentColor = btn.getAttribute('data-color');
        updateDisplay(true);
    });
});

// Navbar Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const targetId = link.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// Likes System
const likeBtn = document.getElementById('likeBtn');
const likesCount = document.getElementById('likesCount');
let likes = 1425;
let isLiked = false;

likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    likes += isLiked ? 1 : -1;
    likeBtn.classList.toggle('active', isLiked);
    likesCount.textContent = likes.toLocaleString();
});

// Coming Soon Screen Trigger (Clicking any top badge)
const modelClassBtn = document.getElementById('modelClassBtn');
const modelYearBtn = document.getElementById('modelYearBtn');
const comingSoonScreen = document.getElementById('comingSoonScreen');
const backBtn = document.getElementById('backBtn');

function openComingSoon() {
    comingSoonScreen.classList.remove('hidden');
}

if (modelClassBtn) modelClassBtn.addEventListener('click', openComingSoon);
if (modelYearBtn) modelYearBtn.addEventListener('click', openComingSoon);

backBtn.addEventListener('click', () => {
    comingSoonScreen.classList.add('hidden');
});
