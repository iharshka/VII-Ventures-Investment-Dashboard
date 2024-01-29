$(document).ready(function () {
  // Function to handle login logic
  function handleLogin() {
    // Get values from the form
    var userId = $("#email").val();
    var password = $("#password").val();

    // API endpoint for login
    var apiUrl =
      "https://investors-backend.viiventures.co/funds/login?format=json" +
      "&user_id=" +
      userId +
      "&password=" +
      encodeURIComponent(password);

    // Make a POST request to the API
    $.post(apiUrl, function (data) {
      // Check if the login was successful
      if (data.success) {
        // Store the auth token in a JSON file
        var authToken = data.authToken;
        var authData = { authToken: authToken };

        // Convert the data to JSON string
        var jsonData = JSON.stringify(authData);

        // Create a Blob and download the JSON file
        var blob = new Blob([jsonData], { type: "application/json" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "authToken.json";
        link.click();

        // Redirect to the index.html page
        window.location.href = "index.html";
      } else {
        // Display error message if login fails
        alert("Invalid credentials. Please try again.");
      }
    });
  }

  // Attach click event to the login button
  $("#loginButton").on("click", function () {
    handleLogin();
  });
});
