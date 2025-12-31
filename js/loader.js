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
            // Sort the data naturally by file name before displaying
            data.sort((a, b) => naturalSort(a.name, b.name));

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
