# Quiz Web Application

This is an interactive web-based quiz application that allows users to load and take quizzes defined in JSON files. It provides a user-friendly interface with features like loading from GitHub, question and choice shuffling, real-time feedback, and detailed result summaries.

## Features

*   **Multiple Loading Options:**
    *   **Load from GitHub:** Load quizzes directly from a GitHub repository URL. The app will list all available `.json` files from the specified directory.
    *   **Recommended Quizzes:** A curated list of quizzes is available on the main screen for quick access.
    *   **Paste JSON:** Paste raw JSON quiz data directly into the input field.
    *   **File Upload:** Use the traditional drag-and-drop or file upload button to load a local `.json` file.
*   **Mobile-Friendly & Responsive Design**: The application adapts seamlessly to various screen sizes, providing an optimal experience on both desktop and mobile devices.
*   **Two Quiz Modes:**
    1.  **Immediate Feedback:** The default mode. Get instant feedback on whether your answer is correct or incorrect as soon as you select it.
    2.  **Delayed Feedback Mode:** A more traditional test-taking experience. Answer all questions first and then click "Submit All" to see your results.
*   **Configurable Quiz Experience:**
    *   **Shuffle Questions:** Option to randomize the order of questions.
    *   **Shuffle Choices:** Option to randomize the order of answer choices for each question.
*   **Interactive Quiz Interface:**
    *   Clear display of questions and multiple-choice options.
    *   **Full Navigation:** A vertical progress bar allows you to jump to any question at any time during the quiz. It also indicates answered and flagged questions. On mobile, the progress bar is at the bottom and can be hidden/shown with an animated arrow button.
    *   **Question Flagging:** Mark questions for later review with a flag button.
*   **Comprehensive Results:**
    *   Displays final score and total questions.
    *   Provides detailed breakdown of each question, including the user's answer, the correct answer, and whether it was answered correctly.
    *   Allows navigation to specific questions from the progress bar in the results view.
*   **Quiz Management:**
    *   **Restart Quiz:** Option to retake the quiz.
    *   **Download Results:** Save quiz results as a JSON file for review or record-keeping.
*   **Keyboard Navigation:**
    *   Select answers using number keys (1-9) or letter keys (a-i).
    *   Advance to the next question or view results using the Enter or Space key.

## How to Use

1.  Open `index.html` in your web browser or visit the [live site](https://mashxp.github.io/quiz_webapp/).
2.  Choose one of the following methods to load a quiz:
    *   **GitHub URL:** Paste a URL to a GitHub directory containing quiz files (e.g., `https://github.com/owner/repo/tree/branch/path/to/quizzes`). Click "Load" and select a quiz from the generated list.
    *   **Recommended Quiz:** Click one of the buttons for the recommended quizzes.
    *   **Paste JSON:** Paste the contents of a quiz JSON directly into the text area and click "Load".
    *   **File Upload:** Drag and drop a `.json` file onto the page or use the "Click to Upload" button.
3.  (Optional) Select whether to shuffle questions and/or choices before starting.
4.  Answer the questions and navigate through the quiz.
5.  Review your results upon completion.

## Quiz JSON Format

The quiz expects a JSON file structured as an array of question objects. Each question object should have the following properties:

*   `question`: (string) The text of the question.
*   `answer`: (string) The correct answer choice.
*   `options`: (array of strings) An array containing all possible answer choices, including the correct one.

**Example (`quiz_template.json`):**

```json
[
    {
        "question": "What is the capital of France?",
        "answer": "Paris",
        "options": ["London", "Berlin", "Paris", "Madrid"]
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "answer": "Mars",
        "options": ["Earth", "Mars", "Jupiter", "Venus"]
    }
]
```

## Development

This application is built using standard web technologies:

*   HTML5
*   CSS3
*   JavaScript (ES6+)

To run locally, simply open `index.html` in any modern web browser. Or... Just use the link: https://mashxp.github.io/quiz_webapp/
