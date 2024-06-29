let timerElement = document.getElementById('timer');
let startBtn = document.getElementById('startBtn');
let pauseBtn = document.getElementById('pauseBtn');
let resetBtn = document.getElementById('resetBtn');

let startSound = document.getElementById('startSound');
let endSound = document.getElementById('endSound');

let totalTime = 15 * 60; // 15 minutos em segundos

let timeRemaining = totalTime;
let intervalId;
let isRunning = false;

function updateTimerDisplay() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    if (seconds < 10) seconds = '0' + seconds;
    timerElement.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startSound.play();
    intervalId = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            isRunning = false;
            endSound.play();
        } else {
            timeRemaining--;
            updateTimerDisplay();
        }
    }, 1000);
    toggleButtons();
}

function pauseTimer() {
    if (!isRunning) return;
    clearInterval(intervalId);
    isRunning = false;
    startSound.pause(); // Pausa a música quando pausado
    startSound.currentTime = 0; // Reinicia a música do começo
    toggleButtons();
}

function resetTimer() {
    clearInterval(intervalId);
    isRunning = true;
    timeRemaining = totalTime;
    updateTimerDisplay();
    startSound.pause(); // Pausa a música quando resetado
    startSound.currentTime = 0; // Reinicia a música do começo
    toggleButtons();
}

function toggleButtons() {
    startBtn.disabled = isRunning;
    pauseBtn.disabled = !isRunning;
    resetBtn.disabled = isRunning;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimerDisplay(); // Inicializa o display do cronômetro
toggleButtons(); // Inicializa os botões com os estados corretos