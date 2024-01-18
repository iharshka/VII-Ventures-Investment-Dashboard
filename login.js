document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginButton").addEventListener("click", function () {
    // Get form data
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Validate user_id (assuming email is the user_id and needs to be converted to an integer)
    var userId = parseInt(email);

    // Check if the conversion is successful
    if (isNaN(userId)) {
      alert("Invalid User ID. Please enter a valid email address.");
      return;
    }

    // Create the URL with parameters
    var apiUrl =
      "https://35.154.225.94/funds/login?format=json" +
      "&user_id=" +
      userId +
      "&password=" +
      encodeURIComponent(password);

    // Make a GET request to the API endpoint
    fetch(apiUrl, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response
        console.log(data);

        // Check if login was successful (you may need to adjust based on API response structure)
        if (data.success) {
          // Redirect to index.html
          window.location.href = "index.html";
        } else {
          // Handle unsuccessful login (show error message, etc.)
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
