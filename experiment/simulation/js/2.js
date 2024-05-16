const beakerFilled = document.getElementById("beakerfilled");
const tripod = document.getElementById("tripod");
const flame = document.getElementById("flame");

// Calculate the target position for beaker filled on tripod
const beakerToTripodTargetX = tripod.offsetLeft + tripod.offsetWidth - beakerFilled.offsetWidth;
const beakerToTripodTargetY = tripod.offsetTop - beakerFilled.offsetHeight; // Adjust as needed

// Define animation properties for beaker filled to tripod
const beakerToTripodDuration = 2000; // Adjust as needed (in milliseconds)
const beakerToTripodSteps = 115; // Increase this number for slower animation
const beakerToTripodStepX = (beakerToTripodTargetX - beakerFilled.offsetLeft) / beakerToTripodSteps;
const beakerToTripodStepY = (beakerToTripodTargetY - beakerFilled.offsetTop) / beakerToTripodSteps;

let beakerStepCount = 0;

// Function to move beaker filled to the tripod
function moveBeakerFilledToTripod() {
    if (beakerStepCount < beakerToTripodSteps) {
        // Update the position of the beaker filled element
        beakerFilled.style.left = beakerFilled.offsetLeft + beakerToTripodStepX + "px";
        beakerFilled.style.top = beakerFilled.offsetTop + beakerToTripodStepY + "px";
        beakerStepCount++;

        // Call the function recursively for the next step
        requestAnimationFrame(moveBeakerFilledToTripod);
    }else{
        beakerFilled.style.left="17.25vmax";
        beakerFilled.style.top="11.25vmax";
        beakerFilled.style.zIndex = "9";
    }
    function toggleFlame() {
        if (flame.style.display === "none") {
            flame.style.display = "block";
        } else {
            flame.style.display = "none";
        }
    }
    
    // Add a click event listener to the burner
    tripod.onclick = () => {
        timer.style.display="block";
        toggleFlame();
    };    
}

// Start the animation when the beaker filled is clicked
beakerFilled.onclick = () => {
    setTimeout(() => {
        moveBeakerFilledToTripod();
    });
};
