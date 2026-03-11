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
    questionText.innerHTML = question.question; // Use innerHTML for LaTeX rendering

    flagBtn.textContent = question.flagged ? '🏳️' : '🚩';

    let options = question.shuffledOptions;

    optionsContainer.innerHTML = ''; // Clear previous options
    const optionsWrapper = document.createElement('div');
    optionsWrapper.id = 'options-wrapper'; // New wrapper for options

    const userAnswer = userAnswers[currentQuestionIndex];

    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerHTML = `<span style="font-weight: bold; margin-right: 10px;">${String.fromCharCode(65 + index)}</span> ${option}`;
        button.classList.add('option-btn');
        
        if (userAnswer) {
            if (delayedFeedbackCheckbox.checked) {
                if (userAnswer.selectedAnswer === option) {
                    button.classList.add('selected');
                }
            } else {
                button.disabled = true;
                if (userAnswer.selectedAnswer === option) {
                    button.classList.add(userAnswer.isCorrect ? 'correct' : 'incorrect');
                }
                if (!userAnswer.isCorrect && option === userAnswer.correctAnswer) {
                    button.classList.add('correct');
                }
            }
        }

        button.dataset.index = index;
        button.dataset.option = option; // Store the option text in a dataset attribute
        button.addEventListener('click', () => selectAnswer(button, option));
        optionsWrapper.appendChild(button); // Append to wrapper
    });
    optionsContainer.appendChild(optionsWrapper); // Append wrapper to container

    if (userAnswer && !delayedFeedbackCheckbox.checked) {
        answerSelected = true;
        nextButton.classList.remove('hide');
    }

    // Render LaTeX in the entire question container
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(questionContainer, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ]
        });
    }
}
