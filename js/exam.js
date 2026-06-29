let questions = [];
let currentQuestion = 0;
let userAnswers = [];

console.log("MODE:", sessionStorage.getItem("mode"));
console.log("CATEGORY:", sessionStorage.getItem("selectedCategory"));

const mode =
    sessionStorage.getItem("mode");

const category =
    sessionStorage.getItem("selectedCategory");

console.log("MODE:", mode);
console.log("CATEGORY:", category);

if (mode === "exam") {

    if (category === "a") {
        loadQuestions("data/category_a.json");
    }

    if (category === "b") {
        loadQuestions("data/category_b.json");
    }

    if (category === "c") {
        loadQuestions("data/category_c.json");
    }
}

if (mode === "practice") {
    loadAllQuestions();
}

function loadQuestions(file) {
    
    console.log("Loading file:", file);

    fetch(file)
        .then(response => response.json())
        .then(data => {

            questions = data;

            createQuestionNumbers();
            showQuestion(0);
        })
    .catch(error => {
    console.log(error);
});
}

async function loadAllQuestions() {

    const a =
        await fetch("data/category_a.json")
            .then(r => r.json());

    const b =
        await fetch("data/category_b.json")
            .then(r => r.json());

    const c =
        await fetch("data/category_c.json")
            .then(r => r.json());

    questions = [
        ...a,
        ...b,
        ...c
    ];

    createQuestionNumbers();
    showQuestion(0);
}

function createQuestionNumbers() {

    const container =
        document.getElementById(
            "questionNumbers"
        );

    container.innerHTML = "";

    questions.forEach((q, index) => {

        const div =
            document.createElement("div");

        div.className =
            "question-box-item";

        div.innerText =
            index + 1;

        div.onclick = function () {
            showQuestion(index);
        };

        container.appendChild(div);
    });
}

function showQuestion(index) {

    currentQuestion = index;

    const q = questions[index];

    document.getElementById(
        "questionNo"
    ).innerText =
        index + 1;

    document.getElementById(
        "questionText"
    ).innerText =
        q.question;

    document.getElementById(
        "questionImage"
    ).src =
        q.image;

    document
    .querySelectorAll(".question-box-item")
    .forEach(box => {
        box.classList.remove("active");
    });

document
    .querySelectorAll(".question-box-item")
    [index]
    .classList
    .add("active");

document
    .querySelectorAll(".question-box-item")
    [index]
    .scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
    });

loadOptions(q);
}

function loadOptions(question) {

    const container =
        document.getElementById(
            "answersContainer"
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

        const row =
            document.createElement("div");

        row.className =
            "answer-row";

        row.innerHTML = `
    <div class="answer-letter">
        ${option.letter}
    </div>

    <div class="answer-text">
        ${option.text}
    </div>

    <div class="answer-checkbox">
        ✕
    </div>
`;
        row.onclick = function () {

    userAnswers[currentQuestion] =
        option.letter;

    loadOptions(question);
};
        if (
    userAnswers[currentQuestion] ===
    option.letter
) {
    row.classList.add("selected");
}

        container.appendChild(row);
    });
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

function finishExam() {

    let correct = 0;

    questions.forEach((question, index) => {

        if (
            userAnswers[index] ===
            question.correctAnswer
        ) {
            correct++;
        }
    });

    const wrong =
        questions.length - correct;

    sessionStorage.setItem(
        "correctAnswers",
        correct
    );

    sessionStorage.setItem(
        "wrongAnswers",
        wrong
    );

    sessionStorage.setItem(
        "userAnswers",
        JSON.stringify(userAnswers)
    );

    sessionStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );

    window.location.href =
        "result.html";
}
