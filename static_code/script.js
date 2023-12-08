document.addEventListener('DOMContentLoaded', function() {
  let timer;
  let isRunning = false;
  let countdownSeconds = 0;

  const timerDisplay = document.getElementById('timer');
  const startStopBtn = document.getElementById('startStop');
  const resetBtn = document.getElementById('reset');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const thirtySecondsBtn = document.getElementById('thirtySeconds');
  const twoMinutesBtn = document.getElementById('twoMinutes');
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

  function pad(number) {
    return number < 10 ? '0' + number : number;
  }

  // Updated fullscreen button event listener
  fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      }
    }
  });
});
