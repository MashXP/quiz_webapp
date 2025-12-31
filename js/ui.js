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

function updateQuestionCounter() {
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
}

function resetState() {
    answerSelected = false;
    optionsContainer.innerHTML = ''; // This clears all children including options and correct answer displays
    nextButton.classList.add('hide');
}
