document.addEventListener('DOMContentLoaded', function() {
  let timer;
  let isRunning = false;
  let countdownSeconds = 0;
  const timerDisplay = document.getElementById('timer');
  const startStopBtn = document.getElementById('startStop');
  const resetBtn = document.getElementById('reset');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const tenSecondsBtn = document.getElementById('tenSeconds');
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

  tenSecondsBtn.addEventListener('click', function() {
    startTimer(10); 
  });

  thirtySecondsBtn.addEventListener('click', function() {
    startTimer(30);
  });

  twoMinutesBtn.addEventListener('click', function() {
    startTimer(120); 
  });

  function pad(number) {
    return number < 10 ? '0' + number : number;
  }

  function initiateFallingImagesAnimation() {
    const selectedOption = alarmSoundSelector.options[alarmSoundSelector.selectedIndex].value;
  
    // Check if the selected audio is "General Moore"
    if (selectedOption === 'Audio/manvoice.mp3') {
      const img = document.createElement('img');
      img.src = 'images/jimtimesup.png'; // Image for General Moore  
      img.classList.add('falling-image');
      document.body.appendChild(img);
  
      setTimeout(() => {
        img.style.animation = 'none'; // Remove the animation
        void img.offsetWidth; // Trigger a reflow to apply the style change immediately
        img.style.animation = 'growAndShrink 10s forwards'; // Re-add the animation
      }, 100);  // Short delay
  
      img.addEventListener('animationend', () => {
        img.remove(); // Removes the image after animation  
      });
    }
    
     // Check if the selected audio is "Korean"
     if (selectedOption === 'Audio/korean-i-luv-u.mp3') {
      const img = document.createElement('img');
      img.src = 'images/koreanboyband.png'; // Image of Koreans  
      img.classList.add('falling-image');
      document.body.appendChild(img);
  
      setTimeout(() => {
        img.style.animation = 'none'; // Remove the animation
        void img.offsetWidth; // Trigger a reflow to apply the style change immediately
        img.style.animation = 'growAndShrink 10s forwards'; // Re-add the animation
      }, 100);  // Short delay
  
      img.addEventListener('animationend', () => {
        img.remove(); // Removes the image after animation  
      });
    }
    // Check if the selected audio is "Wolf Howl"
    else if (selectedOption === 'Audio/wolf5.mp3') {
      const img = document.createElement('img');
      img.src = 'images/wolf.png'; // Image for Wolf Howl
      img.classList.add('falling-image');
      document.body.appendChild(img);
  
      setTimeout(() => {
        img.style.animation = 'none'; // Remove the animation
        void img.offsetWidth; // Trigger a reflow to apply the style change immediately
        img.style.animation = 'growAndShrink 10s forwards'; // Re-add the animation
      }, 100); // Short delay
  
      img.addEventListener('animationend', () => {
        img.remove(); // Removes the image after animation
      });
    }
  }  
});
