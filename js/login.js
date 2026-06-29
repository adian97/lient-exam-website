async function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const response =
        await fetch("data/login.json");

    const data =
        await response.json();

    if (
        username === data.username &&
        password === data.password
    ) {
        sessionStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location.href =
            "main.html";
    }
    else {
        alert("Wrong username or password.");
    }
}
