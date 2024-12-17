const readings=document.getElementById("readings");
const weight_ = document.getElementById("weight_");
const thermometer = document.getElementById("thermometer");
const burner=document.getElementById("burner")
const clampstand=document.getElementById("clampstand");
const tube=document.getElementById("tube");
const timer=document.getElementById("timer");

var weight_Moved=false;
var thermometerMoved=false;
var standMoved=false;
var clampstandMoved=false;

weight_.addEventListener("click",function(){
    if(!weight_Moved){
        weight_.style.transform="translate(-24.15vmax,-15vmax)";
        scale3.style.display="none"
        scale_.style.display="block"
        setTimeout(function(){
            weight_.style.transform+="rotate(-45deg)";
        },1500);
        setTimeout(function() {
            weight_.style.transform="translate(25vmax,3vmax)";
            weight_.src="images/Weighing boat.png"
            tube.src="images/Test Tube_.png"
        },3500);
        weight_Moved=true;
    }
    thermometer.addEventListener("click",function(){
        if(weight_Moved){
            thermometer.style.transform="translate(-35.5vmax,-19.75vmax)";
            setTimeout(function() {
                thermometer.style.transform+="rotate(-90deg)";
                thermometer.style.transform+="translate(-5.5vmax,-5.5vmax)";
            },2000);
            thermometerMoved=true;
        }
        burner.addEventListener("click",function(){
            flame.style.display="none"
            timer.style.display="none";
        });
        clampstand.addEventListener("click",function(){
            if(!clampstandMoved){
                readings.style.display="block"
            setTimeout(function(){
                readings.style.display="none"
            },3000);
            setTimeout(function(){
                tube.src="images/Test Tube1.png"
            },7000);
            }
        });
    });
});