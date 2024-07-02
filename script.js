// script.js

// Seleciona os elementos HTML pelo ID
let timerElement = document.getElementById('timer');
let startBtn = document.getElementById('startBtn');
let pauseBtn = document.getElementById('pauseBtn');
let resetBtn = document.getElementById('resetBtn');

// Seleciona os elementos de áudio pelo ID
let backgroundSound = document.getElementById('backgroundSound');
let tickTockSound = document.getElementById('tickTockSound');

// Define o tempo total do cronômetro em segundos (15 minutos = 15 * 60 segundos)
let totalTime = 15 * 60; // 15 minutos em segundos
let timeRemaining = totalTime; // Tempo restante começa igual ao tempo total
let intervalId; // ID do intervalo para o setInterval
let isRunning = false; // Estado do cronômetro, se está rodando ou não

// Atualiza a exibição do cronômetro no formato MM:SS
function updateTimerDisplay() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    if (seconds < 10) seconds = '0' + seconds;
    timerElement.textContent = `${minutes}:${seconds}`;
}

// Função para iniciar o cronômetro
function startTimer() {
    if (isRunning) return; // Se já está rodando, não faz nada
    isRunning = true; // Marca que o cronômetro está rodando
    backgroundSound.play(); // Toca a trilha sonora
    intervalId = setInterval(() => {
        if (timeRemaining <= 0) { // Se o tempo acabou
            clearInterval(intervalId); // Para o cronômetro
            isRunning = false; // Marca que o cronômetro não está mais rodando
            timeRemaining = 0; // Garante que o tempo restante não fique negativo
            updateTimerDisplay(); // Atualiza a exibição do cronômetro
            toggleButtons(); // Atualiza o estado dos botões
        } else {
            if (timeRemaining === 60) { // Se restar um minuto
                backgroundSound.pause(); // Pausa a trilha sonora
                tickTockSound.play(); // Toca o som de tic-tac (inclui alarme)
            }
            timeRemaining--; // Decrementa o tempo restante
            updateTimerDisplay(); // Atualiza a exibição do cronômetro
        }
    }, 1000); // Define o intervalo para 1 segundo
    toggleButtons(); // Atualiza o estado dos botões
}

// Função para pausar o cronômetro
function pauseTimer() {
    if (!isRunning) return; // Se não está rodando, não faz nada
    clearInterval(intervalId); // Para o cronômetro
    isRunning = false; // Marca que o cronômetro não está rodando
    backgroundSound.pause(); // Pausa a trilha sonora
    backgroundSound.currentTime = 0; // Reinicia a trilha sonora do começo
    tickTockSound.pause(); // Pausa o som de tic-tac
    tickTockSound.currentTime = 0; // Reinicia o som de tic-tac do começo
    toggleButtons(); // Atualiza o estado dos botões
}

// Função para resetar o cronômetro
function resetTimer() {
    clearInterval(intervalId); // Para o cronômetro
    isRunning = false; // Marca que o cronômetro não está rodando
    timeRemaining = totalTime; // Reseta o tempo restante
    updateTimerDisplay(); // Atualiza a exibição do cronômetro
    stopAllSounds(); // Para todos os sons
    toggleButtons(); // Atualiza o estado dos botões
}

// Função para parar todos os sons
function stopAllSounds() {
    backgroundSound.pause(); // Pausa a trilha sonora
    backgroundSound.currentTime = 0; // Reinicia a trilha sonora do começo
    tickTockSound.pause(); // Pausa o som de tic-tac
    tickTockSound.currentTime = 0; // Reinicia o som de tic-tac do começo
}

// Função para atualizar o estado dos botões
function toggleButtons() {
    startBtn.disabled = isRunning; // Desabilita o botão "Iniciar" se o cronômetro está rodando
    pauseBtn.disabled = !isRunning; // Desabilita o botão "Pausar" se o cronômetro não está rodando
    resetBtn.disabled = false; // Habilita o botão "Resetar" sempre
}

// Adiciona eventos de clique aos botões
startBtn.addEventListener('click', startTimer); // Inicia o cronômetro quando clicar no botão "Iniciar"
pauseBtn.addEventListener('click', pauseTimer); // Pausa o cronômetro quando clicar no botão "Pausar"
resetBtn.addEventListener('click', resetTimer); // Reseta o cronômetro quando clicar no botão "Resetar"

// Inicializa a exibição do cronômetro
updateTimerDisplay();

// Inicializa os botões com os estados corretos
toggleButtons();
