//lets declare all the things
let startButton = document.querySelector(".confirm");
let defaultQuestions = document.querySelector("#questionsDefault");
let defaultAnswers = document.querySelector("#answersDefault");
let displayedQuestion = document.querySelector("#questionsDisplay");
let displayedAnswers = document.querySelector("#answersDisplay");

//massive object that contains all data needed for the gameshow
const gameData = {
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
    isQuestionUsed: [],
    answers: {
        answer0: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ],
        answer1: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ],
        answer2: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ],
        answer3: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ],
        answer4: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ],
        answer5: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ],
        answer6: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ],
        answer7: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ],
        answer8: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ],
        answer9: [
            "placeholder0",
            "placeholder1",
            "placeholder2",
            "placeholder3"
        ]
    }
}

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
//TODO: add logic to determine if a question was already used, skip question if true
function randomQuestion(){
    gameData.randomNumber = Math.floor(Math.random() * gameData.questions.length);
    return gameData.randomNumber;
}

//list the possible answers to the question chosen above
function listAnswers(question) {
        
}

//event listener for when user clicks the begin quiz button
//will display a question and a list of answers
startButton.addEventListener("click", function(event) {
    //not sure if I even need preventDefault here
    event.preventDefault();
    let chosenQuestion;
    let questionNumber;
    hideDefaultText();
    startTimer();
    questionNumber = randomQuestion();
    chosenQuestion = gameData.questions[questionNumber];
    displayedQuestion.textContent = chosenQuestion;
    displayedAnswers.textContent = listAnswers(questionNumber);
})


