$(document).ready(function () {
  // Function to handle change-password logic
  var authData;
  function changepassword() {
    // Get values from the form
    var userId = $("#email").val();
    var oldpass = $("#oldpassword").val();
    var newpass = $("#newpassword").val();

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
          alert("Password changed successfully! Login with new password now.");

          //Remove the cookie auth token
          localStorage.removeItem("authData");
          localStorage.removeItem("shareduserData");
          // Redirect to the login page
          window.location.href = "auth-normal-sign-in.html";
        } else {
          // Display error message if login fails
          alert("Invalid Login ID or Password. Please try again.");
        }
      },
      error: function () {
        // Handle error case
        alert(
          "An error occurred while processing your request. Check your internet connection then refresh the page."
        );
      },
    });
  }

  // Attach click event to the login button
  $("#changepassButton").on("click", function () {
    changepassword();
  });
});
