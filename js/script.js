const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionBoxElement = document.getElementById('question-box')
const questionElement = document.getElementById('question')
const solutionButtonsElement = document.getElementById('solution-buttons')

let shuffleQuestions, currentQuestion
let score = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0 
    questionBoxElement.classList.remove('hide')
    nextQuestion()
}

function nextQuestion(){
    resetBox()
    showQuestion(shuffleQuestions[currentQuestion])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectChoice)
        solutionButtonsElement.appendChild(button)
    })
}

function resetBox() {
    nextButton.classList.add('hide')
    while(solutionButtonsElement.firstChild) {
        solutionButtonsElement.removeChild(solutionButtonsElement.firstChild)
    }
}

function selectChoice(e){
    const selectButton = e.target
    const correct = selectButton.dataset.correct
    statusClass(document.body, correct)
    Array.from(solutionButtonsElement.children).forEach(button => {
        statusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestion + 1) {
        nextButton.classList.remove('hide')
    } else{
        startButton.innerText = 'Restart?'
        startButton.classList.remove('hide')
    }
}

function statusClass(element, correct) {
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else{
        element.classList.add('false')
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("false")
}

const questions = [
    {
        question: 'Whats the last game of a football season called?',
        answers: [
            { text: "Super Bowl", correct: true},
            { text: 'Finals', correct: false}
        ]
    },
    {
        question: "What is the Flash real name?",
        answers: [
            {text: "Clark Kent", correct: false},
            {text: "Bruce Wayne", correct: false},
            {text: "Barry Allen", correct: true},
            {text: "Usain Bolt", correct: false}
        ]
    },
    {
        question: 'Who is leader of the AutoBots?',
        answers: [
            { text: "Megatron", correct: false},
            { text: "Optimus Prime", correct: true},
            { text: "Bumblebee", correct: false},
            { text: "StarScream", correct: false}
        ]
    }
]