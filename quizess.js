const quizData = [
    
    // Math Questions
    {
      question: 'What is the value of π (pi) to two decimal places?',
      options: ['3.14', '3.15', '3.16', '3.13'],
      answer: '3.14',
    },
    {
      question: 'What is the quadratic formula used to solve ax^2 + bx + c = 0?',
      options: ['x = (-b ± √(b^2 - 4ac)) / 2a', 'x = (-a ± √(b^2 + 4ac)) / 2b', 'x = (-b ± √(a^2 - 4ac)) / 2c', 'x = (b ± √(a^2 + c)) / 2a'],
      answer: 'x = (-b ± √(b^2 - 4ac)) / 2a',
    },
    {
      question: 'What is the sum of the interior angles of a triangle?',
      options: ['180 degrees', '90 degrees', '360 degrees', '270 degrees'],
      answer: '180 degrees',
    },
    {
      question: 'What is the value of 7 factorial (7!)?',
      options: ['5040', '720', '343', '2520'],
      answer: '5040',
    },
  
    // Physics Questions
    {
      question: 'What is the unit of force in the International System of Units (SI)?',
      options: ['Newton', 'Joule', 'Watt', 'Pascal'],
      answer: 'Newton',
    },
    {
      question: 'Who is known as the father of modern physics?',
      options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Niels Bohr'],
      answer: 'Albert Einstein',
    },
    {
      question: 'What is the speed of light in a vacuum?',
      options: ['299,792,458 meters per second', '300,000,000 meters per second', '150,000,000 meters per second', '3,000,000 meters per second'],
      answer: '299,792,458 meters per second',
    },
    {
      question: 'What law states that for every action, there is an equal and opposite reaction?',
      options: ['Newton’s Third Law', 'Newton’s Second Law', 'Newton’s First Law', 'Law of Universal Gravitation'],
      answer: 'Newton’s Third Law',
    },
  
    // Chemistry Questions
    {
      question: 'What is the most abundant gas in the Earth’s atmosphere?',
      options: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Argon'],
      answer: 'Nitrogen',
    },
    {
      question: 'What is the chemical formula for table salt?',
      options: ['NaCl', 'KCl', 'MgCl2', 'CaCl2'],
      answer: 'NaCl',
    },
    {
      question: 'Which element has the chemical symbol H?',
      options: ['Hydrogen', 'Helium', 'Hafnium', 'Hassium'],
      answer: 'Hydrogen',
    },
    {
      question: 'What is the pH value of pure water?',
      options: ['7', '14', '0', '3'],
      answer: '7',
    }
  ];
  
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();