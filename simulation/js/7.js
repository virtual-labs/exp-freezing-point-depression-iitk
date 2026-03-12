const tube_       = document.getElementById("tube_");
const burner      = document.getElementById("burner");
const thermometer = document.getElementById("tmeter");
const flame       = document.getElementById("flame");
const clampstand  = document.getElementById("clampstand");
const readings    = document.getElementById("readings");
const spanMin     = document.querySelector(".seconds");
const spanSec     = document.querySelector(".tens");
const timerCircle = document.querySelector(".wrapper");

const fixedReadings = [
  document.getElementById("tmeter"),       // initial thermometer
  document.getElementById("tmeter-20"),
  document.getElementById("tmeter-30"),
  document.getElementById("tmeter-40"),
  document.getElementById("tmeter-50"),
  document.getElementById("tmeter-60"),
  document.getElementById("tmeter-85")
];

let stopwatchID = null;
let elapsed = 0;
let standMoved = false;
let thermometerInserted = false;

// Burner Click
burner.addEventListener("click", function () {
  flame.style.display = "none";

  thermometer.addEventListener("click", function () {
    if (!standMoved) {
      setTimeout(function () {
        thermometer.style.transform = "translate(-42.5vmax,-14.25vmax) rotate(-90deg)";
        thermometer.style.opacity = "0.6";
        thermometer.style.zIndex = "100";

        thermometerInserted = true;
        startReadings(); // Start thermometer reading and stopwatch
      }, 500);

      standMoved = true;

      clampstand.addEventListener("click", function () {
        if (standMoved) {
          readings.style.display = "block";
          setTimeout(function () {
            readings.style.display = "none";
          }, 3000);
        }
      });
    }
  });
});

// Start temperature simulation and stopwatch
function startReadings() {
  beginStopwatch();
  cycleReadings(0);
}

// Cycle through thermometer images every 5 seconds
function cycleReadings(i) {
  fixedReadings.forEach(el => {
    el.style.visibility = "hidden";
    el.style.opacity = 0;
  });

  if (fixedReadings[i]) {
    fixedReadings[i].style.visibility = "visible";
    fixedReadings[i].style.opacity = 1;
  }

  if (i + 1 < fixedReadings.length) {
    setTimeout(() => cycleReadings(i + 1), 5000);  // 5 seconds interval
  } else {
    clearInterval(stopwatchID); // stop after last
  }
}

// Stopwatch implementation
function beginStopwatch() {
  clearInterval(stopwatchID);
  elapsed = 0;
  timerCircle.style.display = "block";
  updateDisplay();

  stopwatchID = setInterval(() => {
    elapsed++;
    updateDisplay();
  }, 1000);
}

function updateDisplay() {
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  spanMin.textContent = minutes;
  spanSec.textContent = seconds;
}
