
document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz-container");
  const submitBtn = document.getElementById("submit-quiz");
  const result = document.getElementById("quiz-result");
  let quizData = [];

  function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function loadQuiz() {
    fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        quizData = data.results.map((q) => {
          const allOptions = [...q.incorrect_answers, q.correct_answer];
          return {
            question: decodeHTML(q.question),
            options: allOptions.sort(() => Math.random() - 0.5).map(decodeHTML),
            answer: decodeHTML(q.correct_answer),
          };
        });
        displayQuestions();
      })
      .catch(() => {
        quizContainer.innerHTML = "<p>⚠️ Failed to load quiz. Try again later.</p>";
      });
  }

  function displayQuestions() {
    quizContainer.innerHTML = ""; // Clear existing content

    quizData.forEach((q, index) => {
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("quiz-question");

      const question = document.createElement("p");
      question.innerText = `${index + 1}. ${q.question}`;
      questionBlock.appendChild(question);

      q.options.forEach((opt) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="question${index}" value="${opt}"> ${opt}`;
        questionBlock.appendChild(label);
      });

      quizContainer.appendChild(questionBlock);
    });
  }

  function checkAnswers() {
    let score = 0;

    quizData.forEach((q, index) => {
      const selected = document.querySelector(`input[name="question${index}"]:checked`);
      const questionBlock = document.querySelectorAll(".quiz-question")[index];
      const labels = questionBlock.querySelectorAll("label");

      labels.forEach((label) => {
        const input = label.querySelector("input");
        const isCorrect = input.value === q.answer;

        label.style.backgroundColor = "";
        label.style.border = "";
        label.style.fontWeight = "";
        label.style.color = "";

        if (input.checked) {
          if (isCorrect) {
            score++;
            label.style.backgroundColor = "#d4edda"; // green
            label.style.border = "1px solid #28a745";
          } else {
            label.style.backgroundColor = "#f8d7da"; // red
            label.style.border = "1px solid #dc3545";
          }
        }

        if (isCorrect) {
          label.style.fontWeight = "bold";
          label.style.color = "#155724";
        }
      });
    });

    result.textContent = `🎉 You got ${score} out of ${quizData.length} correct!`;
    result.style.color = "#007acc";
  }

  if (quizContainer && submitBtn && result) {
    loadQuiz();
    submitBtn.addEventListener("click", checkAnswers);
  }
});

