'use client'

export default function Voice() {

    // function speakHindi() {
  // function speakHindi(text:any, voiceName = null) {
//   const speech = new SpeechSynthesisUtterance(text);
//   speech.lang = "hi-IN";

//   const voices = window.speechSynthesis.getVoices();

//   const hindiVoice =
//     voices.find(v => v.name.includes(voiceName)) ||
//     voices.find(v => v.lang === "hi-IN");

//   if (hindiVoice) {
//     speech.voice = hindiVoice;
//   }

//  speech.rate = 1.1;   // slow = emotional
// speech.pitch = 0.5;

//   window.speechSynthesis.cancel(); // stop previous
//   window.speechSynthesis.speak(speech);
  
// }

// const loadVoices = () => {
//   const voices = window.speechSynthesis.getVoices();
//   voices.forEach(v => {
//     console.log(v.name, v.lang);
//   });
// };

// window.speechSynthesis.onvoiceschanged = loadVoices;

// function speakHindi(text:any) {
//   const speech = new SpeechSynthesisUtterance(text);
//   speech.lang = "hi-IN";
//   speech.rate = 1;
//   speech.pitch = 1;
//   window.speechSynthesis.speak(speech);
// }

  return (
    <div>
       <button
        // onClick={() => speakHindi("जब इंसान अपने ही कर्मों से डरने लगे… वहीं से गीता शुरू होती है।")}
        >
        Male Voice
      </button>

    </div>
  );
}
