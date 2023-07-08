//lets declare all the things
var startButton = document.querySelector(".confirm");
var defaultQuestions = document.querySelector("#questionsDefault");
var defaultAnswers = document.querySelector("#answersDefault");
var displayedQuestion = document.querySelector("#questionsDisplay");
var displayedAnswers = document.querySelector("#answersDisplay");

//function to hide the default text on starting page, an replace it with questions/answers
function hideDefaultText() {
    if (defaultQuestions.style) {}
}

//event listener for when user clicks the begin quiz button
//will display a question and a list of answers
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    displayedQuestion.textContent = randomQuestion();
    displayedAnswers.textContent = listAnswers();
    hideDefaultText();
    startTimer();
})


