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

    // Render LaTeX in the detailed results container
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(detailedResultsContainer, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ]
        });
    }
}

function downloadResults() {
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
}
