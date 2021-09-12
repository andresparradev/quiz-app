import "./sass/main.scss";
import questions from "./questions.json";

const app = document.querySelector("#app");
let optionsQuestionEl = null;

let currentQuestion = 0,
  score = 0;

function clearAppContent() {
  app.innerHTML = "<div class='alert'></div>";
}

function createQuizApp() {
  clearAppContent();

  const quiz = document.createElement("div");
  quiz.classList.add("quiz");
  quiz.id = "quiz";
  quiz.innerHTML = `
    <h1 class="quiz__question" id="question-text">Question test?</h1>
    <ul class="quiz__options">
      <li class="quiz__options__item">
        <label for="option-a" id="label-a">Test A</label>
        <input type="radio" id="option-a" name="answer" option="a" />
      </li>
      <li class="quiz__options__item">
        <label for="option-b" id="label-b">Test B</label>
        <input type="radio" id="option-b" name="answer" option="b" />
      </li>
      <li class="quiz__options__item">
        <label for="option-c" id="label-c">Test C</label>
        <input type="radio" id="option-c" name="answer" option="c" />
      </li>
      <li class="quiz__options__item">
        <label for="option-d" id="label-d">Test D</label>
        <input type="radio" id="option-d" name="answer" option="d" />
      </li>
    </ul>
  `;

  const btnSubmit = document.createElement("button");
  btnSubmit.textContent = "Next";
  btnSubmit.classList.add("quiz__submit");
  btnSubmit.addEventListener("click", submitQuestion);
  quiz.appendChild(btnSubmit);

  app.appendChild(quiz);

  optionsQuestionEl = document.querySelectorAll(
    ".quiz__options input[type='radio']"
  );
}

function renderQuestion(data) {
  const questionTextEl = document.querySelector("#question-text"),
    questionLabelA = document.querySelector("#label-a"),
    questionLabelB = document.querySelector("#label-b"),
    questionLabelC = document.querySelector("#label-c"),
    questionLabelD = document.querySelector("#label-d");

  questionTextEl.textContent = data.question;
  questionLabelA.textContent = data.options.a;
  questionLabelB.textContent = data.options.b;
  questionLabelC.textContent = data.options.c;
  questionLabelD.textContent = data.options.d;
}

function deleteOptionsSelected() {
  optionsQuestionEl.forEach((option) => (option.checked = false));
}

function getUserAnswer() {
  let answer = null;
  optionsQuestionEl.forEach((option) => {
    if (option.checked) answer = option.getAttribute("option");
  });
  return answer;
}

function isAnswerCorrect(answer) {
  return answer === questions[currentQuestion].correct;
}

function init() {
  createQuizApp();
  loadQuestion();
}

function loadQuestion() {
  const firstQuestion = questions[currentQuestion];
  deleteOptionsSelected();
  renderQuestion(firstQuestion);
}

function finished() {
  clearAppContent();

  const finishedContainer = document.createElement("div");
  finishedContainer.classList.add("finished");
  finishedContainer.innerHTML = `
    <h1 class="finished__title">Finished</h1>
    <p class="finished__score">
      Score:
      <span>${score} / ${questions.length}</span>
    </p>
  `;

  const buttonRestartQuiz = document.createElement("button");
  buttonRestartQuiz.textContent = "Restart Quiz";
  buttonRestartQuiz.addEventListener("click", () => {
    score = 0;
    currentQuestion = 0;

    init();
    loadQuestion();
  });

  finishedContainer.appendChild(buttonRestartQuiz);
  app.appendChild(finishedContainer);
}

function submitQuestion() {
  const answer = getUserAnswer();
  const isCorrect = isAnswerCorrect(answer);

  if (answer) {
    if (isCorrect) score++;

    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      finished();
    }
  } else {
    showAlert("Selecciona una respuesta");
  }
}

function showAlert(text) {
  const alertEl = document.querySelector(".alert");
  alertEl.classList.add("show");
  alertEl.textContent = text;

  setTimeout(() => {
    alertEl.classList.remove("show");
  }, 2000);
}

document.addEventListener("DOMContentLoaded", init);
