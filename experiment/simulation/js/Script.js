const messages = [
    "PART A: Click on a container to fill 600 ML beaker nearly full of water. Then, place the tripod over the burner and gauge on the top of tripod. Click \"Next\"",
    "Place the beaker filled with water on the tripod and heat it to 85 °C by igniting the burner.",
    "Clamp the test tube in the water bath. Turn on Analytical Balance and put weighing boat in the balance. Now, tare the balance and take 3 g of Napthalene. Click \"Next\"",
    "Put napthalene in test tube and insert the thermometer into the test tube. When all the naphthalene has melted, stop heating. Finally, click on the thermometer to record temperature at the interval of 30s. Click \"Next\"",
    "PART B: Turn on the analytical balance and put weighing boat inside it. Record and tare the balance. Now, click on spatula to weigh 0.5g of sulphur powder. Click \"Next\"",
    "Replace the test tube in the water bath and heat until all the naphthalene has melted. Add sulfur powder into the test tube. Click \"Next\"",
    "After all the sulphur has been dissolved, turn off the burner. Now, record the temperature every 30 s until all the naphthalene has solidified. Click \"Next\"",
    "! THANK YOU FOR VISITING THE WEBSITE !"
];

const messagesh = [
    "PART A: 600 एमएल बीकर को लगभग पानी से भरने के लिए एक कंटेनर पर क्लिक करें। फिर, तिपाई को बर्नर के ऊपर रखें और गेज को तिपाई के शीर्ष पर रखें।",
    "पानी से भरे बीकर को तिपाई पर रखें और बर्नर जलाकर इसे 85°C तक गर्म करें।",
    "टेस्ट ट्यूब को पानी के स्नान में दबाएँ। संतुलन चालू करें और वजन नाव को संतुलन में रखें। अब, संतुलन को तोड़ें और 3 ग्राम नेफ़थलीन लें।",
    "अब, नेफ़थलीन को टेस्ट ट्यूब में डालें और थर्मामीटर को टेस्ट ट्यूब में डालें। जब सारा नेफ़थलीन पिघल जाए, गर्म करना बंद कर दें। अंत में, तापमान रिकॉर्ड करने के लिए थर्मामीटर पर क्लिक करें (हर 30 सेकंड में)। अगला पर क्लिक करें।",
    "संतुलन चालू करें और उसके अंदर वजन मापने वाली नाव रखें। शेष राशि को रिकॉर्ड करें और उसे तार करें। अब, 0.5 ग्राम सल्फर पाउडर को तौलने के लिए स्पैटुला पर क्लिक करें। अगला पर क्लिक करें।", 
    "टेस्ट ट्यूब को पानी के स्नान में बदलें और तब तक गर्म करें जब तक कि सारा नेफ़थलीन पिघल न जाए। टेस्ट ट्यूब में सल्फर पाउडर डालें। अगला पर क्लिक करें।",
     "सारा सल्फर घुल जाने के बाद, बर्नर बंद कर दें। अब, हर 30 सेकंड में तापमान रिकॉर्ड करें जब तक कि सारा नेफ़थलीन जम न जाए। अगला पर क्लिक करें।",
     "! वेबसाइट पर आने के लिए धन्यवाद !" 
];


const stepMatch = window.location.pathname.match(/(\d+)\.html$/);
var currentStep = stepMatch ? parseInt(stepMatch[1]) - 1 : 0;

let currentLang = "eng";

const instructionText = document.getElementById("instructionText");
const langSelect = document.getElementById("langSelect");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

langSelect.addEventListener("change", () => {
    currentLang = langSelect.value;
    updateInstruction();
    speakInstruction();
});

function updateInstruction() {
     const instructionElement = document.getElementById("instructionText");
       if (instructionElement) {
        if (currentStep === 7) {
            instructionElement.innerText = "! THANK YOU FOR VISITING THE WEBSITE !";
        } else {
            instructionElement.innerText = "Step " + currentStep + ": Follow the instructions.";
        }
    } else {
        console.warn("Element with id 'instructionText' not found.");
    }
    if (currentLang === "hindi") {
        prevBtn.innerText = "पहले";
        nextBtn.innerText = "आगे";
        instructionText.innerText = messagesh[currentStep] || "";
    } else {
        prevBtn.innerText = "Prev";
        nextBtn.innerText = "Next";
        instructionText.innerText = messages[currentStep] || "";
    }
}

function speakInstruction() {
    speechSynthesis.cancel();

    const textToSpeak = currentLang === "hindi" ? messagesh[currentStep] : messages[currentStep];
    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const voices = speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.name.includes("Kalpana") || v.lang === "hi-IN");
    const engVoice = voices.find(v => v.name.includes("Zira") || v.lang === "en-US" || v.lang === "en-IN");

    utterance.voice = currentLang === "hindi" ? hindiVoice : engVoice;
    utterance.lang = currentLang === "hindi" ? "hi-IN" : "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
}


// function updateInstruction() {
//     const instructionElement = document.getElementById("instructionText");
//     if (instructionElement) {
//         if (currentStep === 7) {
//             instructionElement.innerText = "! THANK YOU FOR VISITING THE WEBSITE !";
//         } else {
//             instructionElement.innerText = "Step " + currentStep + ": Follow the instructions.";
//         }
//     } else {
//         console.warn("Element with id 'instructionText' not found.");
//     }
// }
function updateInstruction() {
    const instructionElement = document.getElementById("instructionText");
    if (!instructionElement) {
        console.warn("Element with id 'instructionText' not found.");
        return;
    }
    
    // Set button text
    if (currentLang === "hindi") {
        prevBtn.innerText = "पहले";
        nextBtn.innerText = "आगे";
        instructionElement.innerText = messagesh[currentStep] || "";
    } else {
        if(currentStep!=7){
        prevBtn.innerText = "Prev";
         nextBtn.innerText = "Next";
        }
       
        instructionElement.innerText = messages[currentStep] || "";
    }
}


// Wrap in window.onload to ensure DOM is fully loaded
window.onload = function () {
    updateInstruction();

    if (typeof currentStep !== "undefined" && currentStep === 7) {
        const audio = new Audio("Sound/Thanks-En.wav");
        audio.play();
    } else if (typeof speakInstruction === "function") {
        speakInstruction();
    }
};

