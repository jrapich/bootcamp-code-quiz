//lets declare all the things
var startButton = document.querySelector(".confirm");
var displayedQuestion = document.querySelector("#questionsDefault");
var displayedAnswers = document.querySelector("#answersDefault");


//event listener for when user clicks the begin quiz button
//will display a question and a list of answers
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    hideDefaultText();
    startTimer();
    displayedQuestion.textContent = randomQuestion();
    displayedAnswers.textContent = listAnswers();
})