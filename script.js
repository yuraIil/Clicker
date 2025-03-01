let clicks = 0;
let timer = 10;
let interval = null;
let timerStarted = false;

const clickButton = document.querySelector(".click-button");
const timerDisplay = document.querySelector(".timer");
const resultDisplay = document.querySelector(".result");
const resetButton = document.querySelector(".reset");
const leaderboardTable = document.querySelector(".leaderboard tbody");

function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${timer.toFixed(1)} sec`;
}

function startTimer() {
    timerStarted = true;
    clickButton.textContent = "Tap";
    interval = setInterval(() => {
        timer -= 0.1;
        if (timer <= 0) {
            clearInterval(interval);
            timer = 0;
            clickButton.disabled = true;
            updateTimerDisplay();
            const cps = (clicks / 10).toFixed(2);
            resultDisplay.textContent = `Your CPS: ${cps} | Clicks: ${clicks}`;
            checkForHighScore(cps);
        } else {
            updateTimerDisplay();
        }
    }, 100);
}

clickButton.addEventListener("click", function() {
    if (!timerStarted) {
        clicks = 0;
        timer = 10;
        updateTimerDisplay();
        clickButton.disabled = false;
        startTimer();
    }
    clicks++;
});

resetButton.addEventListener("click", function() {
    clearInterval(interval);
    timerStarted = false;
    clicks = 0;
    timer = 10;
    updateTimerDisplay();
    resultDisplay.textContent = "";
    clickButton.textContent = "Start"; 
    clickButton.disabled = false;
});

// Функція перевірки та збереження рекордів
function checkForHighScore(cps) {
    let records = JSON.parse(localStorage.getItem("cpsRecords")) || [];

    if (records.length < 5 || cps > records[records.length - 1].score) {
        let name = prompt("Новий рекорд! Введіть ваше ім'я:") || "Anonymous";
        records.push({ name, score: parseFloat(cps) });
        records.sort((a, b) => b.score - a.score);
        records = records.slice(0, 5);
        localStorage.setItem("cpsRecords", JSON.stringify(records));
        displayRecords();
    }
}

// Функція для відображення рекордів
function displayRecords() {
    let records = JSON.parse(localStorage.getItem("cpsRecords")) || [];
    leaderboardTable.innerHTML = records
        .map((r, i) => `<tr><td>№${i + 1}</td><td>${r.name}</td><td>${r.score}</td></tr>`)
        .join("");
}

// Показати рекорди при завантаженні сторінки
displayRecords();
