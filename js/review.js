let questions =
    JSON.parse(
        sessionStorage.getItem(
            "questions"
        )
    ) || [];

let userAnswers =
    JSON.parse(
        sessionStorage.getItem(
            "userAnswers"
        )
    ) || [];

let currentQuestion = 0;
function createReviewNumbers() {

    const container =
        document.getElementById(
            "reviewNumbers"
        );

    container.innerHTML = "";

    questions.forEach((question, index) => {

        const div =
            document.createElement("div");

        div.className =
            "review-number";

        div.innerText =
            index + 1;

        if (
            userAnswers[index] ===
            question.correctAnswer
        ) {
            div.classList.add(
                "correct"
            );
        }
        else if (userAnswers[index]) {
    div.classList.add(
        "wrong"
    );
}

        div.onclick = function () {
            showReviewQuestion(index);
        };

        container.appendChild(div);
    });
}
function showReviewQuestion(index) {

    currentQuestion = index;

    const question =
        questions[index];

    document.getElementById(
        "reviewQuestionNo"
    ).innerText =
        index + 1;

    document.getElementById(
        "reviewQuestion"
    ).innerText =
        question.question;

    document.getElementById(
        "reviewImage"
    ).src =
        question.image;

    document
        .querySelectorAll(
            ".review-number"
        )
        .forEach(item => {
            item.classList.remove(
                "active"
            );
        });

    document
        .querySelectorAll(
            ".review-number"
        )
        [index]
        .classList.add(
            "active"
        );

    loadReviewOptions(question);
}
function loadReviewOptions(question) {

    const container =
        document.getElementById(
            "reviewOptions"
        );

    container.innerHTML = "";

    const options = [];

    if (question.optionA) {
        options.push({
            letter: "A",
            text: question.optionA
        });
    }

    if (question.optionB) {
        options.push({
            letter: "B",
            text: question.optionB
        });
    }

    if (question.optionC) {
        options.push({
            letter: "C",
            text: question.optionC
        });
    }

    if (question.optionD) {
        options.push({
            letter: "D",
            text: question.optionD
        });
    }

    options.forEach(option => {

        const div =
            document.createElement("div");

        div.className =
            "review-option";

       div.innerHTML =
`
<div style="
    display:flex;
    justify-content:space-between;
    align-items:center;
">
    <span>
        <b>${option.letter}.</b>
        ${option.text}
    </span>

    <span class="review-icon">
    </span>
</div>
`;

       if (
    option.letter ===
    question.correctAnswer
) {
    div.classList.add(
        "correct"
    );

    div.querySelector(
        ".review-icon"
    ).innerHTML = "✔";
}
        if (
    option.letter ===
    userAnswers[currentQuestion] &&
    option.letter !==
    question.correctAnswer
) {
    div.classList.add(
        "wrong"
    );

    div.querySelector(
        ".review-icon"
    ).innerHTML = "✖";
}

        container.appendChild(div);
    });
}
function nextReviewQuestion() {

    if (
        currentQuestion <
        questions.length - 1
    ) {
        showReviewQuestion(
            currentQuestion + 1
        );
    }
}

function previousReviewQuestion() {

    if (
        currentQuestion > 0
    ) {
        showReviewQuestion(
            currentQuestion - 1
        );
    }
}
createReviewNumbers();
showReviewQuestion(0);
