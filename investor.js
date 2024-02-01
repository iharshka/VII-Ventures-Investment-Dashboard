// Fetch data from the API ("https://investors-backend.viiventures.co/funds/investor-table?format=json&userId=1005")
var userdetails = localStorage.getItem("shareduserData");
var parseuserdetails = JSON.parse(userdetails);
console.log(parseuserdetails.userId);
document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch(
    "https://investors-backend.viiventures.co/funds/investor-table?format=json" +
      "&userId=" +
      parseuserdetails.userId
  );
  const apiData = await response.json();

  // Update the Username with the API call and Sending the username for other pages
  localStorage.setItem("sharedapiData", JSON.stringify(apiData));
  sharedusername = apiData.body.username;
  const usernameelement = document.getElementById("usernamerighttop");
  usernameelement.textContent = sharedusername;

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
    graphlogocell.innerHTML = `<img src="${item.trend}" width = 70></img>`;

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
      legend: "left",
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
});
//Code for DONUT Chart ENDED
// export var username;
