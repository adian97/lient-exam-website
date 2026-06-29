if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

function goExam() {

    sessionStorage.setItem(
        "mode",
        "exam"
    );

    window.location.href =
        "category.html";
}

function goPractice() {

    sessionStorage.setItem(
        "mode",
        "practice"
    );

    window.location.href =
        "exam.html";
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
/* LOAD STATISTICS */

const examsTaken =
    Number(
        localStorage.getItem(
            "examsTaken"
        )
    ) || 0;

const totalScore =
    Number(
        localStorage.getItem(
            "totalScore"
        )
    ) || 0;

const bestScore =
    Number(
        localStorage.getItem(
            "bestScore"
        )
    ) || 0;

const averageScore =
    examsTaken > 0
        ? Math.round(
            totalScore /
            examsTaken
        )
        : 0;

document.getElementById(
    "examsTaken"
).innerText =
    examsTaken;

document.getElementById(
    "averageScore"
).innerText =
    averageScore + "%";

document.getElementById(
    "bestScore"
).innerText =
    bestScore;
