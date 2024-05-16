const imageText=document.getElementById(imageText);
const beaker = document.getElementById("beaker");

beaker.addEventListener("mouseenter",function(){
    if(imageText){
        imageText.style.display="block"
    }
});