document.addEventListener('DOMContentLoaded', function() {
    let timer;
    let isRunning = false;
    let countdownSeconds = 0;
    let sessionStartTime;
    let lapTimes = [];

    const timerDisplay = document.getElementById('timer');
    const startStopBtn = document.getElementById('startStop');
    const resetBtn = document.getElementById('reset');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const tenSecondsBtn = document.getElementById('tenSeconds');
    const thirtySecondsBtn = document.getElementById('thirtySeconds');
    const twoMinutesBtn = document.getElementById('twoMinutes');
    const startKbSessionBtn = document.getElementById('startKbSession');
    const addTenSecondsBtn = document.getElementById('addTenSeconds');
    const addThirtySecondsBtn = document.getElementById('addThirtySeconds');
    const recordLapBtn = document.getElementById('recordLap');
    const lapRecordsTable = document.getElementById('lap-records');
    const alarmSoundSelector = document.getElementById('alarmSoundSelector');
    const fsContainer = document.getElementById('fullscreen-container'); // Fullscreen container

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

    // Event listeners for the timer buttons
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
        addTime(10);
    });

    thirtySecondsBtn.addEventListener('click', function() {
        addTime(30);
    });

    twoMinutesBtn.addEventListener('click', function() {
        startTimer(120); 
    });

    startKbSessionBtn.addEventListener('click', function() {
        sessionStartTime = new Date();
        lapTimes = [];
        startTimer(60); // Start with a default duration
        updateLapRecordsTable();
    });

    addTenSecondsBtn.addEventListener('click', function() {
        addTime(10);
    });

    addThirtySecondsBtn.addEventListener('click', function() {
        addTime(30);
    });

    recordLapBtn.addEventListener('click', function() {
        const lapTime = Math.floor((new Date() - sessionStartTime) / 1000);
        lapTimes.push(lapTime);
        updateLapRecordsTable();
    });

    function addTime(seconds) {
        countdownSeconds += seconds;
        updateDisplay(Math.floor(countdownSeconds / 60), countdownSeconds % 60);
    }

    function updateLapRecordsTable() {
        lapRecordsTable.innerHTML = ''; // Clear existing records
        lapTimes.forEach((time, index) => {
            const row = lapRecordsTable.insertRow(0); // Insert at the top
            const cell = row.insertCell(0);
            cell.textContent = `Lap ${index + 1}: ${time} seconds`;
        });
    }

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    // Fullscreen toggle functionality
    fullscreenBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            if (fsContainer.requestFullscreen) {
                fsContainer.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {  
                document.exitFullscreen();
            }
        }
    });

    // Falling images animation based on audio selection
    function initiateFallingImagesAnimation() {
        const selectedOption = alarmSoundSelector.options[alarmSoundSelector.selectedIndex].value;

        if (selectedOption === 'Audio/manvoice.mp3') {
            createAndAnimateImage('images/jimtimesup.png');
        } else if (selectedOption === 'Audio/wolf5.mp3') {
            createAndAnimateImage('images/wolf.png');
        }
        // Add more conditions for other audio selections here if needed
    }

    function createAndAnimateImage(imageSrc) {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.classList.add('falling-image');
        document.body.appendChild(img);

        setTimeout(() => {
            img.style.animation = 'growAndShrink 10s forwards';
        }, 100); 

        img.addEventListener('animationend', () => {
            img.remove();
        });
    }
});
