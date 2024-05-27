let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.getElementById("voiceselect");
let isPaused = false;

const populateVoicelist = () => {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        speech.voice = voices[0];
        voiceSelect.innerHTML = ''; // Clear existing options
        voices.forEach((voice, i) => {
            let option = new Option(voice.name + ' (' + voice.lang + ')', i);
            voiceSelect.options.add(option);
        });
    }
};

window.speechSynthesis.onvoiceschanged = populateVoicelist;
populateVoicelist();

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.getElementById("speakbutton").addEventListener("click", () => {
    if (isPaused) {
        window.speechSynthesis.resume();
    } else {
        const text = document.getElementById("textinput").value.trim();
        if (text) {
            speech.text = text;
            window.speechSynthesis.speak(speech);
        } else {
            console.warn('No text to read');
        }
    }
    isPaused = false;
});

document.getElementById("pausebutton").addEventListener("click", () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        isPaused = true;
    }
});

speech.onend = () => {
    console.log('Text reading completed');
};

speech.onerror = (event) => {
    console.error('Speech synthesis error:', event.error);
};