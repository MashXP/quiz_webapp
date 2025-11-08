# Quiz Web Application

This is an interactive web-based quiz application that allows users to load and take quizzes defined in JSON files. It provides a user-friendly interface with features like drag-and-drop file loading, question and choice shuffling, real-time feedback, and detailed result summaries.

## Features

*   **Dynamic Quiz Loading:** Easily load quizzes by dragging and dropping a `.json` file onto the designated area.
*   **Configurable Quiz Experience:**
    *   **Shuffle Questions:** Option to randomize the order of questions.
    *   **Shuffle Choices:** Option to randomize the order of answer choices for each question.
*   **Interactive Quiz Interface:**
    *   Clear display of questions and multiple-choice options.
    *   Visual progress bar indicating current question and overall quiz progress.
    *   Immediate feedback on whether a selected answer is correct or incorrect.
*   **Comprehensive Results:**
    *   Displays final score and total questions.
    *   Provides detailed breakdown of each question, including the user's answer, the correct answer, and whether it was answered correctly.
    *   Allows navigation to specific questions from the progress bar in the results view.
*   **Quiz Management:**
    *   **Restart Quiz:** Option to retake the quiz.
    *   **Download Results:** Save quiz results as a JSON file for review or record-keeping.
*   **Keyboard Navigation:**
    *   Select answers using number keys (1-4) or letter keys (a, b, c, d).
    *   Advance to the next question or view results using the Enter or Space key.

## How to Use

1.  Open `index.html` in your web browser.
2.  Drag and drop a quiz `.json` file onto the designated area.
    *   You can use the provided `quiz_template.json` as a starting point or create your own.
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