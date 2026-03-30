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
const filterIncorrectCheckbox = document.getElementById('filter-incorrect-checkbox');

const VERSION = "1.2.6";
if (versionDisplay) {
    versionDisplay.textContent = `v${VERSION}`;
}

const recommendedQuizzes = [
    {
        name: 'BK - Molecular Biology & Genetics (Midterm - 2026)',
        url: 'https://github.com/MashXP/BK/tree/master/BK_Fermentation/quiz/'
    },
    {
        name: 'BK - Fermentation Technology (Midterm - 2026)',
        url: 'https://github.com/MashXP/BK/tree/master/BK_MolecularBiology/quiz/'
    },
    {
        name: 'BK - Cell Biology (2025)',
        url: 'https://github.com/MashXP/BK/tree/master/BK_CellBiology/quiz/'
    },
    {
        name: 'Cell Biology (Midterm)',
        url: 'https://github.com/MashXP/BK/tree/master/BK_CellBiology/quiz/BK_midterm'
    },
    {
        name: 'Cell Biology (Finalterm)',
        url: 'https://github.com/MashXP/BK/tree/master/BK_CellBiology/quiz/BK_finalterm'
    },
    {
        name: 'BK - Microbiology (2025)',
        url: 'https://github.com/MashXP/BK/tree/master/BK_Microbiology/quiz/'
    },
    {
        name: 'BK - Mass Transfer Process & Equipment (2025)',
        url: 'https://github.com/MashXP/BK/tree/master/BK_MassTransfer/quiz/'
    },
    {
        name: 'BK - Scientific Socialism - Finals (2025)',
        url: 'https://github.com/MashXP/BK/tree/master/BK_XHCN/quiz'
    }
];

let questions = [];
let userAnswers = [];
let currentQuestionIndex = 0;
let lastQuestionIndex = -1;
let score = 0;
let answerSelected = false;
