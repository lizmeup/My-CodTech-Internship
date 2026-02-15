// 1. Define the Questions (Dynamic Data)
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Preprocessor", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Multiple Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "JQuery", correct: false },
            { text: "CSS", correct: true },
            { text: "XML", correct: false }
        ]
    },
    {
        question: "Which is not a JavaScript Framework?",
        answers: [
            { text: "Python Script", correct: true },
            { text: "JQuery", correct: false },
            { text: "Django", correct: false },
            { text: "NodeJS", correct: false }
        ]
    },
    {
        question: "How do you declare a variable in JavaScript?",
        answers: [
            { text: "var carName;", correct: false },
            { text: "let carName;", correct: false },
            { text: "const carName;", correct: false },
            { text: "All of the above", correct: true }
        ]
    }
];

// 2. Select Elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizBox = document.querySelector(".quiz-box");
const scoreBox = document.querySelector(".score-box");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

// 3. Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    quizBox.classList.remove("hide");
    scoreBox.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    // Create buttons dynamically
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    // Instant Feedback Logic
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Highlight the correct answer automatically if wrong was chosen
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after one click
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    quizBox.classList.add("hide");
    scoreBox.classList.remove("hide");
    scoreElement.innerText = score;
    totalElement.innerText = questions.length;
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// 4. Event Listeners
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

restartButton.addEventListener("click", startQuiz);

// Initialize
startQuiz();