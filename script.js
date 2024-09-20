const Mic = document.querySelector('#Mic');
const SpeechIconFrame = document.querySelector('.SpeechIconFrame');
const resultElement = document.querySelector('#SpeechResult');
const searchValue = '';

if (window.webkitSpeechRecognition) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'fr-FR'; 
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  Mic.addEventListener('click', () => {
    recognition.start();
    SpeechIconFrame.classList.add("animate");
    resultElement.textContent = "Entrain d'ecouter ...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const formatedTranscript = `${transcript.charAt(0).toUpperCase()}${transcript.slice(1)}`;
    resultElement.textContent = formatedTranscript;
    setTimeout(() => {
        // window.location.href = `http://search.junoox.com/index.php?page=search/web&search=${encodeURIComponent(formatedTranscript)}&type=web`;
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(formatedTranscript)}`;
    }, 500)

  };

  recognition.onerror = (event) => {
    resultElement.textContent = `Erreur : ${event.error}`;
    SpeechIconFrame.classList.remove("animate");
  };

  recognition.onspeechend = () => {
    recognition.stop();
    SpeechIconFrame.classList.remove("animate");
  };
} else {
  resultElement.textContent = "La reconnaissance vocale n'est pas supportée dans ce navigateur.";
}
