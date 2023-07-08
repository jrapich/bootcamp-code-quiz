//lets declare all the things
var startButton = document.querySelector(".confirm");
var defaultQuestions = document.querySelector("#questionsDefault");
var defaultAnswers = document.querySelector("#answersDefault");
var displayedQuestion = document.querySelector("#questionsDisplay");
var displayedAnswers = document.querySelector("#answersDisplay");

//function to hide the default text on starting page, an replace it with questions/answers
function hideDefaultText() {
    defaultQuestions.setAttribute("style", "display:none");
    defaultAnswers.setAttribute("style", "display:none");
    displayedQuestion.setAttribute("style", "display:block");
    displayedAnswers.setAttribute("style", "display:block");
}

//start the quiz timer
function startTimer() {
    var timer = 120
    var timerInterval = setInterval(function() {
        timer--;
        if(timer === 0) {
          clearInterval(timerInterval);
        }
    }, 1000);
}

//event listener for when user clicks the begin quiz button
//will display a question and a list of answers
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    hideDefaultText();
    startTimer();
    displayedQuestion.textContent = randomQuestion();
    displayedAnswers.textContent = listAnswers();
})


