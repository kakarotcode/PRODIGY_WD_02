
let timer; 
let isRunning = false;
let startTime;
let lapCount = 1;

function startStop() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById("startStop").textContent = "Pause";
        startTime = Date.now() - (lapCount > 1 ? lapTimes[lapTimes.length - 1] : 0);
        timer = setInterval(updateDisplay, 10);
    } else {
        isRunning = false;
        document.getElementById("startStop").textContent = "Resume";
        clearInterval(timer);
    }
}

function lapReset() {
    if (isRunning) {
        let lapTime = Date.now() - startTime;
        let formattedTime = formatTime(lapTime);
        let lapItem = document.createElement("div");
        lapItem.textContent = "Lap " + lapCount + ": " + formattedTime;
        document.getElementById("laps").appendChild(lapItem);
        lapCount++;
    } else {
        
        clearInterval(timer);
        isRunning = false;
        document.getElementById("startStop").textContent = "Start";
        document.getElementById("display").textContent = "00:00:00";
        document.getElementById("laps").innerHTML = "";
        lapCount = 1;
    }
}

function updateDisplay() {
    let elapsedTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    let formattedHours = hours.toString().padStart(2, "0");
    let formattedMinutes = minutes.toString().padStart(2, "0");
    let formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}