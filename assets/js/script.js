//lets declare all the things
let quizSpace = document.querySelector("main");
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
let firstQuestion;
//object that contains all data needed for the gameshow
//this used to bigger and more complex logic but trimmed a lot of it to save uneeded complexity
const gameData = {
    timer: 121,
    isGameEnded: false,
    questions: [
        "In Javascript, what is the DOM stand for?",
        "Javascript is able to manipulate the DOM and the page by using the _______ built into modern browsers.",
        "What is an API? and what does it do?",
        "what tool in Javascript can you use to iterate through massive lists of items or data?",
        "True or False: Web API is a series of built-in methods and functions we can call to edit the DOM.",
        "What can we create to have Javascript detect when a user clicks on a button?",
        "What websites can we reference if we don't quite understand what a bit of code does?",
        "What syntax do we use when declaring a variable with a value we never want to change in the script?",
        "Select an example of an anonymous callback function:",
        "This test will store your total score and your initials, and will still be visible even if you close the browser and return to it. Where could this data be stored?",
    ],
    answered: 0,
    answers: {
        answer0: [
            "Document Oriented Model",
            "Digital Ordered Marketing",
            "Document Object Model",
            "I've never heard of that before in my life!"
        ],
        answer1: [
            "script.js file",
            "Google API",
            "Web API",
            "MDN HTML documentation"
        ],
        answer2: [
            "Application Programming Interface, it records data sent/receive to the webserver",
            "Application Programmable Instructions, it is used to send different instructions to programmable code",
            "Application Programming Interface, it is an interface programming languages can access to send/receive/modify data",
            "I don't remember!!"
        ],
        answer3: [
            "a data-iteration array",
            "a data-iteration object",
            "a Web API DOM navigator",
            "a for/while loop"
        ],
        answer4: [
            "True!",
            "False!",
            "",
            ""
        ],
        answer5: [
            "An API attached to the button",
            "An element in the DOM",
            "An Event Listener",
            "A Media Query in the CSS file"
        ],
        answer6: [
            "The Mozilla MDN documentation for JavaScript",
            "W3Schools website documentation",
            "stack exchange",
            "all of the above"
        ],
        answer7: [
            "let",
            "const",
            "var",
            "none of the above"
        ],
        answer8: [
            "var myFunction = function() {<function code here>}",
            "function myFunction () {<function code here>}",
            "addEventListener('click', function (event) {<function code here>})",
            "none of these are anonymous callbacks"
        ],
        answer9: [
            "in a cookie",
            "in a javascript const variable",
            "in the javascript local storage",
            "in the cloud"
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
    let timerText = document.createElement("div");
    let timerElem = document.createElement("span");
    let timerInterval = setInterval(function() {
        timerElem.textContent = gameData.timer;
        gameData.timer--;
        if(gameData.timer === 0) {
          clearInterval(timerInterval);
          timerText.setAttribute("style", "display:none");
          timerElem.setAttribute("style", "display:none");
        }
    }, 1000);
    timerText.textContent = "Seconds Remaining:"
    headerElem.appendChild(timerText);
    headerElem.appendChild(timerElem);
    quizSpace.removeChild(startButton); 
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
            nextAnswer(gameData.answered);
        })
    }    
}

//same answer selector logic as earlier, this will display all further questions/answers after the first quesiton
function nextAnswer(answered) {
    let ansArray;
    let testArray = Object.entries(gameData.answers);
    if (gameData.isGameEnded) {
        gameOver();
    } else  {
        ansArray = testArray[answered];
        ansArray = ansArray[1];
        answer0p.textContent = ansArray[0];
        answer1p.textContent = ansArray[1];
        answer2p.textContent = ansArray[2];
        answer3p.textContent = ansArray[3];
        displayedQuestion.textContent = gameData.questions[answered];
        gameData.answered++;
        console.log("the game has displayed " + gameData.answered +" questions");
    }
    
}
//event listener for when user clicks the begin quiz button
//will display the first question and a list of answers
startButton.addEventListener("click", function(event) {
    //not sure if I even need preventDefault here
    event.preventDefault();
    hideDefaultText();
    startTimer();
    firstQuestion = gameData.questions[0];
    displayedQuestion.textContent = firstQuestion;
    listAnswers(0);
})

function gameOver() {

}
