//lets declare all the things
let startButton = document.querySelector(".confirm");
let defaultQuestions = document.querySelector("#questionsDefault");
let defaultAnswers = document.querySelector("#answersDefault");
let displayedQuestion = document.querySelector("#questionsDisplay");
let displayedAnswers = document.querySelector("#answersDisplay");
let answer0 = document.querySelector("#answer0");
let answer1 = document.querySelector("#answer1");
let answer2 = document.querySelector("#answer2");
let answer3 = document.querySelector("#answer3");
let answer0p = answer0.querySelector("p");
let answer1p = answer1.querySelector("p");
let answer2p = answer2.querySelector("p");
let answer3p = answer3.querySelector("p");
let answer0Btn = answer0.querySelector("span");
let answer1Btn = answer1.querySelector("span");
let answer2Btn = answer2.querySelector("span");
let answer3Btn = answer3.querySelector("span");
let answerBtnArray = [answer0Btn, answer1Btn, answer2Btn, answer3Btn];

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
    displayedAnswers.setAttribute("style", "display:flex;    flex-direction:column;");
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

//list the possible answers to the question chosen
    //this part took a bit of trial and error and is a bit tricky, to me at least
    //first, the answers to each question are stored as arrays in gameData.answers as an object,
    //which is itself stored in object gameData
    //then, object.entries puts that entire object gameData.answers into an array, 
    //with each index of that array serving as also more arrays which contain answers to that specific index question
    //question parameter in this functiomn passes the random number to that array(same number that picks the question too)
    //which creates a final array ansArray, which then can be called to display each of the answers.
    //whew! im proud of this one, it took me quite a bit of experimentation to figure out.
    //im sure there are easier ways of doing this. maybe ill discover them as i get more experience.
function listAnswers(question) {
    let ansArray;
    let testArray = Object.entries(gameData.answers);
    let createBtn;
    let clickableButton = [];
    ansArray = testArray[question];
    ansArray = ansArray[1];
    answer0p.textContent = ansArray[0];
    answer1p.textContent = ansArray[1];
    answer2p.textContent = ansArray[2];
    answer3p.textContent = ansArray[3];
    //add a clickable button to each of these answers
        //first time I tried this it only added one button, so lets make a for loop
    for (let i=0; i < answerBtnArray.length; i++) {
        createBtn = document.createElement("button");
        createBtn.textContent = "Choose";
        createBtn.setAttribute("class", "tempButton");
        answerBtnArray[i].appendChild(createBtn);
        clickableButton.push(answerBtnArray[i].querySelector("button"));
    } 
    //add an event listener for each clickable button
    function nextQuestion() {
        for (let j=0; j < clickableButton.length; j++) {
            clickableButton[j].addEventListener("click", function(event) {
                console.log("answer chosen, next question...");
                questionNumber = randomQuestion();
                console.log("next question number is " + questionNumber);
                nextAnswers(questionNumber);
            })
        }    
    }
    nextQuestion();
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
    listAnswers(questionNumber);
})


