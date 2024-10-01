// To fetch Investor Name
var sharedauthtoken = localStorage.getItem("authData");
var Authorization;
// console.log(sharedauthtoken);
if (!sharedauthtoken) {
  Authorization = {
    Authorization: "",
  };
} else Authorization = JSON.parse(sharedauthtoken);
// console.log(Authorization);

//New Navbar mobile toggle
document.addEventListener("DOMContentLoaded", function() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
  });
});

//Code for DYNAMIC nav dropdown, limited Allowed page Access
document.addEventListener("DOMContentLoaded", async function () {
  $.ajax({
    url: "https://investors-backend.viiventures.co/funds/get-allowed-funds-users",
    method: "GET",
    headers: {
      Authorization: Authorization.Authorization,
    },
    success: function (result) {
      // console.log(result.body); //working fine
      var allowedfunds = result.body.allowed_funds;
      var allowedusers = result.body.allowed_users;

      allowedfunds.forEach(function (item, index) {
        var dropdownoption = document.querySelectorAll(
          ".fundopt" + `${index + 1}`
        );
        dropdownoption.forEach(function (addoption) {
          addoption.innerHTML = `<a style="text-decoration: none; color: #ffffff;"href="${item.link}">${item.name}</a>
        <ul class="dropdown-menu" style="right: 0; display: none; position: absolute;">
            <li>
                <a style="text-decoration: none; color: #ffffff;"
                    href="${item.link}#2023">2023</a>
            </li>
            <li>
                <a style="text-decoration: none; color: #ffffff;"
                    href="${item.link}#2022">2022</a>
            </li>
            <li>
                <a style="text-decoration: none; color: #ffffff;"
                    href="${item.link}#2021">2021</a>
            </li>
        </ul>`;
          // console.log(index);
        });
      });

      allowedusers.forEach(function (item, index) {
        var dropdownusers = document.querySelectorAll(
          ".useropt" + `${index + 1}`
        );
        dropdownusers.forEach(function (adduser) {
          adduser.innerHTML = `
          <a style="text-decoration: none; color: #ffffff;" href="index2.html#${item.user}">${item.username}</a>`;
        });
      });

      // Add hover event listeners to display side dropdowns on hover
      var fundDropdowns = document.querySelectorAll('.fundopt1, .fundopt2, .fundopt3');
      fundDropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('mouseenter', function () {
          this.querySelector('.dropdown-menu').style.display = 'block';
        });
        dropdown.addEventListener('mouseleave', function () {
          this.querySelector('.dropdown-menu').style.display = 'none';
        });
      });
    },
  });
});

//Code for the body Continued
var responseData;
var dataFromAPI;

document.addEventListener("DOMContentLoaded", async function () {
  $.ajax({
    url: "https://investors-backend.viiventures.co/funds/reports?format=json",
    type: "GET",
    contentType: "application/json",
    headers: {
      Authorization: Authorization.Authorization,
    },
    success: function (result) {
      // CallBack(result);
      // console.log(result);
      // responseData = result.json();
      // console.log(responseData);
      dataFromAPI = result.body;
      // console.log(result.body.overall_portfolio);

      if (result.status_code == 401)
        window.location.href = "auth-normal-sign-in.html";

      // Update the Username with the API call
      const usernameelement = document.getElementById("usernamerighttop");
      usernameelement.textContent = dataFromAPI.username;

      //Investor Report Password and PDF Links SCRIPT
      // Function to update HTML content with the received data
      // Update VII Ventures SPC
      updateFund(dataFromAPI["VII Ventures SPC"], "fundspc");

      // Update VII Ventures Fund 1 SP
      updateFund(dataFromAPI["Vii Ventures Fund 1 SP"], "fund1spc");

      // Update VII Ventures Fund 2 SP
      updateFund(dataFromAPI["Vii Ventures Fund 2 SP"], "fund2spc");

      // Function to update a specific fund's data in HTML
      function updateFund(fundData, elementClass) {
        // Update the password
        const passwordElement = document.querySelector(`.${elementClass} p`);
        passwordElement.innerHTML = `<span style="font-weight: bolder; font-size: 14px;">Password:</span><span style="font-size: 14px;"> </span><span style="font-size: 14px;">${fundData.password}</span>`;

        // Update the download links for 2021 and 2022
        const downloadLinks = document.querySelectorAll(
          `.${elementClass} .elementor-button-link`
        );
        downloadLinks[0].href = fundData["2021"];
        downloadLinks[1].href = fundData["2022"];
        downloadLinks[2].href = fundData["2023"];
      }
    },
  });
});

// async function fetchDataAndUpdateHTML() {
//   try {
//     // Make an API call to the provided endpoint
//     const response = await fetch(
//       "https://investors-backend.viiventures.co/funds/reports?format=json"
//     );
//     const apiData = await response.json();

//     // Update the HTML content with the received data
//     updateHTMLContent(apiData.body);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
