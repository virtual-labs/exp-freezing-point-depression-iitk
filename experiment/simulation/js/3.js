const scale=document.getElementById("scale")
const tube = document.getElementById("tube");
const spatula = document.getElementById("spatula");
const spatula_ = document.getElementById("spatula_");
const weight = document.getElementById("weight");

var tubeMoved=false;
var weightMoved=false;
var spatulaMoved=false;

tube.addEventListener("click", function() {
    if(!tubeMoved){
    // Apply the transformation to move the "test tube" to the "clamp stand"
    tube.style.transform = "translate(-38vmax, -8vmax)"; /* Adjust values as needed */
    tubeMoved=true;
    }
    scale.addEventListener("click",function(){
        if(tubeMoved){
            scale.src="/images/Analytical Balance On.png"
        }
        weight.addEventListener("click", function(){
            if(!weightMoved){
                // Apply the transformation to move the "weight" to the "scale"
                weight.style.transform = "translate(-45.5vmax,-3vmax)";
                weightMoved=true; /* Adjust values as needed */
                setTimeout(function(){
                scale.src="/images/Analytical Balance Open.png"
                },1200);
                setTimeout(function(){
                scale.src="/images/Analytical Balance_dish.png"
                },2200);
            }
            spatula.addEventListener("click",function(){
                if(weightMoved){
                    spatula.style.transform="translate(2vmax,-7vmax)";
                    setTimeout(function(){
                        spatula.style.display="none";
                        spatula_.style.display="block";
                        napthalene.src="/images/Napthalene1.png"
                    },2000);
                    setTimeout(function() {
                        spatula_.style.transform="translate(-37vmax,1.75vmax)";
                    }, 3000);
                    setTimeout(function(){
                        spatula_.src="/images/spatula.png"
                        weight.style.display="none";
                        weight_.style.display="block";
                        spatula_.style.transform="translate(2.5vmax,6.7vmax)";
                        scale.src="/images/Analytical Balance_3g.png"                          
                    }, 5500);
                }
            });
        });
    });
});