document.addEventListener('DOMContentLoaded', function () {
  const questions = [
    {
      question: 'What does AI stand for?',
      options: ['Automatic Intelligence', 'Artificial Intelligence', 'Active Interface', 'Applied Internet'],
      answer: 1,
    },
    {
      question: 'Which language is used to style web pages?',
      options: ['HTML', 'CSS', 'JavaScript', 'Python'],
      answer: 1,
    },
    {
      question: 'Which language adds behavior to a website?',
      options: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      answer: 2,
    },
    {
      question: 'Which tool helps beginners write AI prompts and code?',
      options: ['AI playground', 'Graphics editor', 'Spreadsheet', 'Music player'],
      answer: 0,
    },
    {
      question: 'What is a good first AI project for beginners?',
      options: ['Build a simple website', 'Create a full game engine', 'Launch a satellite', 'Build a bank'],
      answer: 0,
    },
    {
      question: 'What is the first part of a web page?',
      options: ['JavaScript', 'CSS', 'HTML', 'SQL'],
      answer: 2,
    },
    {
      question: 'What does CSS control?',
      options: ['Content text', 'Page layout and colors', 'Server data', 'Database tables'],
      answer: 1,
    },
    {
      question: 'What does HTML do?',
      options: ['Style the page', 'Structure the page', 'Store data', 'Run code automatically'],
      answer: 1,
    },
    {
      question: 'Why is responsive design important?',
      options: ['For fast servers', 'For smaller file sizes', 'So the site works on phones', 'So code runs automatically'],
      answer: 2,
    },
    {
      question: 'How can AI help with coding?',
      options: ['By suggesting code snippets', 'By cleaning your room', 'By printing documents', 'By designing buildings'],
      answer: 0,
    },
    {
      question: 'A lesson progress tracker helps you:',
      options: ['Track completed lessons', 'Change colors', 'Write code', 'Send emails'],
      answer: 0,
    },
    {
      question: 'What does the dark mode toggle do?',
      options: ['It adds sound', 'It changes the screen colors', 'It saves data', 'It sends emails'],
      answer: 1,
    },
    {
      question: 'How many options does each quiz question have?',
      options: ['2', '3', '4', '5'],
      answer: 2,
    },
    {
      question: 'What should a beginner-friendly website avoid?',
      options: ['Simple layout', 'Clear buttons', 'Advanced complexity', 'Helpful text'],
      answer: 2,
    },
    {
      question: 'Which section helps you contact the site owner?',
      options: ['Home', 'Learn', 'Quiz', 'Contact'],
      answer: 3,
    },
    {
      question: 'What is one way to improve mobile experience?',
      options: ['Use smaller text', 'Use responsive layout', 'Add more popups', 'Remove buttons'],
      answer: 1,
    },
    {
      question: 'What makes cards look better?',
      options: ['Flat design only', 'Strong shadows, space, and rounded corners', 'Very small fonts', 'No spacing'],
      answer: 1,
    },
    {
      question: 'What does the progress bar show?',
      options: ['How many lessons are complete', 'How many pages exist', 'How many emails sent', 'How fast the site loads'],
      answer: 0,
    },
    {
      question: 'What happens after answering the last quiz question?',
      options: ['The site reloads', 'The score is shown', 'You get a download', 'Nothing changes'],
      answer: 1,
    },
    {
      question: 'How do you restart the quiz?',
      options: ['Refresh browser', 'Click Restart Quiz button', 'Close the tab', 'Open another site'],
      answer: 1,
    },
  ];

  const questionNumber = document.getElementById('question-number');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const quizFooter = document.getElementById('quiz-footer');
  const quizScore = document.getElementById('quiz-score');
  const restartButton = document.getElementById('restart-button');
  const themeToggle = document.getElementById('theme-toggle');
  const progressPercent = document.getElementById('progress-percent');
  const progressFill = document.getElementById('progress-fill');
  const lessonCards = Array.from(document.querySelectorAll('.lesson-card'));

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

  function updateProgress() {
    const completed = lessonCards.filter((card) => card.classList.contains('completed')).length;
    const percent = Math.round((completed / lessonCards.length) * 100);
    progressPercent.textContent = `${percent}% complete`;
    progressFill.style.width = `${percent}%`;
  }

  function toggleLesson(event) {
    const card = event.currentTarget;
    card.classList.toggle('completed');
    const status = card.querySelector('.lesson-status');
    status.textContent = card.classList.contains('completed') ? 'Completed' : 'Mark complete';
    updateProgress();
  }

  function updateThemeButton() {
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButton();
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  updateThemeButton();

  lessonCards.forEach((card) => {
    card.addEventListener('click', toggleLesson);
  });

  themeToggle.addEventListener('click', toggleTheme);
  restartButton.addEventListener('click', startQuiz);

  startQuiz();
  updateProgress();

  const form = document.getElementById('contact-form');
  const responseMessage = document.getElementById('form-response');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    responseMessage.textContent = 'Thank you! Your message is received as a sample placeholder.';
    responseMessage.style.color = '#1f8b4a';

    form.reset();
  });
});
