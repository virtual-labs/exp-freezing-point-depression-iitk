const water = document.getElementById("water");
const tripod = document.getElementById("tripod");
const gauge = document.getElementById("gauge");

const gaugeToTripodTargetX = tripod.offsetLeft + tripod.offsetWidth / 2 - gauge.offsetWidth / 2;
const gaugeToTripodTargetY = tripod.offsetTop - gauge.offsetHeight; 
const waterfill = document.getElementById("waterfill");
const beaker = document.getElementById("beaker");
const waterToBeakerTargetX = beaker.offsetLeft + beaker.offsetWidth*1.25 - water.offsetWidth / 2;
const waterToBeakerTargetY = beaker.offsetTop + beaker.offsetHeight / 5 - water.offsetHeight;

const burner = document.getElementById("burner");
const tripodToBurnerTargetX = burner.offsetLeft; // Adjust as needed
const tripodToBurnerTargetY = burner.offsetTop + burner.offsetHeight;
// Define animation properties for water to beaker
const initialUpwardMovement = 50;
const waterToBeakerDuration = 2000; // Adjust as needed (in milliseconds)
const waterToBeakerSteps = 50; // Increase this number for slower animation
const waterToBeakerStepX = (waterToBeakerTargetX - water.offsetLeft) / waterToBeakerSteps;
const waterToBeakerStepY = (waterToBeakerTargetY - water.offsetTop) / initialUpwardMovement;
const tripodUpwardMovement = 50;
// Define animation properties for tripod to burner
const tripodToBurnerDuration = 5000; // Adjust as needed (in milliseconds)
const tripodToBurnerSteps = 100; // Increase this number for slower animation
const tripodToBurnerStepX = (burner.offsetLeft - tripod.offsetLeft) / tripodToBurnerSteps/1.229;
const tripodToBurnerStepY = (burner.offsetTop - tripod.offsetTop) / tripodToBurnerSteps/1.229;

// Define animation properties for gauge to tripod
const gaugeToTripodDuration = 5000; // Adjust as needed (in milliseconds)
const gaugeToTripodSteps = 100; // Increase this number for slower animation
const gaugeToTripodStepX = (tripod.offsetLeft - gauge.offsetLeft) / gaugeToTripodSteps;
const gaugeToTripodStepY = (tripod.offsetTop - gauge.offsetTop) / gaugeToTripodSteps;

let waterStepCount = 0;
let tripodStepCount = 0;
let gaugeStepCount = 0;

// Function to move water to the beaker
function moveWaterToBeaker() {
    if (waterStepCount < waterToBeakerSteps) {
        // Update the position of the water element
        water.style.left = water.offsetLeft + waterToBeakerStepX + "px";
        water.style.top = water.offsetTop + waterToBeakerStepY + "px";
        waterStepCount++;
        // Rotate the water element (simulate tilting left)
        const rotationAngle = (waterStepCount / waterToBeakerSteps) * -55; // 45 degrees tilt
        water.style.transform = `rotate(${rotationAngle}deg)`;
        // Call the function recursively for the next step
        requestAnimationFrame(moveWaterToBeaker);
    } else {
        setTimeout(() => {
            // Reset the water position and rotation
            water.style.left = "50vmax";
            water.style.top = "16.5vmax";
            water.style.transform = "rotate(0deg)";
        }, 1500);
        // After water to beaker animation completes, enable tripod click
        tripod.onclick = () => {
            setTimeout(() => {
                moveTripodToBurner();
            });
        };
    }
}

// Function to move tripod to the burner
function moveTripodToBurner() {
    if (tripodStepCount < tripodToBurnerSteps) {
        // Update the position of the tripod element
        tripod.style.left = tripod.offsetLeft + tripodToBurnerStepX + "px";
        tripod.style.top = tripod.offsetTop + tripodToBurnerStepY + "px";
        tripodStepCount++;

        // Call the function recursively for the next step
        requestAnimationFrame(moveTripodToBurner);
    } else {
        setTimeout(() => {
            // Reset the water position and rotation
            tripod.style.left = "17.25vmax";
            tripod.style.top = "17.75vmax";
        });
        // After tripod to burner animation completes, enable gauge click
        gauge.onclick = () => {
            setTimeout(() => {
                moveGaugeToTripod();
            });
        };
    }
}

// Function to move gauge to tripod
function moveGaugeToTripod() {
    if (gaugeStepCount < gaugeToTripodSteps) {
        // Update the position of the gauge element
        gauge.style.left = gauge.offsetLeft - gaugeToTripodStepX*2.95 + "px";
        gauge.style.top = gauge.offsetTop + gaugeToTripodStepY + "px";
        gaugeStepCount++;

        // Call the function recursively for the next step
        requestAnimationFrame(moveGaugeToTripod);
    }else{
        setTimeout(() => {
            // Reset the water position and rotation
            gauge.style.left = "15.75vmax";
            gauge.style.top = "17.5vmax";
        });
    }
}

// Start the water to beaker animation when water is clicked
water.onclick = () => {
    moveWaterToBeaker();
    setTimeout(() => {
        waterfill.style.display="block";
    },1000);
};
