$(document).ready(function () {
    let maxTime = 25 * 60; // 25 minutes in seconds
    let currentTime = maxTime;
    let interval;
    let timerIsRunning = false;

    // Function to update time displayed
    function updateTimerDisplay() {
        let result = formatTime(currentTime)
        $('#timer-display').text(result)
    }

    // Function to format time
    function padZero(num) {
        return (num < 10 ? '0' : '') + num;
    }

    // Decrease the timer when start button is clicked and there is no time already running
    function startTimer() {
        if (timerIsRunning) {
            return
        }
        interval = setInterval(function () {
            timerIsRunning = true;
            if (currentTime > 0) {
                currentTime--;
                updateTimerDisplay();
            } else { //to do: add the sound here
                stopTimer();
            }
        }, 1000);
    }

    // Stop time running 
    function stopTimer() {
        timerIsRunning = false;
        clearInterval(interval);
    }

    // Function to format time, it recieves in seconds and format as hh:mm:ss
    function formatTime(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;
        return padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds)
    }

    // Listeners written in jQuery
    $('#startBtn').click(function () {
        startTimer();
    });

    $('#resetBtn').click(function () {
        stopTimer();
        currentTime = maxTime;
        updateTimerDisplay();
    });

    $('#editBtn').click(function () {
        let newMaxTime = prompt('Enter new max timer in minutes:', maxTime / 60);
        if (newMaxTime !== null && !isNaN(newMaxTime) && newMaxTime > 0) {
            stopTimer();
            maxTime = newMaxTime * 60;
            currentTime = maxTime;
            updateTimerDisplay();
            $('#timer-edit').text(formatTime(maxTime))
        }
    });
});