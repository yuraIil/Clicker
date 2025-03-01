const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const resetButton = document.getElementById('reset');
const counterDisplay = document.getElementById('counter');
const achievementContainer = document.getElementById('achievement-container');

const galleryButton = document.getElementById('gallery-button');
const galleryContainer = document.getElementById('gallery-container');
const galleryItems = document.getElementById('gallery-items');
const closeGalleryButton = document.getElementById('close-gallery');

let counter = parseInt(localStorage.getItem('counter')) || 0;
let unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];

const achievements = {
    10: { img: "images/clearing.gif", text: "Cleaned 10 times!" },
    20: { img: "images/lion.gif", text: "Lion's endurance!" },
    40: { img: "images/am.gif", text: "Knock-knock!" },
    50: { img: "images/sorry.gif", text: "50 clicks – Why so many?" },
    100: { img: "images/a.gif", text: "100 clicks?!" },
    150: { img: "images/bender.gif", text: "Bender approves!" },
    200: { img: "images/pinki.gif", text: "Chaos in the head!" },
    300: { img: "images/bom.gif", text: "I'm in your walls!" },
    400: { img: "images/kitty.gif", text: "Cute clicker!" },
    500: { img: "images/rick.gif", text: "Never Gonna Give You Up!" },
    1000: { img: "images/1000-7.gif", text: "1000-7?" },
    10000: { img: "images/kupa.gif", text: "LEGENDARY " },
    1000000: { img: "images/buzz.gif", text: "Are u cheater?" },

};

function updateCounter() {
    counterDisplay.textContent = counter;
    localStorage.setItem('counter', counter);
    checkAchievement(counter);
}

function checkAchievement(value) {
    if (achievements[value] && !unlockedAchievements.includes(value)) {
        unlockedAchievements.push(value);
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
        showAchievement(achievements[value].img);
        updateGallery();
    }
}

function showAchievement(imgSrc) {
    achievementContainer.innerHTML = `<img src="${imgSrc}" class="achievement-img">`;
}

function updateGallery() {
    galleryItems.innerHTML = '';
    unlockedAchievements.forEach(value => {
        const { img, text } = achievements[value];

        const item = document.createElement("div");
        item.classList.add("gallery-item");
        item.innerHTML = `<img src="${img}" class="gallery-img"><p>${text}</p>`;

        galleryItems.appendChild(item);
    });
}

incrementButton.addEventListener('click', () => { counter++; updateCounter(); });
decrementButton.addEventListener('click', () => { counter--; updateCounter(); });
resetButton.addEventListener('click', () => { 
    counter = 0; 
    unlockedAchievements = []; 
    localStorage.setItem('counter', counter);
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    updateCounter();
    achievementContainer.innerHTML = '<img src="foto/cat.png" class="achievement-img" alt="Achievement">';
});

galleryButton.addEventListener('click', () => galleryContainer.classList.remove("hidden"));
closeGalleryButton.addEventListener('click', () => galleryContainer.classList.add("hidden"));

// Завантажуємо збережені дані при старті
updateCounter();
updateGallery();

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === '*') { // Ctrl + L (мале "L")
        event.preventDefault(); // Блокуємо стандартну дію браузера
        unlockedAchievements = Object.keys(achievements).map(Number);
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
        updateGallery();
    }

    
});


