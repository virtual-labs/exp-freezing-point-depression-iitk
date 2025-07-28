/* ──────────────────────────────────────────
   ELEMENT HANDLES
   ────────────────────────────────────────── */
const readings      = document.getElementById("readings");
const weight_       = document.getElementById("weight_");
const burner        = document.getElementById("burner");
const clampstand    = document.getElementById("clampstand");
const tube          = document.getElementById("tube");
const timerCircle   = document.querySelector(".wrapper");          // 🟡 show / hide
const spanMin       = document.querySelector(".seconds");          // 🟡 stopwatch mm
const spanSec       = document.querySelector(".tens");             // 🟡 stopwatch ss
const flame         = document.getElementById("flame");
const scale3        = document.getElementById("scale3");
const scale_        = document.getElementById("scale_");

const mover   = document.querySelector("#tmeter");  // moving thermometer
const fixedReadings = [
  "#tmeter-0", "#tmeter-20", "#tmeter-30",
  "#tmeter-40", "#tmeter-50", "#tmeter-60", "#tmeter-85"
].map(sel => document.querySelector(sel));

/* ──────────────────────────────────────────
   STATE FLAGS
   ────────────────────────────────────────── */
let weightMoved      = false;
let thermometerMoved = false;
let clampstandMoved  = false;

/* 🟡  STOPWATCH STATE */
let stopwatchID = null;      // interval handle
let elapsed     = 0;         // seconds since start

/* ──────────────────────────────────────────
   WEIGHT  →  enables thermometer when done
   ────────────────────────────────────────── */
weight_.addEventListener("click", () => {
  if (weightMoved) return;           // runs only once

  /* STEP 1: drag to scale */
  weight_.style.transform = "translate(-24.15vmax,-15vmax)";
  scale3.style.display    = "none";
  scale_.style.display    = "block";

  /* STEP 2: tilt the weight boat */
  setTimeout(() => {
    weight_.style.transform += " rotate(-45deg)";
  }, 1500);

  /* STEP 3: move to burner & swap images */
  setTimeout(() => {
    weight_.style.transform = "translate(25vmax,3vmax)";
    weight_.src = "images/Weighing boat.png";
    tube.src    = "images/Test Tube_.png";
    weightMoved = true;            // ✅ thermometer now clickable
  }, 3500);
});

/* ──────────────────────────────────────────
   THERMOMETER  (click only after weight)
   ────────────────────────────────────────── */
mover.addEventListener("click", () => {
  if (!weightMoved || thermometerMoved) return;
  thermometerMoved = true;

  /* STEP A: straight lift */
  mover.style.transform = "translate(-35.5vmax,-19.75vmax)";

  /* STEP B: rotate & nudge into test‑tube */
  setTimeout(() => {
    mover.style.transform =
      "translate(-38vmax,-12vmax) rotate(-90deg)";

    setTimeout(() => startReadings(), 1000);   // when settled
  }, 1000);
});

/* ──────────────────────────────────────────
   BURNER  – simple hide on click
   ────────────────────────────────────────── */
burner.addEventListener("click", () => {
  flame.style.display = "none";
  timerCircle.style.display = "none";
});

/* ──────────────────────────────────────────
   CLAMPSTAND  – quick message + tube swap
   ────────────────────────────────────────── */
clampstand.addEventListener("click", () => {
  if (clampstandMoved) return;
  clampstandMoved = true;

  readings.style.display = "block";
  setTimeout(() => (readings.style.display = "none"), 3000);
  setTimeout(() => (tube.src = "images/Test Tube1.png"), 7000);
});

/* ──────────────────────────────────────────
   TEMPERATURE‑CHANGE SEQUENCE  +  STOPWATCH
   ────────────────────────────────────────── */
function startReadings() {
  /* hide the moving thermometer */
  mover.style.visibility = "hidden";

  /* 🟡 start stopwatch */
  beginStopwatch();

  /* show 0°, then step through to 60° every 30 s */
  cycleReadings(0);
}

function cycleReadings(i) {
  fixedReadings.forEach(el => { el.style.visibility = "hidden"; el.style.opacity = 0; });
  const current = fixedReadings[i];
  current.style.visibility = "visible";
  current.style.opacity    = 1;

  /* 🟡  next reading every 30 000 ms (= 30 s) */
  if (i + 1 < fixedReadings.length) {
    setTimeout(() => cycleReadings(i + 1), 5_000);
  } else {
    /* 🟡 stop stopwatch after final reading */
    clearInterval(stopwatchID);
  }
}

/* ──────────────────────────────────────────
   🟡  SIMPLE STOPWATCH   (mm:ss)
   ────────────────────────────────────────── */
function beginStopwatch() {
  clearInterval(stopwatchID);   // safety
  elapsed = 0;
  timerCircle.style.display = "block";
  updateDisplay();
  stopwatchID = setInterval(() => {
    elapsed++;
    updateDisplay();
  }, 1000);                     // tick every second
}

function updateDisplay() {
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  spanMin.textContent = minutes;
  spanSec.textContent = seconds;
}
