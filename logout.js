$(document).ready(function () {
  $("#logoutbutton").on("click", function () {
    // var logoutApiUrl = "https://investors-backend.viiventures.co/funds/logout";

    // $.ajax({
    //   url: logoutApiUrl,
    //   type: "POST",
    // });
    localStorage.removeItem("authData");
    localStorage.removeItem("shareduserData");
  });
});
