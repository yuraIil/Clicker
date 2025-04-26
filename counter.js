// const incrementButton = document.getElementById('increment');
// const decrementButton = document.getElementById('decrement');

// const incrementButton750 = document.getElementById('increment-750');
// const decrementButton750 = document.getElementById('decrement-750');

// const resetButton = document.getElementById('reset');
const counterDisplay = document.getElementById('counter');
const achievementContainer = document.getElementById('achievement-container');

// const galleryButton = document.getElementById('gallery-button');
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
    "-10": { img: "images/pull.gif", text: "It's cold today " },
    "-20": { img: "images/frozen.gif", text: "Frozen solid " },
    "-30": { img: "images/ghost.gif", text: "Do you even exist? " },
    "-50": { img: "images/falling.gif", text: "Falling into the abyss..." },
    "-75": { img: "images/everyone.gif", text: "Hello? Anyone there?" },
    "-100": { img: "images/lost.gif", text: "You're completely lost..." },
    "-150": { img: "images/bacteria.gif", text: "You noclipped into the Backrooms" },
    "-200": { img: "images/darkness.gif", text: "You've entered the darkness " },
    "-300": { img: "images/portal.gif", text: "A portal has opened..." },
    "-500": { img: "images/segey.gif", text: "You broke reality! " },
    "-1000": {img: "images/updown.gif", text: "Everything is upside down"},
    "-10000": { img: "images/nextbot.gif", text: "You've reached the Infinite Void" },
    "-1000000": { img: "images/eyes.gif", text: "You awakened something ancient" }

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


// Кнопки для великого екрану
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const resetButton = document.getElementById('reset');
const galleryButton = document.getElementById('gallery-button');

// Кнопки для маленького екрану
const incrementButton750 = document.getElementById('increment-750');
const decrementButton750 = document.getElementById('decrement-750');
const resetButton750 = document.getElementById('reset-750');
const galleryButton750 = document.getElementById('gallery-button-750');

// Події для великого екрану
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

// Події для маленького екрану
incrementButton750.addEventListener('click', () => { counter++; updateCounter(); });
decrementButton750.addEventListener('click', () => { counter--; updateCounter(); });
resetButton750.addEventListener('click', () => { 
    counter = 0;
    unlockedAchievements = [];
    localStorage.setItem('counter', counter);
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    updateCounter();
    achievementContainer.innerHTML = '<img src="foto/cat.png" class="achievement-img" alt="Achievement">';
});
galleryButton750.addEventListener('click', () => galleryContainer.classList.remove("hidden"));




updateCounter();
updateGallery();

document.addEventListener('keydown', (event) => {
    // Видати всі ачивки (Ctrl + *)
    if (event.ctrlKey && event.key === '*') { 
        event.preventDefault();
        unlockedAchievements = Object.keys(achievements).map(Number);
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
        updateGallery();
    }

    // Видалити всі ачивки (Ctrl + Shift + *)
    if (event.ctrlKey && event.shiftKey && event.key === '*') { 
        event.preventDefault();
        unlockedAchievements = []; 
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
        updateGallery();
        achievementContainer.innerHTML = '<img src="foto/cat.png" class="achievement-img" alt="Achievement">';
    }
});





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


galleryButton.addEventListener('click', () => galleryContainer.classList.remove("hidden"));
closeGalleryButton.addEventListener('click', () => galleryContainer.classList.add("hidden"));
