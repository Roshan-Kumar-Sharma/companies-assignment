const quiz1 = {
    title: "General quizzes for testing purposes - part 1",
    data: [
        {
            id: "af0153c2-9860-48f2-bfd2-641111d59214",
            question:
                "According to Greek mythology, who was the first woman on earth?",
            options: ["Madona", "Al Gore", "Pandora", "Eve"],
            answer: "UGFuZG9yYQ==",
        },
        {
            id: "17870cb8-12fb-447e-82ed-78c655e5dfd7",
            question:
                "In a bingo game, which number is represented by the phrase “two little ducks”?",
            options: ["11", "8", "22", "10"],
            answer: "MjI=",
        },
        {
            id: "130f4b45-4925-4fa5-8ac2-9af6d59a330d",
            question:
                "In what year were the first Air Jordan sneakers released?",
            options: ["1984", "1983", "1988"],
            answer: "MTk4NA==",
        },
        {
            id: "bb9413cd-9c7e-429a-b311-a717608b192b",
            question:
                "Which singer's real name is Stefani Joanne Angelina Germanotta?",
            options: ["Lady Gaga", "Joanne Angel", "Joanne Angelina"],
            answer: "TGFkeSBHYWdh",
        },
        {
            id: "d2652c20-bbba-4e50-b962-d32d77917f47",
            question:
                "Kingston, Zuma, and Apollo are the sons of which American female pop star?",
            options: ["Gwen Stefani", "Joanne Angel", "A. A. Milne"],
            answer: "R3dlbiBTdGVmYW5p",
        },
    ],
    createdAt: "Mon, 24 Jan 2022 11:41:13 GMT",
    timePerQuestion: "30",
    totalTime: "120",
    type: "quiz",
};

const quiz2 = {
    title: "General quizzes for testing purposes - part 2",
    data: [
        {
            id: "af0153c2-9860-48f2-bfd2-641111d59214",
            question: "Which Dutch artist painted “Girl with a Pearl Earring”?",
            options: ["Madona", "Vermeer", "Pandora", "Eve"],
            answer: "VmVybWVlcg==",
        },
        {
            id: "17870cb8-12fb-447e-82ed-78c655e5dfd7",
            question: "Which country consumes the most chocolate per capita?",
            options: ["Switzerland", "U.S", "Netherlands", "Africa"],
            answer: "U3dpdHplcmxhbmQ=",
        },
        {
            id: "130f4b45-4925-4fa5-8ac2-9af6d59a330d",
            question:
                "Which two U.S. states don’t observe Daylight Saving Time?",
            options: [
                "Arizona and Hawaii",
                "Nevada and Hawaii",
                "Arizona and New York",
            ],
            answer: "QXJpem9uYSBhbmQgSGF3YWlp",
        },
        {
            id: "bb9413cd-9c7e-429a-b311-a717608b192b",
            question: "What is the loudest animal on Earth?",
            options: ["The sperm whale", "Blue whale", "Mamooth"],
            answer: "VGhlIHNwZXJtIHdoYWxl",
        },
        {
            id: "d2652c20-bbba-4e50-b962-d32d77917f47",
            question: "What was the first toy to be advertised on television?",
            options: ["Mr. Potato Head", "Nightmare toys", "A. A. Toys"],
            answer: "TXIuIFBvdGF0byBIZWFk",
        },
    ],
    createdAt: "Mon, 20 Jan 2022 11:41:13 GMT",
    timePerQuestion: "30",
    totalTime: "120",
    type: "quiz",
};

const quiz3 = {
    title: "General quizzes for testing purposes - part 3",
    data: [
        {
            id: "af0153c2-9860-48f2-bfd2-641111d59214",
            question:
                " In the United Kingdom, what is the day after Christmas known as?",
            options: [
                "Boxing Day",
                "Cricket Day",
                "Wrestling Day",
                "Hockey Day",
            ],
            answer: "Qm94aW5nIERheQ==",
        },
        {
            id: "17870cb8-12fb-447e-82ed-78c655e5dfd7",
            question: "Which country consumes the most chocolate per capita?",
            options: ["Switzerland", "U.S", "Netherlands", "Africa"],
            answer: "U3dpdHplcmxhbmQ=",
        },
        {
            id: "130f4b45-4925-4fa5-8ac2-9af6d59a330d",
            question: "Which of Shakespeare’s plays is the longest?",
            options: ["Hamlet", "Cutlet", "Mamooth"],
            answer: "SGFtbGV0",
        },
        {
            id: "bb9413cd-9c7e-429a-b311-a717608b192b",
            question: "What is the loudest animal on Earth?",
            options: ["The sperm whale", "Blue whale", "Mamooth"],
            answer: "VGhlIHNwZXJtIHdoYWxl",
        },
        {
            id: "d2652c20-bbba-4e50-b962-d32d77917f47",
            question:
                "I Know Why the Caged Bird Sings’ is an autobiography about the early years of what inspirational African-American writer and poet?",
            options: ["Maya Angelou", "Nightmarish", "The Great Dane"],
            answer: "TWF5YSBBbmdlbG91",
        },
    ],
    createdAt: "Mon, 12 Jan 2022 11:41:13 GMT",
    timePerQuestion: "30",
    totalTime: "120",
    type: "quiz",
};

let questionsObject
const totalTimeLeft = document.getElementById('totalTime');
const questionTitle = document.getElementById("questionTitle");
const nextButton = document.getElementById('btnNext');
const submitButton = document.getElementById('btnSubmit');
const eachQuesTime = document.getElementById('eachQuesTime');


let totalTime, stopTimer
const responseAnswer = new Map();

let currentQuestion = 0

function getCurrentQuestion() {
    return questionsObject.data[currentQuestion];
}

function getAllQuestions() {
    return questionsObject.data;
}

function getTotalQuestions() {
    return questionsObject.data.length;
}

function getFormattedTime(totalTime) {
    return `Total time left :: ${parseInt(totalTime/60)}min : ${totalTime%60}sec`;
}

function getTimePerQuestion() {
    return parseInt(questionsObject.timePerQuestion);
}

function setTime() {
    totalTimeLeft.innerText = getFormattedTime(totalTime)
    stopTimer = setInterval(()=> {
        if(totalTime <= 0){
            endGame()
            clearInterval(stopTimer);
            return;
        }
        totalTime--;
        totalTimeLeft.innerText = getFormattedTime(totalTime)
    }, 1000)
}

const questionStates = new Map();
const intervals = new Map();
let clearTimer

function render() {
    let timeRemaining = getTimePerQuestion()

    nextButton.disabled = true;

    eachQuesTime.innerText = `Time left to answer :: 00 : ${timeRemaining}s`

    clearTimer = setInterval(() => {
        --timeRemaining;
        if(timeRemaining <= 0){
            clearInterval(clearTimer)
            submitButton.disabled = true;
            if(getCurrentQuestion() != getTotalQuestions()-1)
                nextButton.disabled = false;
            else
                endGame()
        }
        eachQuesTime.innerText = `Time left to answer :: 00 : ${timeRemaining}s`;
    }, 1000)

    const question = getCurrentQuestion()
    const n = getTotalQuestions();
    const numberOfOptions = question.options.length;

    questionTitle.innerText = question.question;

    answers.innerHTML = ""

    const optionViews = question.options.map((option, index) => {
        optionView = HTMLDom(`<div>
                    <input type="radio" name="option" id="option${index}" value="${option}">
                    <label for="option${index}">${option}</label>
                </div>`);
                
        return optionView;
    })

    answers.append(...optionViews);

    if(currentQuestion == n - 1)
        nextButton.disabled = true
}

function nextQuestion() {
    const n = getTotalQuestions();
    
    if(currentQuestion < n - 1)
        ++currentQuestion;

    submitButton.disabled = false

    render();
}

function endGame(){
    clearInterval(stopTimer)

    let correct = 0
    let unanswered = 0
    let wrong = 0
    document.getElementById("header").innerHTML = `<h1>Result of ${
        location.search.split("=")[1]
    }</h1>`;
    const result = document.getElementById('content')
    result.innerHTML = ''

    responseAnswer.forEach((value, key) => {
        if(value.answerChoice == null){
            unanswered++;
        }
        else if(value.answerChoice === atob(value.correctAnswer)){
            correct++;
        }
        else{
            wrong++;
        }
    })

    let content = HTMLDom(`<div>
                    <h3>Correct: ${correct}</h3>
                    <h3>Unanswered: ${unanswered}</h3>
                    <h3>Wrong: ${wrong}</h3>
                </div>`);

    result.append(content)

    console.log(correct, unanswered, wrong)
    console.log('game over')
}

function submitAnswer(e){

    e.preventDefault()

    clearInterval(clearTimer)

    const data = new FormData(e.target);
    const answerChoice = data.get("option");
    const question = getCurrentQuestion();

    responseAnswer.set(question.id, {
        answerChoice,
        correctAnswer: question.answer
    });

    if((currentQuestion + 1) === getTotalQuestions()) {
        endGame();
    } else {
        nextQuestion();
    }
}

function HTMLDom(dom) {
    let temp = document.createElement("template");
    temp.innerHTML = dom;
    return temp.content.firstChild;
}

window.onload = () => {
    let quizName = location.search.split("=")[1]

    document.getElementById('name').innerHTML = quizName.toUpperCase()

    let today = new Date();
    var time = today.toLocaleString("en-US", { hour12: true }).split(',')[1];
    document.getElementById('createdAt').innerText += `Created At ${time}`

    if(quizName === 'quiz1')
        questionsObject = quiz1;
    else if(quizName === 'quiz2')
        questionsObject = quiz2;
    else
        questionsObject = quiz3;

    totalTime = questionsObject.totalTime

    render()
    setTime()
};
