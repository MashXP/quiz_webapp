fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    processFile(file);
}, false);

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

downloadButton.addEventListener('click', downloadResults);

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

document.addEventListener('keydown', (e) => {
    if (appContainer.classList.contains('hide')) return;

    // Prevent shortcuts if modifier keys are pressed
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
        return;
    }

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
        return;
    }

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        }
        return;
    }

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

filterIncorrectCheckbox.addEventListener('change', () => {
    const correctItems = document.querySelectorAll('.result-item.correct');
    correctItems.forEach(item => {
        item.style.display = filterIncorrectCheckbox.checked ? 'none' : 'block';
    });
});

// Initialize
populateRecommendedQuizzes();
