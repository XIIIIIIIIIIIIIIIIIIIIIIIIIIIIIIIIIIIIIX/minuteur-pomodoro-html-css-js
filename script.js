document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const sessionBtn = document.getElementById('sessionBtn');
    const breakBtn = document.getElementById('breakBtn');
    const timerText = document.querySelector('.timer-text');
    const timerCircle = document.querySelector('.timer-circle');
    
    const SESSION_TIME = 25 * 60;
    const BREAK_TIME = 5 * 60;
    
    let currentTime = SESSION_TIME;
    let isRunning = false;
    let timerId = null;
    let isSession = true;
    let circumference = 2 * Math.PI * 140;
    
    timerCircle.style.strokeDasharray = circumference;
    timerCircle.style.stroke = '#34D399';
    updateCircle();
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }
    
    function updateCircle() {
        const totalTime = isSession ? SESSION_TIME : BREAK_TIME;
        const offset = circumference - (currentTime / totalTime) * circumference;
        timerCircle.style.strokeDashoffset = offset;
    }
    
    function updateDisplay() {
        timerText.textContent = formatTime(currentTime);
        updateCircle();
    }
    
    function startTimer() {
        if (isRunning) return;
        
        isRunning = true;
        timerId = setInterval(() => {
            currentTime--;
            updateDisplay();
            
            if (currentTime <= 0) {
                clearInterval(timerId);
                isRunning = false;
                switchMode();
            }
        }, 1000);
    }
    
    function pauseTimer() {
        if (!isRunning) return;
        
        clearInterval(timerId);
        isRunning = false;
    }
    
    function resetTimer() {
        pauseTimer();
        isSession = true;
        currentTime = SESSION_TIME;
        updateDisplay();
        updateModeButtons();
        timerCircle.style.stroke = '#34D399';
    }
    
    function switchMode() {
        isSession = !isSession;
        currentTime = isSession ? SESSION_TIME : BREAK_TIME;
        timerCircle.style.stroke = isSession ? '#34D399' : '#F87171';
        updateModeButtons();
        startTimer();
    }
    
    function updateModeButtons() {
        sessionBtn.classList.toggle('active-mode', isSession);
        breakBtn.classList.toggle('break-mode', !isSession);
        sessionBtn.classList.toggle('active-mode', isSession);
        breakBtn.classList.toggle('break-mode', !isSession);
    }
    
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    sessionBtn.addEventListener('click', () => {
        if (isSession) return;
        resetTimer();
    });
    breakBtn.addEventListener('click', () => {
        if (!isSession) return;
        pauseTimer();
        isSession = false;
        currentTime = BREAK_TIME;
        timerCircle.style.stroke = '#F87171';
        updateDisplay();
        updateModeButtons();
    });
    
    updateDisplay();
});