/* script.js */
/* ─── Configuration ─── */
const memories = [
    // Specific countdown dates (15, 16, 17 August)
    { date: "2026-08-15", image: "WhatsApp Image 2026-08-04 at 11.15.24 PM.jpeg", title: "The Countdown Begins ❤️", message: "Every beautiful story has a beginning, and ours is my favorite." },
    { date: "2026-08-16", image: "images/day2.jpg", title: "Another Beautiful Memory ✨", message: "Every moment with you becomes a memory I never want to forget." },
    { date: "2026-08-17", image: "images/day3.jpg", title: "One More Sleep ❤️", message: "Tomorrow is your day, and I can't wait to celebrate you." },

    // Birthday entry (18 August)
    { date: "2026-08-18", image: "WhatsApp Image 2026-08-04 at 11.15.24 PM.jpeg", title: "Happy Birthday, My Love 🎂", message: "Today is all about celebrating you — the most beautiful person in my world." },

    // Extra memories for gallery (no date – always displayed in gallery on birthday)
    { date: "", image: "images/extra1.jpg", title: "Extra Memory 1 💖", message: "A little moment that means everything." },
    { date: "", image: "images/extra2.jpg", title: "Extra Memory 2 💘", message: "Your love is my greatest adventure." },
    { date: "", image: "images/extra3.jpg", title: "Extra Memory 3 💝", message: "With you, every day is a celebration." },
    { date: "", image: "images/extra4.jpg", title: "Extra Memory 4 🌸", message: "You make my heart skip a beat." },
    { date: "", image: "images/extra5.jpg", title: "Extra Memory 5 🦋", message: "Butterflies, every time I see you." },
    { date: "", image: "images/extra6.jpg", title: "Extra Memory 6 ✨", message: "You are the magic in my life." },
];

const MUSIC_URL = ""; // Optional: e.g., "audio/song.mp3"

// ─── DOM Elements ───
const dailySection = document.getElementById('daily-photo-section');
const birthdaySection = document.getElementById('birthday-section');
const gallerySection = document.getElementById('gallery-section');
const featuredGrid = document.getElementById('featured-grid');
const dailyPhotoFrame = document.getElementById('daily-photo-frame');
const dailyPhotoImg = document.getElementById('daily-photo-img');
const dailyPhotoPlaceholder = document.getElementById('daily-photo-placeholder');
const dailyPhotoDate = document.getElementById('daily-photo-date');
const dailyPhotoTitle = document.getElementById('daily-photo-title');
const dailyPhotoMessage = document.getElementById('daily-photo-message');
const birthdayPhotoFrame = document.getElementById('birthday-photo-frame');
const birthdayPhotoImg = document.getElementById('birthday-photo-img');
const birthdayPhotoPlaceholder = document.getElementById('birthday-photo-placeholder');
const birthdayMessage = document.getElementById('birthday-message');
const galleryMasonry = document.getElementById('gallery-masonry');
const lightboxOverlay = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxDate = document.getElementById('lightbox-date');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMessage = document.getElementById('lightbox-message');
const lightboxCounter = document.getElementById('lightbox-counter');
const fireworksCanvas = document.getElementById('fireworks-canvas');
const balloonsContainer = document.getElementById('balloons-container');
const floatingHearts = document.getElementById('floating-hearts');
const musicToggle = document.getElementById('music-toggle');
const musicIconPlay = document.getElementById('music-icon-play');
const musicIconPause = document.getElementById('music-icon-pause');
const countdownDays = document.getElementById('countdown-days');
const countdownHours = document.getElementById('countdown-hours');
const countdownMinutes = document.getElementById('countdown-minutes');
const countdownSeconds = document.getElementById('countdown-seconds');
const countdownMessage = document.getElementById('countdown-message');
const countdownTargetDate = document.getElementById('countdown-target-date');

let currentGalleryIndex = 0;
let galleryItems = [];
let lightboxOpen = false;
let audioPlayer = null;

// ─── Utility Functions ───
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

function getTodayMonthDay() {
    const now = new Date();
    return `${now.getMonth() + 1}/${now.getDate()}`; // e.g., "8/15"
}

function getMemoryByMonthDay(monthDay) {
    const [month, day] = monthDay.split('/').map(Number);
    return memories.find(mem => {
        if (!mem.date) return false;
        const [year, m, d] = mem.date.split('-').map(Number);
        return m === month && d === day;
    });
}

function formatDateForDisplay(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ❤️`;
}

// ─── Countdown Timer ───
function getNextBirthday() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, 7, 18); // August 18 (month index 7)
    if (target < now) {
        target = new Date(currentYear + 1, 7, 18);
    }
    return target;
}

function updateCountdown() {
    const target = getNextBirthday();
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
        countdownDays.textContent = '00';
        countdownHours.textContent = '00';
        countdownMinutes.textContent = '00';
        countdownSeconds.textContent = '00';
        countdownMessage.textContent = "🎉 It's your birthday! Happy Birthday! 🎉";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownDays.textContent = formatNumber(days);
    countdownHours.textContent = formatNumber(hours);
    countdownMinutes.textContent = formatNumber(minutes);
    countdownSeconds.textContent = formatNumber(seconds);
    countdownMessage.textContent = days <= 3 ? `Only ${days} day${days !== 1 ? 's' : ''} left! ❤️` : "Counting every moment until your special day...";
}

// ─── Daily Photo Display ───
function showDailyPhoto(memory) {
    dailySection.style.display = 'block';
    dailyPhotoImg.src = memory.image;
    dailyPhotoImg.alt = memory.title;
    
    // Show today's date
    const today = new Date();
    dailyPhotoDate.textContent = formatDateForDisplay(today);
    dailyPhotoTitle.textContent = memory.title;
    dailyPhotoMessage.textContent = memory.message;
    
    dailyPhotoPlaceholder.style.display = 'none';
    dailyPhotoImg.style.display = 'block';
    dailyPhotoImg.onerror = function() {
        dailyPhotoImg.style.display = 'none';
        dailyPhotoPlaceholder.style.display = 'flex';
    };
    dailySection.classList.add('visible');
}

// ─── Birthday Section Display ───
function showBirthday() {
    const birthdayMemory = memories.find(mem => mem.date === "2026-08-18") || memories.find(mem => mem.image.includes('WhatsApp'));
    birthdaySection.style.display = 'block';
    gallerySection.style.display = 'block';
    birthdayPhotoImg.src = birthdayMemory.image;
    birthdayPhotoImg.alt = birthdayMemory.title;
    birthdayPhotoPlaceholder.style.display = 'none';
    birthdayPhotoImg.style.display = 'block';
    birthdayPhotoImg.onerror = function() {
        birthdayPhotoImg.style.display = 'none';
        birthdayPhotoPlaceholder.style.display = 'flex';
    };
    birthdayMessage.textContent = birthdayMemory.message;
    birthdaySection.classList.add('visible');
    gallerySection.classList.add('visible');

    buildGallery();
    startFireworks();
    spawnBalloons();
    spawnBirthdayHeartParticles();
}

// ─── Featured Memories ───
function buildFeaturedMemories() {
    // Take the first 6 memories that are not the dated countdown/birthday entries
    const featured = memories.filter(mem => !mem.date).slice(0, 6);
    featuredGrid.innerHTML = '';
    featured.forEach((mem) => {
        const div = document.createElement('div');
        div.className = 'featured-item';
        div.innerHTML = `
            <img src="${mem.image}" alt="${mem.title}" loading="lazy">
            <div class="featured-caption">
                <h4>${mem.title}</h4>
                <p>${mem.message}</p>
            </div>
        `;
        div.addEventListener('click', () => {
            const fullIndex = memories.indexOf(mem);
            if (fullIndex > -1) openLightbox(fullIndex);
        });
        featuredGrid.appendChild(div);
    });
}

// ─── Gallery ───
function buildGallery() {
    galleryMasonry.innerHTML = '';
    galleryItems = [];
    memories.forEach((mem, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${mem.image}" alt="${mem.title}" loading="lazy">
            <div class="gallery-caption-overlay">
                <h4>${mem.title}</h4>
                <p>${mem.message}</p>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(index));
        galleryMasonry.appendChild(item);
        galleryItems.push(item);
    });
}

// ─── Lightbox ───
function openLightbox(index) {
    currentGalleryIndex = index;
    lightboxOpen = true;
    updateLightbox();
    lightboxOverlay.style.display = 'flex';
    requestAnimationFrame(() => {
        lightboxOverlay.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    lightboxOpen = false;
    setTimeout(() => {
        lightboxOverlay.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

function updateLightbox() {
    const mem = memories[currentGalleryIndex];
    lightboxImg.src = mem.image;
    lightboxImg.alt = mem.title;
    lightboxDate.textContent = mem.date ? formatDateForDisplay(new Date(mem.date + 'T00:00:00')) : "A Beautiful Memory";
    lightboxTitle.textContent = mem.title;
    lightboxMessage.textContent = mem.message;
    lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${memories.length}`;
    lightboxImg.onerror = function() {
        lightboxImg.src = '';
        lightboxImg.alt = "Photo missing";
    };
}

function showPrevPhoto() {
    currentGalleryIndex = (currentGalleryIndex - 1 + memories.length) % memories.length;
    updateLightbox();
}

function showNextPhoto() {
    currentGalleryIndex = (currentGalleryIndex + 1) % memories.length;
    updateLightbox();
}

// ─── Fireworks ───
function startFireworks() {
    fireworksCanvas.classList.add('active');
    const ctx = fireworksCanvas.getContext('2d');
    let particles = [];
    const maxParticles = 120;

    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 4 + 2;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            this.color = `hsl(${Math.random() * 60 + 320}, 100%, 70%)`;
            this.radius = Math.random() * 3 + 1;
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.life -= this.decay;
            this.speed *= 0.99;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function createExplosion(x, y) {
        const count = Math.floor(Math.random() * 40 + 30);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y));
        }
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        if (Math.random() < 0.05) {
            createExplosion(
                Math.random() * fireworksCanvas.width,
                Math.random() * fireworksCanvas.height * 0.6
            );
        }

        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.update();
            p.draw(ctx);
        });

        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createExplosion(
                Math.random() * fireworksCanvas.width,
                Math.random() * fireworksCanvas.height * 0.6
            );
        }, i * 200);
    }
}

// ─── Balloons ───
function spawnBalloons() {
    const colors = ['#ff4d9d', '#ff9ecd', '#ffb6d9', '#ff85c2', '#ff6db3', '#ff2d78'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = Math.random() * 90 + '%';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.width = Math.random() * 40 + 40 + 'px';
            balloon.style.height = Math.random() * 60 + 50 + 'px';
            balloon.style.animationDuration = Math.random() * 8 + 8 + 's';
            balloon.style.animationDelay = Math.random() * 5 + 's';
            balloonsContainer.appendChild(balloon);
            setTimeout(() => balloon.remove(), 16000);
        }, i * 300);
    }
}

// ─── Floating Hearts Background ───
function spawnFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = ['❤️', '💖', '💕', '💗', '💘'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.animationDuration = Math.random() * 8 + 6 + 's';
        floatingHearts.appendChild(heart);
        setTimeout(() => heart.remove(), 15000);
    }, 800);
}

// ─── Birthday Heart Particles ───
function spawnBirthdayHeartParticles() {
    const container = document.getElementById('birthday-heart-particles');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = ['❤️', '💖', '💕'][Math.floor(Math.random() * 3)];
        heart.style.left = Math.random() * 90 + '%';
        heart.style.top = Math.random() * 90 + '%';
        heart.style.fontSize = Math.random() * 22 + 16 + 'px';
        heart.style.animationDuration = Math.random() * 4 + 3 + 's';
        heart.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(heart);
    }
}

// ─── Music Toggle ───
function initMusic() {
    if (!MUSIC_URL) return;

    audioPlayer = new Audio(MUSIC_URL);
    audioPlayer.loop = true;
    audioPlayer.volume = 0.5;

    musicToggle.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play().catch(() => {});
            musicToggle.classList.add('playing');
            musicIconPlay.style.display = 'none';
            musicIconPause.style.display = 'block';
        } else {
            audioPlayer.pause();
            musicToggle.classList.remove('playing');
            musicIconPlay.style.display = 'block';
            musicIconPause.style.display = 'none';
        }
    });
}

// ─── Lightbox Event Listeners ───
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', showPrevPhoto);
document.getElementById('lightbox-next').addEventListener('click', showNextPhoto);

document.addEventListener('keydown', (e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevPhoto();
    if (e.key === 'ArrowRight') showNextPhoto();
});

lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
});

// ─── Initialize on Load ───
function init() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    countdownTargetDate.textContent = '18 August 2026';

    // Always build featured memories
    buildFeaturedMemories();

    const monthDay = getTodayMonthDay();

    if (monthDay === '8/18') {
        showBirthday();
    } else {
        const todayMemory = getMemoryByMonthDay(monthDay);
        if (todayMemory) {
            showDailyPhoto(todayMemory);
        } else {
            // Not on 15, 16, 17 or 18 – hide daily and birthday sections
            dailySection.style.display = 'none';
            birthdaySection.style.display = 'none';
            gallerySection.style.display = 'none';
        }
    }

    spawnFloatingHearts();
    initMusic();

    setTimeout(() => {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('visible');
        });
    }, 100);
}

// ─── Start ───
document.addEventListener('DOMContentLoaded', init);