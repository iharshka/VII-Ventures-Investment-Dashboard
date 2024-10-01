var userdetails = localStorage.getItem("shareduserData");
var parseuserdetails = JSON.parse(userdetails);
// console.log(parseuserdetails.userId);
if (parseuserdetails == null) window.location.href = "auth-normal-sign-in.html";

//Code for DYNAMIC nav dropdown, limited Allowed page Access
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

      // Update the Username with the API call and Sending the username for other pages
      sharedusername = result.body.username;
      const usernameelement = document.getElementById("usernamerighttop");
      usernameelement.textContent = sharedusername;

      allowedfunds.forEach(function (item, index) {
        var dropdownoption = document.querySelectorAll(
          ".fundopt" + `${index + 1}`
        );
        dropdownoption.forEach(function (addoption) {
          addoption.innerHTML = `<a class="dropdown-toggle" style="text-decoration: none; color: #ffffff;" href="#">${item.name}</a>
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
          <a style="text-decoration: none; color: #ffffff;" href="index2.html?id=${item.user}">${item.username}</a>`;
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
document.addEventListener(
  "DOMContentLoaded",
  async function fetchinvestordata() {
    // Get the URLSearchParams object from the current URL
    const params = new URLSearchParams(window.location.search);

    // Get the value of the 'id' parameter
    const userId = params.get("id");
    console.log(userId);

    const response = await fetch(
      "https://investors-backend.viiventures.co/funds/investor-table?format=json" +
        "&userId=" +
        userId
    );
    const apiData = await response.json();

    // Update the User heading with the API call
    const investornameheadElement = document.getElementById("investornamehead");
    investornameheadElement.textContent = `${apiData.body.userheading}`;

    // Function to format numbers in American number system
    function formatAmericanNumber(number) {
      return number.toLocaleString("en-US");
    }

    //Code for Line Chart - 1 START (MOIC Chart)
    // var labels = ["", "2021", "2022", "2023", ""];
    // var data = [null, 1.47, 1.18, 1.04, null];
    const labels = [null, "2021", "2022", "2023", null];
    const investmentCostData = [null];

    Object.values(apiData.body.investor_portfolio).map((yearData) =>
      investmentCostData.push(yearData.invested_cost)
    );
    investmentCostData.push[null];

    const investmentValueData = [null];
    Object.values(apiData.body.investor_portfolio).map((yearData) =>
      investmentValueData.push(yearData.investment_value)
    );

    // Get the canvas element and create a 2D drawing context
    var ctx = document.getElementById("investorlinechart").getContext("2d");

    // Create the chart
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Investment Cost",
            borderColor: "#59D79E",
            backgroundColor: "#59D79E",
            data: investmentCostData,
            fill: false,
          },
          {
            label: "Investment Value",
            borderColor: "#2F455C",
            backgroundColor: "#2F455C",
            data: investmentValueData,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "category",
            labels: labels,
            grid: {
              // color: "white",
              display: false, // hide vertical grid lines
            },
            // ticks: {
            //   // Change x-axis label color
            //   color: "#DFDFDF",
            // },
          },
          y: {
            beginAtZero: true,
            suggestedMin: 0.5,
            stepSize: 0.5,
            grid: {
              color: "#dcdcdc9a",
              display: true, // keep horizontal grid lines
            },
            // ticks: {
            //   // Change x-axis label color
            //   color: "#DFDFDF",
            // },
          },
        },
        // plugins: {
        //   legend: {
        //     labels: {
        //       // Change legend text color
        //       color: "#DFDFDF",
        //     },
        //     // fillStyle: "#59D79E",
        //   },
        // },
      },
    });
    //Code for Line Chart - 1 ENDED (MOIC Chart)

    // Reference to the table body
    var tbody = document.querySelector("#myTable2 tbody");

    // Populate the table with API data
    apiData.body.user_data.forEach(function (item) {
      var row = document.createElement("tr");
      var fundscell = document.createElement("td");
      var sub2023cell = document.createElement("td");
      var sub2022cell = document.createElement("td");
      var sub2021cell = document.createElement("td");
      var percentagefundcell = document.createElement("td");
      var NAVcell = document.createElement("td");
      var profitcell = document.createElement("td");
      var graphlogocell = document.createElement("td");

      fundscell.textContent = item.fund_name;
      sub2021cell.textContent = formatAmericanNumber(item.subscription_2021);
      sub2022cell.textContent = formatAmericanNumber(item.subscription_2022);
      sub2023cell.textContent = formatAmericanNumber(item.subscription_2023);
      percentagefundcell.textContent = item.fund_ownership;
      NAVcell.textContent = formatAmericanNumber(item.nav);
      profitcell.textContent = formatAmericanNumber(item.pnl);
      graphlogocell.innerHTML = `<img src="${item.trend}"  style="width: 4.5em;"></img>`;

      row.appendChild(fundscell);
      row.appendChild(sub2023cell);
      row.appendChild(sub2022cell);
      row.appendChild(sub2021cell);
      row.appendChild(percentagefundcell);
      row.appendChild(NAVcell);
      row.appendChild(profitcell);
      row.appendChild(graphlogocell);

      tbody.appendChild(row);
    });

    //Code for DONUT Chart START
    // Function to draw the donut chart
    function drawChart() {
      var donutoptions = {
        colors: ["#205867", "#ACD6E0", "#59D79E"],
        backgroundColor: "#f6f7fb",
        pieHole: 0.5,
        legend: "top",
      };

      var donutdata = new google.visualization.DataTable();
      donutdata.addColumn("string", "Funds");
      donutdata.addColumn("number", "Percentage Invested");

      // Populate data based on the number of items in body.user_data
      apiData.body.user_data.forEach((fund) => {
        donutdata.addRow([fund.fund_name, fund.percent_fund_allocation]);
      });

      var donutchart = new google.visualization.PieChart(
        document.getElementById("donutChart")
      );
      donutchart.draw(donutdata, donutoptions);
    }

    // Update Donut Chart data
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
  }
);
//Code for DONUT Chart ENDED
// export var username;
