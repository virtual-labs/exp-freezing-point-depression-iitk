const tube_=document.getElementById("tube_")
const burner=document.getElementById("burner")
const thermometer=document.getElementById("thermometer");

var standMoved=false;

burner.addEventListener("click",function(){
    flame.style.display="none"
    thermometer.addEventListener("click",function(){
        if(!standMoved){
            setTimeout(function(){
                thermometer.style.transform="translate(-41.15vmax,-14.25vmax)rotate(-90deg)"
            });
            standMoved=true;
            clampstand.addEventListener("click",function(){
                if(standMoved){
                    readings.style.display="block"
                setTimeout(function(){
                    readings.style.display="none"
                },3000);
                }
            });
        }
   });
});