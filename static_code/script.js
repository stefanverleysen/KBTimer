document.addEventListener('DOMContentLoaded', function() {
    let timer;
    let isRunning = false;
    let countdownSeconds = 0;
  
    const timerDisplay = document.getElementById('timer');
    const startStopBtn = document.getElementById('startStop');
    const resetBtn = document.getElementById('reset');
    const thirtySecondsBtn = document.getElementById('thirtySeconds');
    const twoMinutesBtn = document.getElementById('twoMinutes');
    const threeMinutesBtn = document.getElementById('threeMinutes');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const alarmSoundSelector = document.getElementById('alarmSoundSelector');
  
    function updateDisplay(minutes, seconds) {
      timerDisplay.innerText = pad(minutes) + ':' + pad(seconds);
    }
  
    function startTimer(duration) {
      countdownSeconds = duration;
      if (!isRunning) {
        timer = setInterval(updateTime, 1000);
        isRunning = true;
      }
      resetColor();
    }
  
    function updateTime() {
      let minutes = Math.floor(countdownSeconds / 60);
      let seconds = countdownSeconds % 60;
  
      updateDisplay(minutes, seconds);
      countdownSeconds--;
  
      if (countdownSeconds < 0) {
        clearInterval(timer);
        isRunning = false;
        playSelectedAudio();
      } else if (countdownSeconds <= 10) {
        timerDisplay.classList.add('red-text', 'blink-text');
      }
    }
  
    function resetTimer() {
      clearInterval(timer);
      updateDisplay(0, 0);
      isRunning = false;
      countdownSeconds = 0;
      resetColor();
    }
  
    function playSelectedAudio() {
      const selectedOption = alarmSoundSelector.options[alarmSoundSelector.selectedIndex].value;
      const audio = new Audio(selectedOption);
      audio.play();
    }
  
    function resetColor() {
      timerDisplay.classList.remove('red-text', 'blink-text');
    }
  
    startStopBtn.addEventListener('click', function() {
      if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        resetColor();
      } else {
        startTimer(countdownSeconds > 0 ? countdownSeconds : 60);
      }
    });
  
    resetBtn.addEventListener('click', resetTimer);
  
    thirtySecondsBtn.addEventListener('click', function() { startTimer(30); });
    twoMinutesBtn.addEventListener('click', function() { startTimer(120); });
    threeMinutesBtn.addEventListener('click', function() { startTimer(180); });
  
    function pad(number) {
      return number < 10 ? '0' + number : number;
    }
  
    fullscreenBtn.addEventListener('click', function() {
      const timerElement = document.getElementById('timer');
      if (timerElement.requestFullscreen) {
        timerElement.requestFullscreen();
      } else if (timerElement.mozRequestFullScreen) {
        timerElement.mozRequestFullScreen();
      } else if (timerElement.webkitRequestFullscreen) {
        timerElement.webkitRequestFullscreen();
      }
    });
  });
  