function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function naturalSort(a, b) {
    const re = /(\d+)/g;
    const aParts = a.split(re).filter(Boolean);
    const bParts = b.split(re).filter(Boolean);

    for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
        const aPart = aParts[i];
        const bPart = bParts[i];

        const isANum = !isNaN(aPart) && !isNaN(parseFloat(aPart));
        const isBNum = !isNaN(bPart) && !isNaN(parseFloat(bPart));

        if (isANum && isBNum) {
            const numA = parseFloat(aPart);
            const numB = parseFloat(bPart);
            if (numA !== numB) {
                return numA - numB;
            }
        } else if (aPart !== bPart) {
            return aPart.localeCompare(bPart);
        }
    }
    return aParts.length - bParts.length;
}

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

function saveAppState() {
    const state = {
        shuffleQuestions: shuffleQuestionsCheckbox ? shuffleQuestionsCheckbox.checked : false,
        shuffleChoices: shuffleChoicesCheckbox ? shuffleChoicesCheckbox.checked : true,
        delayedFeedback: delayedFeedbackCheckbox ? delayedFeedbackCheckbox.checked : false,
        autoMove: autoMoveCheckbox ? autoMoveCheckbox.checked : false,
        filterIncorrect: filterIncorrectCheckbox ? filterIncorrectCheckbox.checked : false,
        lastUrl: universalInput ? universalInput.value : ''
    };
    localStorage.setItem('quizAppState', JSON.stringify(state));
}

function loadAppState() {
    const savedState = localStorage.getItem('quizAppState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            if (shuffleQuestionsCheckbox) shuffleQuestionsCheckbox.checked = state.shuffleQuestions;
            if (shuffleChoicesCheckbox) shuffleChoicesCheckbox.checked = state.shuffleChoices;
            if (delayedFeedbackCheckbox) delayedFeedbackCheckbox.checked = state.delayedFeedback;
            if (autoMoveCheckbox) autoMoveCheckbox.checked = state.autoMove || false;
            if (filterIncorrectCheckbox) filterIncorrectCheckbox.checked = state.filterIncorrect;
            if (universalInput) universalInput.value = state.lastUrl || '';
            return state;
        } catch (e) {
            console.error("Failed to load app state", e);
        }
    }
    return null;
}
