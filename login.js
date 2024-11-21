// Basic form validation
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Basic validation
    if (username === "" || password === "") {
        alert("Please fill in all fields.");
    } else {
        // In a real scenario, this is where you would send the login request to the server
        alert(`Welcome, ${username}!`);
        // Redirect to another page if necessary
        // window.location.href = "dashboard.html";
    }
});
