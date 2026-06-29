if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

function selectCategory(category) {

    sessionStorage.setItem(
        "selectedCategory",
        category
    );

    window.location.href =
        "exam.html";
}

function goBack() {
    window.location.href = "main.html";
}
