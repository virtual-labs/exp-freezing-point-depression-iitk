
// const beakerFilled = document.getElementById("beakerfilled");
// const tripod       = document.getElementById("tripod");
// const flame        = document.getElementById("flame");
// const timerImg     = document.getElementById("timer");
// const thermometer  = document.getElementById("tmeter");

// /* fixed‑reading thermometers */
// const readingImgs = [
//   document.getElementById("tmeter-20"),
//   document.getElementById("tmeter-30"),
//   document.getElementById("tmeter-40"),
//   document.getElementById("tmeter-50"),
//   document.getElementById("tmeter-60"),
// ];

// /* hide them all at start */
// readingImgs.forEach(img => { img.style.visibility = "hidden"; img.style.opacity = 0; });

// /* ──────────   beaker animation numbers   ────────── */
// const targetX   = tripod.offsetLeft + tripod.offsetWidth - beakerFilled.offsetWidth;
// const targetY   = tripod.offsetTop  - beakerFilled.offsetHeight;
// const STEPS     = 115;
// const STEP_X    = (targetX - beakerFilled.offsetLeft) / STEPS;
// const STEP_Y    = (targetY - beakerFilled.offsetTop)  / STEPS;

// /* ──────────   state flags   ────────── */
// let beakerStep      = 0;
// let beakerPlaced    = false;   // controls thermometer availability
// let thermometerDone = false;

// /* ───────────────────────────────
//    THERMOMETER  (disabled until beakerPlaced)
//    ─────────────────────────────── */
// function moveThermometer() {
//   if (!beakerPlaced || thermometerDone) return;
//   thermometerDone = true;

//   /* lift up */
//   thermometer.style.transform = "translate(-35.5vmax,-19.75vmax)";

//   /* rotate & nudge into beaker */
//   setTimeout(() => {
//     thermometer.style.transform =
//       "translate(-39vmax,-10.25vmax) rotate(-90deg)";

//     /* after it settles inside, start reading sequence */
//     setTimeout(startReadingSequence, 1000);
//   }, 1000);
// }

// /* keep it un‑clickable initially */
// thermometer.style.pointerEvents = "none";
// thermometer.addEventListener("click", moveThermometer);

// /* ───────────────────────────────
//    BEAKER → TRIPOD
//    ─────────────────────────────── */
// function moveBeakerFilledToTripod() {
//   if (beakerStep < STEPS) {
//     beakerFilled.style.left = beakerFilled.offsetLeft + STEP_X + "px";
//     beakerFilled.style.top  = beakerFilled.offsetTop  + STEP_Y + "px";
//     beakerStep++;
//     requestAnimationFrame(moveBeakerFilledToTripod);
//   } else {
//     /* snap & raise z‑index */
//     beakerFilled.style.left   = "17.25vmax";
//     beakerFilled.style.top    = "11.25vmax";
//     beakerFilled.style.zIndex = "9";

//     /* enable thermometer */
//     beakerPlaced                     = true;
//     thermometer.style.pointerEvents  = "auto";
//     thermometer.style.cursor         = "pointer";
//   }
// }

// /* ───────────────────────────────
//    BURNER FLAME
//    ─────────────────────────────── */
// function toggleFlame() {
//   flame.style.display = flame.style.display === "none" ? "block" : "none";
// }
// tripod.onclick = () => {
//   timerImg.style.display = "block";
//   toggleFlame();
// };

// /* click beaker → start its move */
// beakerFilled.onclick = () => {
//   if (!beakerPlaced) moveBeakerFilledToTripod();
// };

// /* ───────────────────────────────
//    READING SEQUENCE  (20 → … 60 every 5 s)
//    ─────────────────────────────── */
// function startReadingSequence() {

//   /* wait 5 s while 0 °C thermometer is inside */
//   setTimeout(() => {
//     /* hide moving thermometer */
//     thermometer.style.visibility = "hidden";

//     /* start stepping through readings */
//     showReading(0);
//   }, 5000);
// }

// function showReading(idx) {
//   /* hide all, then show idx */
//   readingImgs.forEach(img => { img.style.visibility = "hidden"; img.style.opacity = 0; });

//   if (idx < readingImgs.length) {
//     const current = readingImgs[idx];
//     current.style.visibility = "visible";
//     current.style.opacity    = 1;

//     /* next in 5 s */
//     setTimeout(() => showReading(idx + 1), 5000);
//   }
// }
/* ───────────────────────────────
   ELEMENT HANDLES
   ─────────────────────────────── */
const beakerFilled = document.getElementById("beakerfilled");
const tripod       = document.getElementById("tripod");
const flame        = document.getElementById("flame");
// const timerImg     = document.getElementById("timer");
const thermometer  = document.getElementById("tmeter");

/* fixed‑reading thermometers (20→60 °C) */
const readingImgs = [
  document.getElementById("tmeter-20"),
  document.getElementById("tmeter-30"),
  document.getElementById("tmeter-40"),
  document.getElementById("tmeter-50"),
  document.getElementById("tmeter-60"),
  document.getElementById("tmeter-80"),
  document.getElementById("tmeter-85"),
];

/* hide all fixed readings at start */
readingImgs.forEach(img => { img.style.visibility = "hidden"; img.style.opacity = 0; });

/* ──────────   beaker animation numbers   ────────── */
const targetX   = tripod.offsetLeft + tripod.offsetWidth - beakerFilled.offsetWidth;
const targetY   = tripod.offsetTop  - beakerFilled.offsetHeight;
const STEPS     = 115;
const STEP_X    = (targetX - beakerFilled.offsetLeft) / STEPS;
const STEP_Y    = (targetY - beakerFilled.offsetTop)  / STEPS;

/* ──────────   state flags   ────────── */
let beakerStep         = 0;
let beakerPlaced       = false;   // controls thermometer availability
let thermometerDone    = false;

let burnerLit          = false;   // 🔥 on/off
let thermometerReady   = false;   // inside beaker
let readingsStarted    = false;   // sequence already launched?

/* ───────────────────────────────
   THERMOMETER  (disabled until beakerPlaced)
   ─────────────────────────────── */
function moveThermometer() {
  if (!beakerPlaced || thermometerDone) return;
  thermometerDone = true;

  /* lift */
  thermometer.style.transform = "translate(-35.5vmax,-19.75vmax)";

  /* rotate & nudge */
  setTimeout(() => {
    thermometer.style.transform =
      "translate(-39vmax,-10.25vmax) rotate(-90deg)";

    /* mark ready after settling */
    setTimeout(() => {
      thermometerReady = true;
      maybeStartReadings();
    }, 1000);
  }, 1000);
}

/* keep it un‑clickable initially */
thermometer.style.pointerEvents = "none";
thermometer.addEventListener("click", moveThermometer);

/* ───────────────────────────────
   BEAKER → TRIPOD
   ─────────────────────────────── */
function moveBeakerFilledToTripod() {
  if (beakerStep < STEPS) {
    beakerFilled.style.left = beakerFilled.offsetLeft + STEP_X + "px";
    beakerFilled.style.top  = beakerFilled.offsetTop  + STEP_Y + "px";
    beakerStep++;
    requestAnimationFrame(moveBeakerFilledToTripod);
  } else {
    beakerFilled.style.left   = "17.25vmax";
    beakerFilled.style.top    = "11.25vmax";
    beakerFilled.style.zIndex = "9";

    beakerPlaced = true;
    thermometer.style.pointerEvents = "auto";
    thermometer.style.cursor        = "pointer";
  }
}

/* ───────────────────────────────
   BURNER  (toggle flame)
   ─────────────────────────────── */
function toggleFlame() {
  const nowOn = flame.style.display === "none";
  flame.style.display = nowOn ? "block" : "none";
  burnerLit = nowOn;            // update flag
  maybeStartReadings();         // try to launch if conditions met
}

/* click tripod → show timer, toggle flame */
tripod.onclick = () => {
//   timerImg.style.display = "block";
  toggleFlame();
};

/* click beaker → slide it onto tripod */
beakerFilled.onclick = () => {
  if (!beakerPlaced) moveBeakerFilledToTripod();
};

/* ───────────────────────────────
   LAUNCH CONDITIONS
   ─────────────────────────────── */
function maybeStartReadings() {
  if (burnerLit && thermometerReady && !readingsStarted) {
    readingsStarted = true;
    startReadingSequence();
  }
}

/* ───────────────────────────────
   READING SEQUENCE  (0 stays 5 s, then 20→…→60)
   ─────────────────────────────── */
function startReadingSequence() {
  /* keep 0 °C in view for 5 s */
  setTimeout(() => {
    thermometer.style.visibility = "hidden";
    showReading(0);             // start with 20 °C
  }, 5000);
}

function showReading(idx) {
  /* hide all readings first */
  readingImgs.forEach(img => { img.style.visibility = "hidden"; img.style.opacity = 0; });

  /* show the current one */
  const current = readingImgs[idx];
  current.style.visibility = "visible";
  current.style.opacity    = 1;

  /* schedule next only if there *is* a next (keeps 60 °C visible) */
  if (idx + 1 < readingImgs.length) {
    setTimeout(() => showReading(idx + 1), 2500);   // 5 s
  }
}
