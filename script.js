document.addEventListener('DOMContentLoaded', function () {
  const questions = [
    {
      question: 'What does AI stand for?',
      options: ['Automatic Intelligence', 'Artificial Intelligence', 'Active Interface', 'Applied Internet'],
      answer: 1,
      explanation: 'AI stands for Artificial Intelligence — systems that can perform tasks that normally require human intelligence.'
    },
    {
      question: 'Which language is used to style web pages?',
      options: ['HTML', 'CSS', 'JavaScript', 'Python'],
      answer: 1,
      explanation: 'CSS (Cascading Style Sheets) is used to style the appearance of web pages.'
    },
    {
      question: 'Which language adds behavior to a website?',
      options: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      answer: 2,
      explanation: 'JavaScript adds interactivity and behavior to web pages.'
    },
    {
      question: 'Which tool helps beginners write AI prompts and code?',
      options: ['AI playground', 'Graphics editor', 'Spreadsheet', 'Music player'],
      answer: 0,
      explanation: 'An AI playground or assistant helps craft prompts and generate code/examples.'
    },
    {
      question: 'What is a good first AI project for beginners?',
      options: ['Build a simple website', 'Create a full game engine', 'Launch a satellite', 'Build a bank'],
      answer: 0,
      explanation: 'Starting with a simple website is a practical, achievable project for beginners.'
    },
    {
      question: 'What is the first part of a web page?',
      options: ['JavaScript', 'CSS', 'HTML', 'SQL'],
      answer: 2,
      explanation: 'HTML provides the structure and content of a web page.'
    },
    {
      question: 'What does CSS control?',
      options: ['Content text', 'Page layout and colors', 'Server data', 'Database tables'],
      answer: 1,
      explanation: 'CSS controls layout, colors, spacing and visual presentation.'
    },
    {
      question: 'What does HTML do?',
      options: ['Style the page', 'Structure the page', 'Store data', 'Run code automatically'],
      answer: 1,
      explanation: 'HTML structures the content of a page with elements like headings and paragraphs.'
    },
    {
      question: 'Why is responsive design important?',
      options: ['For fast servers', 'For smaller file sizes', 'So the site works on phones', 'So code runs automatically'],
      answer: 2,
      explanation: 'Responsive design ensures a website works well on different screen sizes, including phones.'
    },
    {
      question: 'How can AI help with coding?',
      options: ['By suggesting code snippets', 'By cleaning your room', 'By printing documents', 'By designing buildings'],
      answer: 0,
      explanation: 'AI can suggest code snippets, complete patterns, and help debug or explain code.'
    },
    {
      question: 'A lesson progress tracker helps you:',
      options: ['Track completed lessons', 'Change colors', 'Write code', 'Send emails'],
      answer: 0,
      explanation: 'A tracker shows which lessons you have completed so you can measure progress.'
    },
    {
      question: 'What does the dark mode toggle do?',
      options: ['It adds sound', 'It changes the screen colors', 'It saves data', 'It sends emails'],
      answer: 1,
      explanation: 'Dark mode changes the color scheme to darker backgrounds and lighter text.'
    },
    {
      question: 'How many options does each quiz question have?',
      options: ['2', '3', '4', '5'],
      answer: 2,
      explanation: 'Each quiz question uses four options to choose from.'
    },
    {
      question: 'What should a beginner-friendly website avoid?',
      options: ['Simple layout', 'Clear buttons', 'Advanced complexity', 'Helpful text'],
      answer: 2,
      explanation: 'Avoid overwhelming beginners with advanced complexity; keep interfaces simple.'
    },
    {
      question: 'Which section helps you contact the site owner?',
      options: ['Home', 'Learn', 'Quiz', 'Contact'],
      answer: 3,
      explanation: 'The Contact section provides ways to reach the site owner.'
    },
    {
      question: 'What is one way to improve mobile experience?',
      options: ['Use smaller text', 'Use responsive layout', 'Add more popups', 'Remove buttons'],
      answer: 1,
      explanation: 'Responsive layouts adapt content so it fits and is usable on small screens.'
    },
    {
      question: 'What makes cards look better?',
      options: ['Flat design only', 'Strong shadows, space, and rounded corners', 'Very small fonts', 'No spacing'],
      answer: 1,
      explanation: 'Good spacing, subtle shadows, and rounded corners improve visual clarity.'
    },
    {
      question: 'What does the progress bar show?',
      options: ['How many lessons are complete', 'How many pages exist', 'How many emails sent', 'How fast the site loads'],
      answer: 0,
      explanation: 'Progress bars indicate how much of a set of tasks (like lessons) are finished.'
    },
    {
      question: 'What happens after answering the last quiz question?',
      options: ['The site reloads', 'The score is shown', 'You get a download', 'Nothing changes'],
      answer: 1,
      explanation: 'After the final question, the quiz shows your score and feedback.'
    },
    {
      question: 'How do you restart the quiz?',
      options: ['Refresh browser', 'Click Restart Quiz button', 'Close the tab', 'Open another site'],
      answer: 1,
      explanation: 'Click the Restart Quiz button to try the quiz again.'
    },
  ];

  const questionNumber = document.getElementById('question-number');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const quizFooter = document.getElementById('quiz-footer');
  const quizScore = document.getElementById('quiz-score');
  const restartButton = document.getElementById('restart-button');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const progressPercent = document.getElementById('progress-percent');
  const progressFill = document.getElementById('progress-fill');
  const lessonCards = Array.from(document.querySelectorAll('.lesson-card'));
  const lessonDetails = Array.from(document.querySelectorAll('.lesson-detail'));
  const lessonSearch = document.getElementById('lesson-search');
  const lessonCategory = document.getElementById('lesson-category');
  const progressCompact = document.getElementById('progress-percent-compact');

  let currentQuestion = 0;
  let score = 0;
  let completedLessons = new Set();
  let activeLessonId = null;
  let unlockedAchievements = new Set();
  let lastQuizScore = null;

  // ========== PROGRESS MEMORY ==========
  function saveProgress() {
    localStorage.setItem('completedLessons', JSON.stringify(Array.from(completedLessons)));
    localStorage.setItem('lastQuizScore', lastQuizScore);
    localStorage.setItem('unlockedAchievements', JSON.stringify(Array.from(unlockedAchievements)));
  }

  function loadProgress() {
    const saved = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    saved.forEach((id) => completedLessons.add(id));

    lastQuizScore = localStorage.getItem('lastQuizScore');
    const savedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    savedAchievements.forEach((ach) => unlockedAchievements.add(ach));
  }

  function resetProgress() {
    if (confirm('Are you sure? This will reset all your progress, quiz scores, and achievements.')) {
      completedLessons.clear();
      lastQuizScore = null;
      unlockedAchievements.clear();
      score = 0;
      localStorage.removeItem('completedLessons');
      localStorage.removeItem('lastQuizScore');
      localStorage.removeItem('unlockedAchievements');
      location.reload();
    }
  }

  // ========== ACHIEVEMENT SYSTEM ==========
  function checkAchievement() {
    const completedCount = completedLessons.size;

    // Beginner Explorer: Complete first lesson
    if (completedCount >= 1 && !unlockedAchievements.has('beginner-explorer')) {
      unlockAchievement('beginner-explorer', '🌱 Beginner Explorer', 'You completed your first lesson!');
    }

    // Learning Streak: Complete 3 lessons
    if (completedCount >= 3 && !unlockedAchievements.has('learning-streak')) {
      unlockAchievement('learning-streak', '🔥 Learning Streak', 'You\'ve completed 3 lessons!');
    }

    // Future Builder: Complete all lessons
    if (completedCount === 12 && !unlockedAchievements.has('future-builder')) {
      unlockAchievement('future-builder', '🏆 Future Builder', 'You completed all beginner lessons!');
    }

    // Quiz Master: Score 80% or higher
    if (lastQuizScore && lastQuizScore >= 16 && !unlockedAchievements.has('quiz-master')) {
      unlockAchievement('quiz-master', '🎯 Quiz Master', 'You scored 80% or higher on the quiz!');
    }
  }

  function unlockAchievement(id, title, message) {
    unlockedAchievements.add(id);
    const badge = document.querySelector(`[data-achievement="${id}"]`);
    if (badge) {
      badge.classList.add('unlocked');
      badge.classList.remove('locked');
    }
    showAchievementNotification(title, message);
    saveProgress();
  }

  function showAchievementNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.textContent = `${title} - ${message}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  function updateDashboard() {
    document.getElementById('stat-lessons').textContent = `${completedLessons.size}/12`;
    document.getElementById('stat-quiz').textContent = lastQuizScore ? `${lastQuizScore}/20` : '—';
    document.getElementById('stat-achievements').textContent = `${unlockedAchievements.size}/5`;
    document.getElementById('stat-progress').textContent = `${Math.round((completedLessons.size / 12) * 100)}%`;
  }

  // ========== SEARCH FEATURE ==========
  function setupSearch() {
    const globalSearch = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');

    const searchableItems = [];

    // Collect lessons
    lessonCards.forEach(card => {
      searchableItems.push({
        type: 'Lesson',
        title: card.dataset.lesson,
        href: '#learn',
        element: card
      });
    });

    // Collect FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('h3')?.textContent || '';
      searchableItems.push({
        type: 'FAQ',
        title: question,
        href: '#faq'
      });
    });

    // Collect examples
    const exampleSection = document.getElementById('examples');
    if (exampleSection) {
      searchableItems.push({
        type: 'Example',
        title: 'Copy code examples',
        href: '#examples'
      });
    }

    globalSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      searchResults.innerHTML = '';

      if (query.length < 2) {
        searchResults.classList.add('hidden');
        return;
      }

      const matches = searchableItems.filter(item =>
        item.title.toLowerCase().includes(query)
      ).slice(0, 8);

      if (matches.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item"><em>No results found</em></div>';
        searchResults.classList.remove('hidden');
        return;
      }

      matches.forEach(match => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `
          <div class="search-result-type">${match.type}</div>
          <a href="${match.href}" class="search-result-title">${match.title}</a>
        `;
        div.addEventListener('click', () => {
          globalSearch.value = '';
          searchResults.classList.add('hidden');
          window.location.href = match.href;
        });
        searchResults.appendChild(div);
      });

      searchResults.classList.remove('hidden');
    });

    // Close search on blur
    globalSearch.addEventListener('blur', () => {
      setTimeout(() => searchResults.classList.add('hidden'), 200);
    });
  }

  // ========== AI TUTOR ACHIEVED ==========
  function markAITutorUsed() {
    if (!unlockedAchievements.has('ai-explorer')) {
      unlockAchievement('ai-explorer', '🚀 AI Explorer', 'You used the AI Tutor!');
    }
  }

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
    // clear any previous explanation
    const oldExplanation = document.getElementById('explanation-box');
    if (oldExplanation) oldExplanation.remove();
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
    // disable buttons
    const buttons = Array.from(optionsContainer.querySelectorAll('button'));
    buttons.forEach((b) => (b.disabled = true));

    const correct = selectedIndex === questions[currentQuestion].answer;
    if (correct) score += 1;

    // show explanation if present
    const explanation = document.createElement('div');
    explanation.id = 'explanation-box';
    explanation.style.marginTop = '12px';
    explanation.style.padding = '12px';
    explanation.style.borderRadius = '12px';
    explanation.style.background = 'var(--surface-strong)';
    explanation.textContent = questions[currentQuestion].explanation || (correct ? 'Correct!' : 'Not quite.');
    optionsContainer.appendChild(explanation);

    // show continue button
    const continueBtn = document.createElement('button');
    continueBtn.className = 'button button-secondary';
    continueBtn.textContent = currentQuestion < questions.length - 1 ? 'Next question' : 'See results';
    continueBtn.style.marginTop = '12px';
    continueBtn.addEventListener('click', function () {
      currentQuestion += 1;
      if (currentQuestion < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    });
    optionsContainer.appendChild(continueBtn);
  }

  function showResult() {
    questionNumber.textContent = 'Quiz Complete';
    questionText.textContent = 'Great job! Your final score is:';
    optionsContainer.innerHTML = '';
    quizScore.textContent = `${score} out of ${questions.length} correct`;
    quizFooter.classList.remove('hidden');
    // show encouraging feedback
    const percent = Math.round((score / questions.length) * 100);
    const feedback = document.createElement('p');
    feedback.style.marginTop = '12px';
    if (percent >= 90) feedback.textContent = 'Excellent work — you really get it!';
    else if (percent >= 70) feedback.textContent = 'Great job — a little more practice and you’ll be there.';
    else if (percent >= 50) feedback.textContent = 'Good start — try reviewing a few lessons and try again.';
    else feedback.textContent = 'Keep going — learning takes time. Try the lessons again.';
    quizScore.parentNode.appendChild(feedback);
    // Save quiz score and check achievement
    lastQuizScore = score;
    saveProgress();
    checkAchievement();
    updateDashboard();  }

  function updateProgress() {
    const completed = lessonCards.filter((card) => card.classList.contains('completed')).length;
    const percent = Math.round((completed / lessonCards.length) * 100);
    progressPercent.textContent = `${percent}% complete`;
    progressFill.style.width = `${percent}%`;
    if (progressCompact) progressCompact.textContent = `${percent}%`;
  }

  function toggleLesson(event) {
    event.stopPropagation();
    const card = event.currentTarget.closest('.lesson-card') || event.currentTarget;
    const id = card.dataset.lessonId;
    card.classList.toggle('completed');
    const status = card.querySelector('.lesson-status');
    status.textContent = card.classList.contains('completed') ? 'Completed' : 'Mark complete';
    // badge
    const badge = card.querySelector('.badge');
    if (card.classList.contains('completed')) {
      badge.textContent = 'Completed';
      badge.classList.remove('hidden');
      completedLessons.add(id);
    } else {
      badge.classList.add('hidden');
      completedLessons.delete(id);
    }
    // persist and check achievements
    saveProgress();
    updateProgress();
    checkAchievement();
    updateDashboard();
  }

  function openLessonDetail(event) {
    const card = event.currentTarget;
    const id = card.dataset.lessonId;
    if (!id) return;
    activeLessonId = id;
    lessonDetails.forEach((d) => {
      d.classList.toggle('active', d.dataset.lessonId === id || (!d.dataset.lessonId && id === '1'));
    });
    // scroll to the detail area
    const firstDetail = document.querySelector('.lesson-detail.active');
    if (firstDetail) firstDetail.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function findActiveDetailIndex() {
    return lessonDetails.findIndex((d) => d.classList.contains('active'));
  }

  function showNextDetail() {
    const idx = findActiveDetailIndex();
    if (idx >= 0 && idx < lessonDetails.length - 1) {
      lessonDetails[idx].classList.remove('active');
      lessonDetails[idx + 1].classList.add('active');
      lessonDetails[idx + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function showPrevDetail() {
    const idx = findActiveDetailIndex();
    if (idx > 0) {
      lessonDetails[idx].classList.remove('active');
      lessonDetails[idx - 1].classList.add('active');
      lessonDetails[idx - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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

  // Load progress from localStorage and display achievements
  loadProgress();
  updateDashboard();
  setupSearch();

  // restore completed lessons from storage
  lessonCards.forEach((card) => {
    // clicking the card opens the detail
    card.addEventListener('click', openLessonDetail);
    // clicking the status toggles completion
    const status = card.querySelector('.lesson-status');
    if (status) status.addEventListener('click', toggleLesson);
    // reflect saved completion
    const id = card.dataset.lessonId;
    if (id && completedLessons.has(id)) {
      card.classList.add('completed');
      const badge = card.querySelector('.badge');
      if (badge) { badge.textContent = 'Completed'; badge.classList.remove('hidden'); }
      const statusEl = card.querySelector('.lesson-status');
      if (statusEl) statusEl.textContent = 'Completed';
    }
  });

  // Display unlocked achievements
  document.querySelectorAll('.achievement-badge').forEach(badge => {
    if (unlockedAchievements.has(badge.dataset.achievement)) {
      badge.classList.add('unlocked');
      badge.classList.remove('locked');
    }
  });

  // show first lesson detail by default
  if (lessonDetails.length) {
    lessonDetails.forEach((d) => d.classList.remove('active'));
    lessonDetails[0].classList.add('active');
    activeLessonId = lessonDetails[0].dataset.lessonId || '1';
  }

  // initial progress update
  updateProgress();

  // lesson detail navigation
  document.querySelectorAll('.lesson-next').forEach((b) => b.addEventListener('click', showNextDetail));
  document.querySelectorAll('.lesson-prev').forEach((b) => b.addEventListener('click', showPrevDetail));

  // search and category filter
  function filterLessons() {
    const q = (lessonSearch && lessonSearch.value || '').toLowerCase();
    const cat = (lessonCategory && lessonCategory.value) || 'all';
    lessonCards.forEach((card) => {
      const title = (card.dataset.lesson || '').toLowerCase();
      const category = (card.dataset.category || '').toLowerCase();
      const matchesQ = !q || title.indexOf(q) !== -1;
      const matchesCat = cat === 'all' || category === cat;
      card.style.display = (matchesQ && matchesCat) ? '' : 'none';
    });
  }

  if (lessonSearch) lessonSearch.addEventListener('input', filterLessons);
  if (lessonCategory) lessonCategory.addEventListener('change', filterLessons);

  // Reset Progress Button
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) resetBtn.addEventListener('click', resetProgress);

  themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', function(){ toggleTheme(); if (siteNav) { siteNav.classList.remove('open'); mobileMenuToggle.setAttribute('aria-expanded','false'); }});
  if (mobileMenuToggle && siteNav) {
    mobileMenuToggle.addEventListener('click', function(e){
      const isOpen = siteNav.classList.toggle('open');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close nav when a link is clicked
    siteNav.querySelectorAll('a').forEach((a)=> a.addEventListener('click', ()=>{ siteNav.classList.remove('open'); if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded','false'); }));
  }
  restartButton.addEventListener('click', startQuiz);

  startQuiz();
  updateProgress();

  const form = document.getElementById('contact-form');
  const responseMessage = document.getElementById('form-response');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    responseMessage.textContent = 'Thank you! Your message is received as a sample placeholder.';
    responseMessage.classList.remove('hidden');
    responseMessage.classList.add('success');

    form.reset();
  });

  // AI Tutor chat functionality
  const tutorResponses = {
    'What is AI?': 'AI (Artificial Intelligence) is a technology that enables computers to learn from examples and make intelligent decisions. It powers recommendations, image recognition, chatbots, and much more.',
    'What is HTML?': 'HTML (HyperText Markup Language) is the foundation of web pages. It uses tags like <h1>, <p>, and <button> to structure content. Think of it as the skeleton of a website.',
    'What is CSS?': 'CSS (Cascading Style Sheets) controls how web pages look. It handles colors, spacing, fonts, and layouts. While HTML is the structure, CSS is the styling and appearance.',
    'What is JavaScript?': 'JavaScript is a programming language that adds interactivity to websites. It lets you respond to clicks, validate forms, and dynamically update page content. It\'s the behavior layer of web development.',
    'What is GitHub?': 'GitHub is a platform where developers store and collaborate on code projects. It uses Git (a version control system) to track changes, making it easy to work with others and keep history of your work.',
    'What is GitHub Pages?': 'GitHub Pages is a free service that lets you publish websites directly from a GitHub repository. Just push your HTML/CSS/JS files, enable Pages in settings, and your site goes live instantly.',
    'What is VS Code?': 'VS Code is a free, lightweight code editor from Microsoft. It\'s perfect for beginners — you can write HTML, CSS, JavaScript, and more. It has helpful features like code highlighting and extensions.',
    'What is a repository?': 'A repository (or "repo") is a folder that stores your project files and tracks all changes with Git. Think of it as a save file system for your code that remembers every modification.',
    'What is responsive design?': 'Responsive design means making websites that look good and work well on all screen sizes — phones, tablets, and computers. You use CSS media queries to adjust layouts for different sizes.',
    'What is dark mode?': 'Dark mode is a color scheme with dark backgrounds and light text. It\'s easier on the eyes in dim lighting and uses less battery on phones. You can toggle it using CSS variables.',
    'What is a 404 error?': 'A 404 error means "Page Not Found." It happens when you try to visit a webpage that doesn\'t exist. Servers return this code when they can\'t find the resource you requested.',
    'Why is my JavaScript not working?': 'Common JS issues: 1) Check your syntax for typos. 2) Make sure functions are called after the page loads (use DOMContentLoaded). 3) Open DevTools (F12) and check the Console for errors. 4) Verify element IDs/classes match.',
    'How do I publish a website?': 'There are many ways: GitHub Pages (free), Netlify (free), Vercel (free), or hosting services. GitHub Pages is perfect for beginners — push your files to a GitHub repo and enable Pages in settings!',
    'Can AI help me build websites?': 'Yes! AI tools can suggest layouts, generate copy, write code snippets, and help debug. Use them as a helper and learning tool, but always review and understand the output.'
  };

  const chatDisplay = document.getElementById('chat-display');
  const tutorInput = document.getElementById('tutor-input');
  const tutorSend = document.getElementById('tutor-send');
  const exampleBtns = Array.from(document.querySelectorAll('.example-btn'));

  function addChatMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ' + (isUser ? 'user' : 'ai');
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'chat-bubble';
    
    const timeStamp = document.createElement('small');
    const now = new Date();
    timeStamp.style.fontSize = '0.75rem';
    timeStamp.style.opacity = '0.7';
    timeStamp.style.display = 'block';
    timeStamp.style.marginTop = '4px';
    timeStamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    bubbleDiv.textContent = text;
    bubbleDiv.appendChild(timeStamp);
    messageDiv.appendChild(bubbleDiv);
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }

  function typeWriterEffect(bubbleDiv, text, callback) {
    let index = 0;
    const speed = 20;
    bubbleDiv.textContent = '';
    function type() {
      if (index < text.length) {
        bubbleDiv.textContent += text.charAt(index);
        index += 1;
        setTimeout(type, speed);
      } else if (callback) callback();
    }
    type();
  }

  function handleTutorQuestion(question) {
    if (!question.trim()) return;
    addChatMessage(question, true);
    tutorInput.value = '';
    tutorInput.focus();

    const response = tutorResponses[question] || 'I\'m not sure about that yet. Try asking about AI, HTML, CSS, JavaScript, GitHub, VS Code, responsive design, or other web development topics!';
    
    setTimeout(() => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'chat-message ai';
      const bubbleDiv = document.createElement('div');
      bubbleDiv.className = 'chat-bubble';
      messageDiv.appendChild(bubbleDiv);
      chatDisplay.appendChild(messageDiv);
      
      typeWriterEffect(bubbleDiv, response, () => {
        const timeStamp = document.createElement('small');
        const now = new Date();
        timeStamp.style.fontSize = '0.75rem';
        timeStamp.style.opacity = '0.7';
        timeStamp.style.display = 'block';
        timeStamp.style.marginTop = '4px';
        timeStamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        bubbleDiv.appendChild(timeStamp);
      });
      chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }, 300);
  }

  tutorSend.addEventListener('click', () => handleTutorQuestion(tutorInput.value));
  tutorInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleTutorQuestion(tutorInput.value); });
  exampleBtns.forEach(btn => btn.addEventListener('click', () => handleTutorQuestion(btn.dataset.question)));

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Copy Code Button
  const copyCodeBtns = Array.from(document.querySelectorAll('.copy-code-btn'));
  copyCodeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      navigator.clipboard.writeText(code).then(() => {
        btn.classList.add('copied');
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = '📋 Copy';
        }, 2000);
      });
    });
  });

  // Daily Tips
  const tips = [
    'Practice small projects every day. Start with one feature and expand from there.',
    'Read error messages carefully — they tell you exactly what\'s wrong.',
    'Use browser DevTools (F12) to inspect elements and debug issues.',
    'Test your code on different screen sizes to catch mobile issues early.',
    'Comment your code so you remember why you wrote it.',
    'Build projects instead of just reading tutorials.',
    'Don\'t copy-paste code — type it out to learn muscle memory.',
    'Break down complex problems into smaller, solvable steps.',
    'Ask questions in developer communities — everyone was a beginner once!',
    'Version control (Git) saves your work and lets you track changes.'
  ];

  const tipText = document.getElementById('daily-tip-text');
  const newTipBtn = document.getElementById('new-tip-btn');
  let tipIndex = 0;

  function setRandomTip() {
    tipIndex = Math.floor(Math.random() * tips.length);
    tipText.textContent = tips[tipIndex];
  }

  setRandomTip();
  newTipBtn.addEventListener('click', setRandomTip);

  // AI Facts
  const facts = [
    'Machine learning powers Netflix recommendations, YouTube suggestions, and Spotify playlists.',
    'Deep learning uses neural networks inspired by how brains work.',
    'Large Language Models like ChatGPT are trained on billions of words from the internet.',
    'GPT stands for "Generative Pre-trained Transformer" — a type of neural network.',
    'AI isn\'t magic — it\'s math and statistics finding patterns in data.',
    'Natural Language Processing helps AI understand and generate human language.',
    'Overfitting happens when AI learns the training data too well and can\'t generalize.',
    'Transfer learning lets you use pre-trained models as a starting point.',
    'AI bias occurs when training data isn\'t diverse enough.',
    'Prompt engineering is the art of asking AI the right questions to get better answers.'
  ];

  const factText = document.getElementById('ai-fact-text');
  const newFactBtn = document.getElementById('new-fact-btn');
  let factIndex = 0;

  function setRandomFact() {
    factIndex = Math.floor(Math.random() * facts.length);
    factText.textContent = facts[factIndex];
  }

  setRandomFact();
  newFactBtn.addEventListener('click', setRandomFact);
});
