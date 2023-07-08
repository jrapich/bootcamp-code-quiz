//lets declare all the things
let startButton = document.querySelector(".confirm");
let defaultQuestions = document.querySelector("#questionsDefault");
let defaultAnswers = document.querySelector("#answersDefault");
let displayedQuestion = document.querySelector("#questionsDisplay");
let displayedAnswers = document.querySelector("#answersDisplay");

//function to hide the default text on starting page, and replace it with questions/answers
function hideDefaultText() {
    defaultQuestions.setAttribute("style", "display:none");
    defaultAnswers.setAttribute("style", "display:none");
    displayedQuestion.setAttribute("style", "display:block");
    displayedAnswers.setAttribute("style", "display:block");
}

//start the quiz timer, display the time remaining, and then remove the time remaining when time runs out
function startTimer() {
    let headerElem = document.querySelector("header");
    let timer = 121;
    let timerText = document.createElement("div");
    let timerElem = document.createElement("span");
    let timerInterval = setInterval(function() {
        timer--;
        timerElem.textContent = timer;
        if(timer === 0) {
          clearInterval(timerInterval);
          timerText.setAttribute("style", "display:none");
          timerElem.setAttribute("style", "display:none");
        }
    }, 1000);
    timerText.textContent = "Seconds Remaining:"
    headerElem.appendChild(timerText);
    headerElem.appendChild(timerElem);
}

//choose a random question to display to the user
function randomQuestion(){
    const questionsObj = {
        questions: [
            "placeholder 0",
            "placeholder 1",
            "placeholder 2",
            "placeholder 3",
            "placeholder 4",
            "placeholder 5",
            "placeholder 6",
            "placeholder 7",
            "placeholder 8",
            "placeholder 9",
        ],
        randomNumber: 0,
        chosenQuestion: "",
        isQuestionUsed: []
    }
    questionsObj.randomNumber = Math.floor(Math.random() * questionsObj.questions.length);
    questionsObj.chosenQuestion = questionsObj.questions[questionsObj.randomNumber];
    return questionsObj.chosenQuestion;
}

//event listener for when user clicks the begin quiz button
//will display a question and a list of answers
startButton.addEventListener("click", function(event) {
    //not sure if I even need preventDefault here
    event.preventDefault();
    hideDefaultText();
    startTimer();
    displayedQuestion.textContent = randomQuestion();
    //displayedAnswers.textContent = listAnswers();
})


