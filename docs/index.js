const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Dumbledore está orgulhoso de você!"
      break
    case (performance >= 70):
      message = "Você está no caminho certo bruxinho(a)"
      break
    case (performance >= 50):
      message = "Bom, mas treine mais seus feitiços e suas poções!"
      break
    default:
      message = "AVADA KEDAVRA!!"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Quantos filmes e livros a franquia tem?",
    answers: [
      { text: "5 e 10", correct: false },
      { text: "4 e 8", correct: false },
      { text: "9 e 8", correct: true },
      { text: "7 e 7", correct: false }
    ]
  },
  {
    question: "em Harry Potter e o Prisioneiro de Azkabanm quem foi o fugitivo da historia?",
    answers: [
      { text: "Sirius Black", correct: true },
      { text: "Remo Lupin", correct: false },
      { text: "Bellatriz Lestrange", correct: false },
      { text: "Lord Voldemort", correct: false }
    ]
  },
  {
    question: "Em Harry Potter e a Ordem da Fênix, o que significa AD?",
    answers: [
      { text: 'Armada de Dumbledore', correct: true },
      { text: 'Alcance de Dumbledore', correct: false },
      { text: 'Armada Defensiva', correct: false },
      { text: "Armadura Dourada", correct: false }
    ]
  },
  {
    question: 'Em Harry Potter e o Cálice de fogo, quem coloca o nome de Harry no Cálice?',
    answers: [
      { text: "Remo Lupin Fake", correct: false },
      { text: "Olho-tonto Fake", correct: true },
      { text: "Sirius Black Fake", correct: false },
      { text: "Alvo Dumbledore Fake", correct: false },
    ]
  },
  {
    question: 'Quantos Oscars HP ja ganhou?',
    answers: [
      { text: '6', correct: false },
      { text: '12', correct: true },
      { text: '17', correct: false },
      { text: '9', correct: false }
    ]
  },
  {
    question: 'Se o Harry nao tivesse ido ao ministério em Ordem da Fênix, o que aconteceria?',
    answers: [
      { text: 'Dumbledore iria ser derrotado', correct: false },
      { text: 'Voldemort roubaria a profecia', correct: true },
      { text: 'Os comensais iriam fortalecer Voldemort', correct: false },
      { text: 'Sirius iria morrer', correct: false }
    ]
  },
  {
    question: 'Qual o Nome da Coruja do Harry?',
    answers: [
      { text: 'Lilybeth', correct: false },
      { text: 'Snow', correct: false },
      { text: 'Pichi', correct: false },
      { text: 'Edwiges', correct: true },
    ]
  },
  {
    question: 'Em qual Filme/Livro o Harry usa o vira-tempo com a Hermione?',
    answers: [
      { text: 'Cálice de Fogo', correct: false },
      { text: 'Pedra Filosofal', correct: false },
      { text: 'Ordem da Fênix', correct: false },
      { text: 'Prisioneiro de Azkaban', correct: true },
    ]
  },
  {
    question: 'Com quantos anos os bruxos se tornam maiores de idade?',
    answers: [
      { text: '21', correct: false },
      { text: '18', correct: false },
      { text: '15', correct: false },
      { text: '16', correct: true },
    ]
  },
  {
    question: 'No filme Harry Potter e a Pedra Filosofal, onde Harry encontra Draco Malfoy?',
    answers: [
      { text: 'No Olivaras', correct: false },
      { text: 'Em Hogwarts', correct: true },
      { text: 'No três vassouras', correct: false },
      { text: 'Em um Parque', correct: false },
    ]
  },
]