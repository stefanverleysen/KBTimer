document.addEventListener('DOMContentLoaded', function () {
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
  
    // Array to store falling image elements
    const fallingImages = [];
  
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
        initiateFallingImagesAnimation();
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
  
    startStopBtn.addEventListener('click', function () {
      if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        resetColor();
      } else {
        startTimer(countdownSeconds > 0 ? countdownSeconds : 60);
      }
    });
  
    resetBtn.addEventListener('click', resetTimer);
  
    thirtySecondsBtn.addEventListener('click', function () {
      startTimer(30);
    });
    twoMinutesBtn.addEventListener('click', function () {
      startTimer(120);
    });
  
    function pad(number) {
      return number < 10 ? '0' + number : number;
    }
  
    // Fullscreen functionality for the timer
    fullscreenBtn.addEventListener('click', function () {
      if (!document.fullscreenElement && timerDisplay.requestFullscreen) {
        timerDisplay.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    });
  
    // Function to initiate falling images animation
    function initiateFallingImagesAnimation() {
      for (let i = 0; i < 20; i++) { // Change 20 to the number of images you want
        const img = document.createElement('img');
        img.src = 'images/jimtimesup.png'; // Using your specified image
        img.classList.add('falling-image');
        img.style.left = Math.random() * window.innerWidth + 'px'; // Randomize horizontal position
        document.body.appendChild(img);
  
        // Optional: Remove the image after animation ends
        setTimeout(() => {
          document.body.removeChild(img);
        }, 3000); // 3000 should match your animation duration in CSS
      }
    }
  });
  