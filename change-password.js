$(document).ready(function () {
  // Function to handle change-password logic
  var authData;
  function changepassword() {
    // Get values from the form
    var userId = $("#email").val();
    var oldpass = $("#oldpassword").val();
    var newpass = $("#newpassword").val();

    // // Create the sendData object
    // var sendUserData = {
    //   user_id: userId,
    //   password: oldpass,
    //   new_password: newpass,
    // };
    // localStorage.setItem("shareduserData", JSON.stringify(sendUserData));

    // API endpoint for login
    var apiUrl =
      "https://investors-backend.viiventures.co/funds/change-password";

    // Prepare data to be sent in the payload
    var requestData = {
      user_id: userId,
      password: oldpass,
      new_password: newpass,
    };

    // Make a POST request to the API
    $.ajax({
      url: apiUrl,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(requestData),
      success: function (data) {
        // Check if the password change was successful
        if (data.success) {
          //   // Store the auth token in a JSON file
          //   var authToken = data.auth_token;
          //   authData = { Authorization: authToken };
          //   console.log(authData);
          alert("Password changed successfully! Login with new password now.");

          // Redirect to the login page
          window.location.href = "auth-normal-sign-in.html";

          //   //Send Data to the Investor.js
          //   localStorage.setItem("authData", JSON.stringify(authData));
          //   // console.log(authData);
        } else {
          // Display error message if login fails
          alert("Invalid Login ID or Password. Please try again.");
        }
      },
      error: function () {
        // Handle error case
        alert("An error occurred while processing your request.");
      },
    });
  }

  // Attach click event to the login button
  $("#changepassButton").on("click", function () {
    changepassword();
  });
});
