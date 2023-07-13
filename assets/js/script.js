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
let clickableButton = [];


//ideas
// for loop:
    //create question
    //display question
    //listen for answer


//massive object that contains all data needed for the gameshow
const gameData = {
    isGameEnded: false,
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
    answered: 0,
    chosenQuestion: "",
    isQuestionUsed: {
        question0: false,
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: false,
        question6: false,
        question7: false,
        question8: false,
        question9: false,
    },
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
    switch(gameData.randomNumber) {
        case 0:
            gameData.isQuestionUsed.question0 =true;
            break;
        case 1:
            gameData.isQuestionUsed.question1 =true;
            break;
        case 2:
            gameData.isQuestionUsed.question2 =true;
            break;
        case 3:
            gameData.isQuestionUsed.question3 =true;
            break;
        case 4:
            gameData.isQuestionUsed.question4 =true;
            break;
        case 5:
            gameData.isQuestionUsed.question5 =true;
            break;
        case 6:
            gameData.isQuestionUsed.question6 =true;
            break;
        case 7:
            gameData.isQuestionUsed.question7 =true;
            break;
        case 8:
            gameData.isQuestionUsed.question8 =true;
            break;
        case 9:
            gameData.isQuestionUsed.question9 =true;
            break;
        default:
            console.log("all possible questions used, ending game");
            gameData.isGameEnded = true;
    }
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
    ansArray = testArray[question];
    ansArray = ansArray[1];
    answer0p.textContent = ansArray[0];
    answer1p.textContent = ansArray[1];
    answer2p.textContent = ansArray[2];
    answer3p.textContent = ansArray[3];
    gameData.answered++;
    //add a clickable button to each of these answers
        //first time I tried this it only added one button, so lets make a for loop
    for (let i=0; i < answerBtnArray.length; i++) {
        createBtn = document.createElement("button");
        createBtn.textContent = "Choose";
        createBtn.setAttribute("class", "tempButton");
        answerBtnArray[i].appendChild(createBtn);
        clickableButton.push(answerBtnArray[i].querySelector("button"));
    } 
    nextQuestion();
}
//add an event listener for each clickable button in the quiz
function nextQuestion() {
    for (let j=0; j < clickableButton.length; j++) {
        clickableButton[j].addEventListener("click", function(event) {
            console.log("answer chosen, next question...");
            questionNumber = randomQuestion();
            console.log("next question number is " + questionNumber);
            nextAnswer(nextAnswerPicker(questionNumber));
        })
    }    
}

//when the user picks an answer, show the next question and answers
//check if the question has been used already and if so, pick a different one
function nextAnswerPicker(pickedQ) {
    let checkNumber;
    console.log(pickedQ === 0 && gameData.isQuestionUsed.question0)
    if (pickedQ === 0 && gameData.isQuestionUsed.question0) {
        checkNumber = 0;
        return checkNumber;
    } else if (pickedQ === 1 && gameData.isQuestionUsed.question1) {
        checkNumber = 1;
        return checkNumber;
    } else if (pickedQ === 2 && gameData.isQuestionUsed.question2) {
        checkNumber = 2;
        return checkNumber;
    } else if (pickedQ === 3 && gameData.isQuestionUsed.question3) {
        checkNumber = 3;
        return checkNumber;
    } else if (pickedQ === 4 && gameData.isQuestionUsed.question4) {
        checkNumber = 4;
        return checkNumber;
    } else if (pickedQ === 5 && gameData.isQuestionUsed.question5) {
        checkNumber = 5;
        return checkNumber;
    } else if (pickedQ === 6 && gameData.isQuestionUsed.question6) {
        checkNumber = 6;
        return checkNumber;
    } else if (pickedQ === 7 && gameData.isQuestionUsed.question7) {
        checkNumber = 7;
        return checkNumber;
    } else if (pickedQ === 8 && gameData.isQuestionUsed.question8) {
        checkNumber = 8;
        return checkNumber;
    } else if (pickedQ === 9 && gameData.isQuestionUsed.question9) {
        checkNumber = 9;
        return checkNumber;
    } else {
        for (l=0; l < 1000, l++;) {
            console.log("this has looped " + l + " times")
            checkNumber =  nextAnswerPicker(randomQuestion());
        }
    }
    switch(pickedQ) {
        case 0:
            gameData.isQuestionUsed.question0 =true;
            break;
        case 1:
            gameData.isQuestionUsed.question1 =true;
            break;
        case 2:
            gameData.isQuestionUsed.question2 =true;
            break;
        case 3:
            gameData.isQuestionUsed.question3 =true;
            break;
        case 4:
            gameData.isQuestionUsed.question4 =true;
            break;
        case 5:
            gameData.isQuestionUsed.question5 =true;
            break;
        case 6:
            gameData.isQuestionUsed.question6 =true;
            break;
        case 7:
            gameData.isQuestionUsed.question7 =true;
            break;
        case 8:
            gameData.isQuestionUsed.question8 =true;
            break;
        case 9:
            gameData.isQuestionUsed.question9 =true;
            break;
        default:
            console.log("all possible questions used, ending game");
            gameData.isGameEnded = true;
    }
    console.log(checkNumber);
    return checkNumber;
}

function nextAnswer(verifiedQ) {
    let ansArray;
    let testArray = Object.entries(gameData.answers);
    if (gameData.isGameEnded) {
        gameOver();
    } else  {
        console.log(verifiedQ);
        ansArray = testArray[verifiedQ];
        ansArray = ansArray[1];
        answer0p.textContent = ansArray[0];
        answer1p.textContent = ansArray[1];
        answer2p.textContent = ansArray[2];
        answer3p.textContent = ansArray[3];
        displayedQuestion.textContent = gameData.questions[verifiedQ];
        gameData.answered++;
        console.log("the game has displayed " + gameData.answered +" questions");
        //nextQuestion();
    }
    
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

function gameOver() {

}
