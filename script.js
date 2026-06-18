document.addEventListener('DOMContentLoaded', function () {
  const questions = [
    {
      question: 'What does AI stand for?',
      options: ['Artificial Insight', 'Automatic Input', 'Artificial Intelligence', 'Active Interface'],
      answer: 2,
    },
    {
      question: 'Which tool is helpful for beginner AI projects?',
      options: ['Text editor', 'AI playground', 'Calculator', 'Video game'],
      answer: 1,
    },
    {
      question: 'How can AI help with writing code?',
      options: ['By drawing pictures', 'By writing poems', 'By suggesting code', 'By fixing hardware'],
      answer: 2,
    },
    {
      question: 'Which three languages make most websites work?',
      options: ['HTML, CSS, JavaScript', 'Python, Java, Ruby', 'C++, PHP, SQL', 'Swift, Kotlin, Dart'],
      answer: 0,
    },
    {
      question: 'What is a good first project for beginners?',
      options: ['Build a small website', 'Create a video game engine', 'Design a database', 'Write a mobile app in Swift'],
      answer: 0,
    },
  ];

  const questionNumber = document.getElementById('question-number');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const quizFooter = document.getElementById('quiz-footer');
  const quizScore = document.getElementById('quiz-score');
  const restartButton = document.getElementById('restart-button');

  let currentQuestion = 0;
  let score = 0;

  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizFooter.classList.add('hidden');
    renderQuestion();
  }

  function renderQuestion() {
    const current = questions[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionText.textContent = current.question;

    optionsContainer.innerHTML = '';
    current.options.forEach((optionText, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'option-button';
      button.textContent = optionText;
      button.addEventListener('click', function () {
        checkAnswer(index);
      });
      optionsContainer.appendChild(button);
    });
  }

  function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestion].answer) {
      score += 1;
    }

    currentQuestion += 1;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    questionNumber.textContent = 'Quiz Complete';
    questionText.textContent = 'Great job! Your final score is:';
    optionsContainer.innerHTML = '';
    quizScore.textContent = `${score} out of ${questions.length} correct`;
    quizFooter.classList.remove('hidden');
  }

  restartButton.addEventListener('click', startQuiz);

  startQuiz();

  const form = document.getElementById('contact-form');
  const responseMessage = document.getElementById('form-response');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    responseMessage.textContent = 'Thank you! Your message is received as a sample placeholder.';
    responseMessage.style.color = '#1f8b4a';

    form.reset();
  });
});
