const correct =
    Number(
        sessionStorage.getItem(
            "correctAnswers"
        )
    ) || 0;

const wrong =
    Number(
        sessionStorage.getItem(
            "wrongAnswers"
        )
    ) || 0;

const userAnswers =
    JSON.parse(
        sessionStorage.getItem(
            "userAnswers"
        )
    ) || [];

const unanswered =
    userAnswers.filter(
        answer => !answer
    ).length;

const total =
    correct + wrong + unanswered;

const score =
    total > 0
        ? Math.round(
            (correct / total) * 100
        )
        : 0;


/* RESULT NUMBERS */

document.getElementById(
    "correctText"
).innerText = correct;

document.getElementById(
    "wrongText"
).innerText = wrong;

document.getElementById(
    "correctBox"
).innerText = correct;

document.getElementById(
    "wrongBox"
).innerText = wrong;

document.getElementById(
    "unansweredBox"
).innerText = unanswered;

document.getElementById(
    "accuracyBox"
).innerText = score + "%";

document.getElementById(
    "scoreText"
).innerText =
    score + "%";


/* PASS OR FAIL */

if (correct >= 27) {

    document.getElementById(
        "resultStatus"
    ).innerText = "PASSED";

    document.getElementById(
        "resultStatus"
    ).style.color = "#17c653";

    document.getElementById(
        "resultMessage"
    ).innerText =
        "Congratulations! You have passed the exam.";
}
else {

    document.getElementById(
        "resultStatus"
    ).innerText = "FAILED";

    document.getElementById(
        "resultStatus"
    ).style.color = "#ff4d4f";

    document.getElementById(
        "resultMessage"
    ).innerText =
        "Keep practicing and try again.";
}

function reviewAnswers() {
    window.location.href =
        "review.html";
}

function tryAgain() {
    window.location.href =
        "exam.html";
}

function goHome() {
    window.location.href =
        "main.html";
}
/* SAVE STATISTICS */

let examsTaken =
    Number(
        localStorage.getItem(
            "examsTaken"
        )
    ) || 0;

let totalScore =
    Number(
        localStorage.getItem(
            "totalScore"
        )
    ) || 0;

let bestScore =
    Number(
        localStorage.getItem(
            "bestScore"
        )
    ) || 0;

examsTaken++;

totalScore =
    totalScore + score;

if (score > bestScore) {
    bestScore = score;
}

localStorage.setItem(
    "examsTaken",
    examsTaken
);

localStorage.setItem(
    "totalScore",
    totalScore
);

localStorage.setItem(
    "bestScore",
    bestScore
);
