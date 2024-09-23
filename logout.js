$(document).ready(function () {
  $("#logoutbutton").on("click", function () {
    localStorage.removeItem("authData");
    localStorage.removeItem("shareduserData");
  });
});

// Did this via change-password.js not after the button is clicked but once password gets changes successfully
// $(document).ready(function () {
//   $("#changepass").on("click", function () {
//     localStorage.removeItem("authData");
//     localStorage.removeItem("shareduserData");
//   });
// });
