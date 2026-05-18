function initializeQuiz(quizData, quizName = 'Pasted JSON') {
    questions = quizData;

    if (shuffleQuestionsCheckbox.checked) {
        shuffleArray(questions);
    } else {
        // If not shuffling, apply natural sort to questions based on their text
        questions.sort((a, b) => naturalSort(a.question, b.question));
    }

    questions.forEach(q => {
        if (q.shuffleOptions === false) {
            q.shuffledOptions = [...q.options];
        } else if (shuffleChoicesCheckbox.checked) {
            q.shuffledOptions = [...q.options];
            shuffleArray(q.shuffledOptions);
        } else {
            q.shuffledOptions = [...q.options].sort((a, b) => naturalSort(a, b));
        }
    });

    userAnswers = [];
    currentQuestionIndex = 0;
    lastQuestionIndex = -1;
    score = 0;

    filterIncorrectCheckbox.checked = false;

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
        if (progressArrow) {
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

function selectAnswer(selectedButton, selectedOption) {
    if (delayedFeedbackCheckbox.checked) {
        userAnswers[currentQuestionIndex] = {
            question: questions[currentQuestionIndex].question,
            selectedAnswer: selectedOption,
            correctAnswer: questions[currentQuestionIndex].answer,
        };

        const currentOptionsWrapper = document.getElementById('options-wrapper');
        if (currentOptionsWrapper) {
            Array.from(currentOptionsWrapper.children).forEach(btn => {
                btn.classList.remove('selected');
            });
        }
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
            selectedButton.classList.add('correct'); // Highlight selected button as correct
        } else {
            selectedButton.classList.add('incorrect'); // Highlight selected button as incorrect
        }

        const currentBlock = document.getElementById(`progress-block-${currentQuestionIndex}`);
        currentBlock.classList.add('answered', isCorrect ? 'correct' : 'incorrect');

        const currentOptionsWrapper = document.getElementById('options-wrapper');
        if (currentOptionsWrapper) {
            Array.from(currentOptionsWrapper.children).forEach(button => {
                // Only highlight the correct answer if the selected answer was incorrect
                if (!isCorrect && button.dataset.option === correctAnswer) {
                    button.classList.add('correct');
                }
                button.disabled = true;
            });
        }

        nextButton.classList.remove('hide');
    }

    if (autoMoveCheckbox && autoMoveCheckbox.checked) {
        if (currentQuestionIndex < questions.length - 1) {
            if (autoMoveTimeout) {
                clearTimeout(autoMoveTimeout);
            }
            autoMoveTimeout = setTimeout(() => {
                handleNext();
                autoMoveTimeout = null;
            }, 1000);
        }
    }
}

function handleNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function toggleFlag() {
    const question = questions[currentQuestionIndex];
    question.flagged = !question.flagged;

    const currentBlock = document.getElementById(`progress-block-${currentQuestionIndex}`);
    currentBlock.classList.toggle('flagged');

    flagBtn.textContent = question.flagged ? '🏳️' : '🚩';
}
