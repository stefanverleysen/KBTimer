document.addEventListener('DOMContentLoaded', function() {
    let timer;
    let isRunning = false;
    let countdownSeconds = 300; // Default timer value
    let sessionStartTime;
    let lapTimes = [];

    const timerDisplay = document.getElementById('timer');
    const startKbSession = document.getElementById('startKBSession');
    const addTenSecondsBtn = document.getElementById('addTenSeconds');
    const addThirtySecondsBtn = document.getElementById('addThirtySeconds');
    const recordLapBtn = document.getElementById('recordLap');
    const lapRecordsTable = document.getElementById('lap-records');
    const alarmSoundSelector = document.getElementById('alarmSoundSelector');
    const defaultTimerValueInput = document.getElementById('defaultTimerValue'); // Default timer value input

    // Settings toggles
    let muteAudio = false;
    let enableVisualization = false;

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
            if (!muteAudio) {
                playSelectedAudio();
            }
            if (enableVisualization) {
                initiateFallingImagesAnimation();
            }
            timerDisplay.classList.remove('red-text', 'blink-text');
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

    function addTime(seconds) {
        countdownSeconds += seconds;
        updateDisplay(Math.floor(countdownSeconds / 60), countdownSeconds % 60);
    }

    function updateLapRecordsTable() {
        lapRecordsTable.innerHTML = '';
        lapTimes.forEach((time, index) => {
            const row = lapRecordsTable.insertRow(0);
            const cell = row.insertCell(0);
            cell.textContent = `Lap ${index + 1}: ${formatTime(time)}`;
        });
    }

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return pad(minutes) + ':' + pad(seconds);
    }

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    document.getElementById('settingsButton').addEventListener('click', function() {
        var settingsMenu = document.getElementById('settingsMenu');
        settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('muteAudio').addEventListener('change', function() {
        muteAudio = this.checked;
    });

    document.getElementById('enableVisualization').addEventListener('change', function() {
        enableVisualization = this.checked;
    });

    defaultTimerValueInput.addEventListener('change', function() {
        var newDefaultTime = parseInt(this.value, 10);
        if (!isNaN(newDefaultTime) && newDefaultTime > 0) {
            countdownSeconds = newDefaultTime;
        } else {
            alert("Please enter a valid number for the timer");
            this.value = countdownSeconds;
        }
    });

    startKbSession.addEventListener('click', function() {
        startTimer(countdownSeconds);
        sessionStartTime = new Date();
        lapTimes = [];
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
        startTimer(countdownSeconds);
    });
});
