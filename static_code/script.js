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
      // Check if the selected audio is "Gentlemen's Voice"
      const selectedOption = alarmSoundSelector.options[alarmSoundSelector.selectedIndex].value;
      if (selectedOption === 'Audio/manvoice.mp3') {
        // Initiate falling images animation
        initiateFallingImagesAnimation();
      }
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
    // Create and append falling image elements
    for (let i = 0; i < 10; i++) {
      const img = document.createElement('img');
      img.src = 'images/jimtimesup.png';
      img.classList.add('falling-image');
      document.body.appendChild(img);
      fallingImages.push(img);
    }

    // Start the falling animation
    animateFallingImages();
  }

  // Function to animate falling images
  function animateFallingImages() {
    fallingImages.forEach((img, index) => {
      const animationDuration = 5 + Math.random() * 5 + 's'; // Randomize animation duration
      img.style.animation = `fall ${animationDuration} linear`;
      img.style.left = Math.random() * window.innerWidth + 'px'; // Randomize horizontal position
      img.style.opacity = '1'; // Make the image visible
      img.style.transform = 'translateY(100vh)'; // Move the image to the bottom of the viewport

      // Remove the image from the DOM after animation ends
      img.addEventListener('animationend', () => {
        img.remove();
        fallingImages.splice(index, 1);
      });
    });
  }
});
