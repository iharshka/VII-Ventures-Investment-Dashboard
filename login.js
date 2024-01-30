$(document).ready(function () {
  // Function to handle login logic
  function handleLogin() {
    // Get values from the form
    var userId = $("#email").val();
    var password = $("#password").val();

    // Create the sendData object
    var sendUserData = {
      userId: userId,
      password: password,
    };
    //Send Data to the Investor.js
    localStorage.setItem("shareduserData", JSON.stringify(sendUserData));

    // API endpoint for login
    var apiUrl =
      "https://investors-backend.viiventures.co/funds/login?format=json";

    // Prepare data to be sent in the payload
    var requestData = {
      user_id: userId,
      password: password,
    };

    // Make a POST request to the API
    $.ajax({
      url: apiUrl,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(requestData),
      success: function (data) {
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
          // link.download = "authToken.json";
          link.click();

          // Redirect to the index.html page
          window.location.href = "index.html";
        } else {
          // Display error message if login fails
          alert("Invalid Login ID or Password. Please try again.");
        }
      },
      error: function () {
        // Handle error case
        alert("Error occurred while processing your request.");
      },
    });
  }

  // Attach click event to the login button
  $("#loginButton").on("click", function () {
    handleLogin();
  });
});
