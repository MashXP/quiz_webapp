const appContainer = document.getElementById('app-container');
const dropZoneContainer = document.getElementById('drop-zone-container');
const dropZone = document.getElementById('drop-zone');
const verticalProgressBar = document.getElementById('vertical-progress-bar');
const questionContainer = document.getElementById('question-container');
const questionCounter = document.getElementById('question-counter');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const detailedResultsContainer = document.getElementById('detailed-results');
const restartButton = document.getElementById('restart-btn');
const downloadButton = document.getElementById('download-btn');
const shuffleQuestionsCheckbox = document.getElementById('shuffle-questions-checkbox');
const shuffleChoicesCheckbox = document.getElementById('shuffle-choices-checkbox');
const quizFileNameElement = document.getElementById('quiz-file-name');
const fileUpload = document.getElementById('file-upload');
const delayedFeedbackCheckbox = document.getElementById('delayed-feedback-checkbox');
const flagBtn = document.getElementById('flag-btn');
const submitBtn = document.getElementById('submit-btn');
const versionDisplay = document.getElementById('version-display');
const toggleProgressBtn = document.getElementById('toggle-progress-btn');
const hotDirectoryListContainer = document.getElementById('hot-directory-list-container');
const recommendedQuizzesContainer = document.getElementById('recommended-quizzes-container');
const universalInput = document.getElementById('universal-input');
const universalLoadBtn = document.getElementById('universal-load-btn');

const VERSION = "1.2.1";
versionDisplay.textContent = `v${VERSION}`;

const recommendedQuizzes = [
    {
        name: 'BK - Cell Biology (2025)',
        url: 'https://github.com/MashXP/BK_CellBiology/tree/master/quiz/'
    },
    {
        name: 'Cell Biology (Midterm)',
        url: 'https://github.com/MashXP/BK_CellBiology/tree/master/quiz/BK_midterm'
    },
    {
        name: 'BK - Microbiology (2025)',
        url: 'https://github.com/MashXP/BK_Microbiology/tree/master/quiz/'
    }
];

let questions = [];
let userAnswers = [];
let currentQuestionIndex = 0;
let lastQuestionIndex = -1;
let score = 0;
let answerSelected = false;

fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    processFile(file);
}, false);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeQuiz(quizData, quizName = 'Pasted JSON') {
    questions = quizData;
    
    if (shuffleQuestionsCheckbox.checked) {
        shuffleArray(questions);
    }

    questions.forEach(q => {
        q.shuffledOptions = shuffleChoicesCheckbox.checked ? [...q.options].sort(() => Math.random() - 0.5) : [...q.options];
    });

    userAnswers = [];
    currentQuestionIndex = 0;
    lastQuestionIndex = -1;
    score = 0;
    
    document.getElementById('initial-setup-wrapper').classList.add('hide');
    appContainer.classList.remove('hide');
    resultsContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    detailedResultsContainer.innerHTML = '';

    setupVerticalProgressBar();
    showQuestion();
    quizFileNameElement.textContent = `Loaded: ${quizName}`;

    if (toggleProgressBtn) {
        const progressArrow = document.getElementById('progress-arrow');
        if(progressArrow) {
            progressArrow.className = 'arrow down';
        }
    }

    if (delayedFeedbackCheckbox.checked) {
        submitBtn.classList.remove('hide');
        flagBtn.classList.remove('hide');
        nextButton.classList.add('hide');
    } else {
        submitBtn.classList.add('hide');
        flagBtn.classList.add('hide');
    }
}

function setupVerticalProgressBar() {
    verticalProgressBar.innerHTML = '';
    questions.forEach((q, index) => {
        const block = document.createElement('div');
        block.id = `progress-block-${index}`;
        block.className = 'progress-block';
        block.textContent = index + 1;
        block.addEventListener('click', () => {
            if (resultsContainer.classList.contains('hide')) {
                currentQuestionIndex = index;
                showQuestion();
            } else {
                const resultItem = document.getElementById(`result-item-${index}`);
                if (resultItem) {
                    resultItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        verticalProgressBar.appendChild(block);
    });
}

function showQuestion() {
    resetState();
    updateQuestionCounter();
    
    if (lastQuestionIndex !== -1) {
        const lastBlock = document.getElementById(`progress-block-${lastQuestionIndex}`);
        if (lastBlock) {
            lastBlock.classList.remove('current');
        }
    }

    const currentBlock = document.getElementById(`progress-block-${currentQuestionIndex}`);
    if (currentBlock) {
        currentBlock.classList.add('current');
        currentBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    lastQuestionIndex = currentQuestionIndex;

    const question = questions[currentQuestionIndex];
    questionText.innerText = question.question;

    flagBtn.textContent = question.flagged ? '🏳️' : '🚩';

    let options = question.shuffledOptions;

    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerHTML = `<span style="font-weight: bold; margin-right: 10px;">${String.fromCharCode(65 + index)}</span> ${option}`;
        button.classList.add('option-btn');
        if (delayedFeedbackCheckbox.checked && userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].selectedAnswer === option) {
            button.classList.add('selected');
        }
        button.dataset.index = index;
        button.addEventListener('click', () => selectAnswer(button, option));
        optionsContainer.appendChild(button);
    });
}

function updateQuestionCounter() {
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
}

function resetState() {
    answerSelected = false;
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
    nextButton.classList.add('hide');
}

function selectAnswer(selectedButton, selectedOption) {
    if (delayedFeedbackCheckbox.checked) {
        userAnswers[currentQuestionIndex] = {
            question: questions[currentQuestionIndex].question,
            selectedAnswer: selectedOption,
            correctAnswer: questions[currentQuestionIndex].answer,
        };

        Array.from(optionsContainer.children).forEach(btn => {
            btn.classList.remove('selected');
        });
        selectedButton.classList.add('selected');
        
        const currentBlock = document.getElementById(`progress-block-${currentQuestionIndex}`);
        currentBlock.classList.add('answered');

    } else {
        if (answerSelected) return;
        answerSelected = true;

        const correctAnswer = questions[currentQuestionIndex].answer;
        const isCorrect = selectedOption === correctAnswer;

        userAnswers[currentQuestionIndex] = {
            question: questions[currentQuestionIndex].question,
            selectedAnswer: selectedOption,
            correctAnswer: correctAnswer,
            isCorrect: isCorrect
        };

        if (isCorrect) {
            score++;
        } else {
            selectedButton.classList.add('incorrect');
        }
        
        const currentBlock = document.getElementById(`progress-block-${currentQuestionIndex}`);
        currentBlock.classList.add('answered', isCorrect ? 'correct' : 'incorrect');

        Array.from(optionsContainer.children).forEach(button => {
            if (button.innerText.includes(correctAnswer)) {
                button.classList.add('correct');
            }
            button.disabled = true;
        });

        nextButton.classList.remove('hide');
    }
}

function showResults() {
    if (delayedFeedbackCheckbox.checked) {
        const unansweredQuestions = questions.filter((q, index) => !userAnswers[index] || !userAnswers[index].selectedAnswer);
        if (unansweredQuestions.length > 0) {
            const confirmSubmit = confirm(`You have ${unansweredQuestions.length} unanswered questions. Are you sure you want to submit?`);
            if (!confirmSubmit) {
                return;
            }
        }

        score = 0;
        userAnswers.forEach((answer, index) => {
            const isCorrect = answer.selectedAnswer === answer.correctAnswer;
            answer.isCorrect = isCorrect;
            if (isCorrect) {
                score++;
            }
            const block = document.getElementById(`progress-block-${index}`);
            if (block) {
                block.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        });
    }

    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    submitBtn.classList.add('hide');
    flagBtn.classList.add('hide');
    questionCounter.classList.add('hide');
    resultsContainer.classList.remove('hide');
    verticalProgressBar.classList.add('results-active');
    scoreElement.innerText = score;
    totalQuestionsElement.innerText = questions.length;

    detailedResultsContainer.innerHTML = '';
    userAnswers.forEach((answer, index) => {
        const resultItem = document.createElement('div');
        resultItem.id = `result-item-${index}`;
        resultItem.classList.add('result-item', answer.isCorrect ? 'correct' : 'incorrect');
        let innerHTML = `<p><strong>Q ${index + 1}:</strong> ${answer.question}</p>`;
        if (answer.isCorrect) {
            innerHTML += `<p>Your answer: ${answer.selectedAnswer} (Correct)</p>`;
        } else {
            innerHTML += `<p>Your answer: ${answer.selectedAnswer} (Incorrect)</p>`;
            innerHTML += `<p>Correct answer: ${answer.correctAnswer}</p>`;
        }
        resultItem.innerHTML = innerHTML;
        detailedResultsContainer.appendChild(resultItem);
    });
}

function handleNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

nextButton.addEventListener('click', handleNext);

restartButton.addEventListener('click', () => {
    appContainer.classList.add('hide');
    document.getElementById('initial-setup-wrapper').classList.remove('hide');
    questionCounter.classList.remove('hide');
    verticalProgressBar.classList.remove('results-active');
    quizFileNameElement.textContent = '';
    submitBtn.classList.add('hide');
    flagBtn.classList.add('hide');
});

downloadButton.addEventListener('click', () => {
    const results = {
        score: score,
        totalQuestions: questions.length,
        percentage: (score / questions.length) * 100,
        timestamp: new Date().toISOString(),
        detailedAnswers: userAnswers
    };
    const jsonString = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'result.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

if (toggleProgressBtn) {
    toggleProgressBtn.addEventListener('click', () => {
        verticalProgressBar.classList.toggle('progress-bar-hidden');
        toggleProgressBtn.classList.toggle('bar-is-hidden');
        const isHidden = verticalProgressBar.classList.contains('progress-bar-hidden');
        const progressArrow = document.getElementById('progress-arrow');
        if (progressArrow) {
            progressArrow.classList.toggle('up', isHidden);
            progressArrow.classList.toggle('down', !isHidden);
        }
    });
}

flagBtn.addEventListener('click', () => toggleFlag());
submitBtn.addEventListener('click', () => showResults());

function toggleFlag() {
    const question = questions[currentQuestionIndex];
    question.flagged = !question.flagged;
    
    const currentBlock = document.getElementById(`progress-block-${currentQuestionIndex}`);
    currentBlock.classList.toggle('flagged');
    
    flagBtn.textContent = question.flagged ? '🏳️' : '🚩';
}

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

document.addEventListener('dragleave', (e) => {
    if (!e.relatedTarget || e.relatedTarget.nodeName === 'HTML') {
        dropZone.classList.remove('drag-over');
    }
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    processFile(file);
});

function processFile(file) {
    if (file && file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const quizData = JSON.parse(event.target.result);
                initializeQuiz(quizData, file.name);
            } catch (error) {
                alert('Error parsing JSON file.');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please drop a valid .json file.');
    }
}

document.addEventListener('keydown', (e) => {
    if (appContainer.classList.contains('hide')) return;

    if (e.key === 'Enter' || e.key === ' ') {
        if (!nextButton.classList.contains('hide')) {
            e.preventDefault();
            handleNext();
        }
    }

    const key = e.key.toLowerCase();
    let targetIndex = -1;
    if (key >= '1' && key <= '9') {
        targetIndex = parseInt(key) - 1;
    } else if (key >= 'a' && key <= 'i') {
        targetIndex = key.charCodeAt(0) - 97;
    }

    if (targetIndex !== -1 && !answerSelected) {
        const optionButtons = optionsContainer.querySelectorAll('.option-btn');
        if (optionButtons[targetIndex]) {
            optionButtons[targetIndex].click();
        }
    }
});

function convertToApiUrl(githubUrl) {
    try {
        const url = new URL(githubUrl);
        const pathParts = url.pathname.split('/').filter(part => part);
        if (url.hostname !== 'github.com' || pathParts.length < 4 || pathParts[2] !== 'tree') {
            return null;
        }
        const owner = pathParts[0];
        const repo = pathParts[1];
        const branch = pathParts[3];
        const path = pathParts.slice(4).join('/');
        return `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    } catch (error) {
        return null;
    }
}

function fetchAndDisplayQuizzes(githubUrl) {
    const buttonElement = universalLoadBtn;
    const originalButtonText = buttonElement.textContent;
    
    document.querySelectorAll('.quiz-btn.selected').forEach(btn => {
        btn.classList.remove('selected');
    });

    buttonElement.textContent = 'Loading...';
    buttonElement.disabled = true;

    const apiUrl = convertToApiUrl(githubUrl);

    if (!apiUrl) {
        alert('Invalid GitHub directory URL. Please use the format: https://github.com/owner/repo/tree/branch/path');
        buttonElement.textContent = originalButtonText;
        buttonElement.disabled = false;
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            hotDirectoryListContainer.innerHTML = '';
            if (data.message) {
                throw new Error(data.message);
            }
            data.forEach(item => {
                if (item.type === 'file' && item.name.endsWith('.json')) {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.textContent = item.name;
                    link.dataset.url = item.download_url;
                    link.classList.add('hot-quiz-link');
                    hotDirectoryListContainer.appendChild(link);
                }
            });
            buttonElement.classList.add('selected');
            buttonElement.textContent = originalButtonText;
            buttonElement.disabled = false;
        })
        .catch(error => {
            console.error('Error fetching hot directory:', error);
            alert('Failed to load quizzes from the hot directory. ' + error.message);
            buttonElement.textContent = originalButtonText;
            buttonElement.disabled = false;
        });
}

function populateRecommendedQuizzes() {
    recommendedQuizzes.forEach(quiz => {
        const button = document.createElement('button');
        button.textContent = `${quiz.name}`;
        button.classList.add('quiz-btn');
        button.addEventListener('click', () => {
            universalInput.value = quiz.url;
            fetchAndDisplayQuizzes(quiz.url);
        });
        recommendedQuizzesContainer.appendChild(button);
    });
}

universalLoadBtn.addEventListener('click', () => {
    const input = universalInput.value.trim();
    if (!input) {
        alert('Please enter a GitHub URL or paste a quiz JSON.');
        return;
    }

    if (input.startsWith('https://github.com')) {
        fetchAndDisplayQuizzes(input);
    } else {
        try {
            const quizData = JSON.parse(input);
            initializeQuiz(quizData);
        } catch (error) {
            alert('Invalid input. Please enter a valid GitHub URL or a quiz JSON.');
        }
    }
});

hotDirectoryListContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('hot-quiz-link')) {
        e.preventDefault();
        const url = e.target.dataset.url;
        const quizName = e.target.textContent;
        fetch(url)
            .then(response => response.json())
            .then(quizData => {
                initializeQuiz(quizData, quizName);
            })
            .catch(error => {
                console.error('Error fetching quiz data:', error);
                alert('Failed to load the selected quiz.');
            });
    }
});

populateRecommendedQuizzes();