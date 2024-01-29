// import { username } from "./investor";
// Function to format numbers in American number system
function formatAmericanNumber(number) {
  return number.toLocaleString("en-US");
}
// //BARGRAPH START
document.addEventListener("DOMContentLoaded", async function () {
  // Fetch Overall Portfolio data from the API (for bar chart, moic chart and for cards as well)
  const response = await fetch(
    "https://investors-backend.viiventures.co/funds/overall-portfolio?format=json&fundName=VII%20Ventures%20SPC"
  );
  const responseData = await response.json();
  const dataFromAPI = responseData.body.overall_portfolio;

  // Update the Username with the API call
  const usernameelement = document.getElementById("username");
  usernameelement.textContent = localStorage.username;

  // Update the CARD value with the 2023: nav_end_of_year
  const navValueElement = document.getElementById("navValue");
  navValueElement.textContent = `$ ${formatAmericanNumber(
    dataFromAPI["2023"].nav_end_of_year
  )}`;

  // Update the MOIC CARD value with the 2023: MOIC
  const moicValueElement = document.getElementById("moicValue");
  moicValueElement.textContent = `${formatAmericanNumber(
    dataFromAPI["2023"].moic
  )}`;

  // Extract labels and data from the API response
  var ctx = document.getElementById("myBarChart").getContext("2d");

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...Object.keys(dataFromAPI)],
      datasets: [
        {
          label: "Total Capital Invested",
          data: [
            ...Object.values(dataFromAPI).map(
              (item) => item.total_capital_invested
            ),
          ],
          backgroundColor: "#59d79e",
          borderRadius: 10,
          barPercentage: 0.7,
          categoryPercentage: 0.2, // Adjust the spacing between bars
        },
        {
          label: "NAV end of the year",
          data: [
            ...Object.values(dataFromAPI).map((item) => item.nav_end_of_year),
          ],
          backgroundColor: "#ACD6E0",
          borderRadius: 10,
          barPercentage: 0.7, // Adjust the width of the bars
          categoryPercentage: 0.2, // Adjust the spacing between bars
        },
      ],
    },
    options: {
      responsive: true, // Set to false to use fixed size
      maintainAspectRatio: false, // Set to false to allow changing the aspect ratio
      scales: {
        x: {
          stacked: false, // Set to false for side-by-side bars
          grid: {
            // color: "#DFDFDF", // Set the color of the horizontal grid lines
            display: false,
            // drawBorder: false, // Hide the vertical grid lines
          },
          ticks: {
            // Change x-axis label color
            color: "#DFDFDF",
          },
        },
        y: {
          stacked: false,
          grid: {
            color: "#dcdcdc9a",
            display: true,
          },
          ticks: {
            // Change x-axis label color
            color: "#DFDFDF",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            // Change legend text color
            color: "#DFDFDF",
          },
        },
      },
    },
  });
  //BARGRAPH ENDED

  //Code for Line Chart - 1 START (MOIC Chart)

  // Extracting labels and data from the API response
  const labels = ["", ...Object.keys(dataFromAPI), ""];
  const data = [
    null,
    ...Object.values(dataFromAPI).map((item) => item.moic),
    null,
  ];
  // // Sample data
  // var labels = ["", "2021", "2022", "2023", ""];
  // var data = [null, 1.47, 1.18, 1.04, null];

  // Get the canvas element and create a 2D drawing context
  var ctx = document.getElementById("moicchart").getContext("2d");

  // Create the chart
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "MOIC",
          borderColor: "#59D79E",
          backgroundColor: "#59D79E",
          data: data,
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
          ticks: {
            // Change x-axis label color
            color: "#DFDFDF",
          },
        },
        y: {
          beginAtZero: true,
          suggestedMin: 0.5,
          stepSize: 0.5,
          grid: {
            color: "#dcdcdc9a",
            display: true, // keep horizontal grid lines
          },
          ticks: {
            // Change x-axis label color
            color: "#DFDFDF",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            // Change legend text color
            color: "#DFDFDF",
          },
          // fillStyle: "#59D79E",
        },
      },
    },
  });
});
//Code for Line Chart - 1 ENDED (MOIC Chart)

//Code for 2023, 2022, 2021 Tables START
document.addEventListener("DOMContentLoaded", async function () {
  // Fetch investment data from the API
  const response = await fetch(
    "https://investors-backend.viiventures.co/funds/company-level-portfolio?format=json&fundName=VII%20Ventures%20SPC"
  );
  const responseData = await response.json();
  const investmentData = responseData.body.company_level_portfolio;

  // Function to create a table row for the given investment item
  function createTableRow(item) {
    var row = document.createElement("tr");
    var logoCell = document.createElement("td");
    var companyCell = document.createElement("td");
    var amountCell = document.createElement("td");
    var valuationCell = document.createElement("td");
    var moicCell = document.createElement("td");
    var geoCell = document.createElement("td");
    var gaindeccell = document.createElement("td");

    // Populate cells with data
    logoCell.innerHTML = `<a href = "${item.web_link}"><img src="${item.logo}" width = 110></img></a>`;
    geoCell.innerHTML = `<img src="${item.geo}" width = 50></img>`;
    companyCell.textContent = item.name;
    amountCell.textContent = formatAmericanNumber(item.investment_cost);
    valuationCell.textContent = formatAmericanNumber(item.valuation_31_dec);
    moicCell.textContent = item.moic;
    gaindeccell.innerHTML = `<img src="${item.trend}" width = 70></img>`;

    // Append cells to the row
    row.appendChild(logoCell);
    row.appendChild(companyCell);
    row.appendChild(amountCell);
    row.appendChild(valuationCell);
    row.appendChild(moicCell);
    row.appendChild(geoCell);
    row.appendChild(gaindeccell);

    return row;
  }

  // Function to format numbers in American number system
  function formatAmericanNumber(number) {
    return number.toLocaleString("en-US");
  }

  // Populate tables for 2023, 2022, and 2021
  ["2023", "2022", "2021"].forEach(function (year) {
    // Reference to the table body
    var tbody = document.querySelector(`#myTable${year} tbody`);

    // Extract data for the specific year
    var dataForYear = investmentData[year];

    // Populate the table with data for the specific year
    dataForYear.forEach(function (item) {
      var row = createTableRow(item);
      tbody.appendChild(row);
    });
  });
});

//Code for 2023, 2022, 2021 Tables ENDED

//Code for Pie Charts- ALL COMBINED START
google.charts.load("current", { packages: ["corechart"] });

google.charts.setOnLoadCallback(async function () {
  const response = await fetch(
    "https://investors-backend.viiventures.co/funds/funds-geographies?format=json&fundName=VII%20Ventures%20SPC"
  );
  const apiData = await response.json();

  function drawPieChart(containerId, year) {
    const chartContainer = document.getElementById(containerId);

    const data = new google.visualization.DataTable();
    data.addColumn("string", "Geography");
    data.addColumn("number", "Percent Invested");

    const rows = apiData.body.geographies[year] || [];
    rows.forEach((row) => {
      data.addRow([row.geo, row.percent_invested]);
    });

    const view = new google.visualization.DataView(data);
    view.setColumns([
      0,
      1,
      {
        calc: function (dt, row) {
          return (
            // dt.getValue(row, 0) +
            "Percent Invested: " +
            dt.getValue(row, 1) +
            "%\nTotal Invested: " +
            formatAmericanNumber(
              apiData.body.geographies[year][row].total_invested
            )
          );
        },
        type: "string",
        role: "tooltip",
      },
    ]);

    const options = {
      legend: { position: "top", textStyle: { fontSize: 16 } },
      pieSliceText: "percentage",
      pieSliceTextStyle: { fontSize: 16, bold: true },
      colors: ["#205867", "#ACD6E0", "#59D79E"],
      backgroundColor: "#f6f7fb",
      tooltip: { isHtml: true },
    };

    const chart = new google.visualization.PieChart(chartContainer);
    chart.draw(view, options);
  }

  drawPieChart("geopie2023", "2023");
  drawPieChart("geopie2022", "2022");
  drawPieChart("geopie2021", "2021");
});

//Code for Pie Charts- ALL COMBINED ENDED

//Optional Component(removed ones and additional ones) FROM HERE

// Code for Pie Chart - 1 START (INDUSTRY)
//   var data1 = google.visualization.arrayToDataTable([
//     ["Language", "Speakers (in millions)"],
//     ["Financial Services", 20],
//     ["FinTech", 20],
//     ["Social Impact or Nonprofit", 20],
//     ["Logistics", 20],
//     ["MarTech", 20],
//   ]);

//   var options1 = {
//     legend: "top", // Change "none" to "top", "bottom", "left", "right", or combination
//     pieSliceText: "percentage",
//     // title: "Investment Geographies for 2022",
//     colors: ["#ACD6E0", "#205867", "#2F455C", "#59D79E", "#D8D8D8"],
//     backgroundColor: "#f6f7fb",
//     pieStartAngle: 100,
//   };

//   var chart1 = new google.visualization.PieChart(
//     document.getElementById("industrypie")
//   );
//   chart1.draw(data1, options1);
//Code for Pie Chart - 1 ENDED (INDUSTRY)

//Code for Pie Chart - 2 START (GEO)
// var data2 = google.visualization.arrayToDataTable([
//   ["Language", "Speakers (in millions)"],
//   ["Europe", 4.1],
//   ["USA", 95.9],
// ]);

// var options2 = {
//   legend: "top", // Change "none" to "top", "bottom", "left", "right", or combination
//   pieSliceText: "percentage",
//   // title: "Investment Geographies for 2022",
//   colors: ["#ACD6E0", "#205867"],
//   backgroundColor: "#f6f7fb",
//   pieStartAngle: 100,
// };

// var chart2 = new google.visualization.PieChart(
//   document.getElementById("geopie")
// );
// chart2.draw(data2, options2);
// //Code for Pie Chart - 2 ENDED (GEO)

//Code for Table - 1 STARTED
// google.charts.load("current", { packages: ["table"] });
// google.charts.setOnLoadCallback(drawTable);

// function drawTable() {
//   var data = new google.visualization.DataTable();
//   data.addColumn("string", "Date");
//   data.addColumn("string", "Company Name");
//   data.addColumn("number", "Amount Invested");
//   data.addColumn("number", "Cost per share");
//   data.addColumn("number", "Entry Valuation as on 31 Dec 22");
// data.addRows([
//   [
//     "29-Sep-21",
//     "Alcazar Alpha Fund I (CEIC Ltd)",
//     { v: 1000000, f: " 10,00,000" },
//     0.01,
//     { v: 1372250, f: " 13,72,250" },
//   ],
//   [
//     "29-Sep-21",
//     "Tribe Capital V, LLC- Series 2-A",
//     { v: 714000, f: " 7,14,000" },
//     0.01,
//     { v: 1757588, f: "17,57,588" },
//   ],
//   [
//     "13-Dec-21",
//     "Summer Pipe LLC",
//     { v: 12500, f: "15,00,000" },
//     0.01,
//     { v: 1500000, f: " 15,00,000" },
//   ],
//   [
//     "02-Feb-22",
//     "HOF Capital Growth Opportunity XXI, LLC",
//     { v: 1000000, f: " 10,00,000" },
//     0.01,
//     { v: 684877, f: " 6,84,877" },
//   ],
//   [
//     "16-Mar-22",
//     "Project SAM Productions LLC- Equity investment (initial purchase USD 250K+ second purchase USD 250k)",
//     { v: 500000, f: " 5,00,000" },
//     0.01,
//     { v: 500000, f: "5,00,000" },
//   ],
//   [
//     "14-Apr-22",
//     "Koinz Holding B.V. - Inv. Cost",
//     { v: 250000, f: "2,50,000" },
//     0.01,
//     { v: 250000, f: "2,50,000" },
//   ],
// ]);

//   var table = new google.visualization.Table(
//     document.getElementById("table_div")
//   );

//   table.draw(data, { showRowNumber: true, width: "100%", height: "100%" });
// }
//Code for Table - 1 ENDED

// //Code for Line Chart - 2 START
// document.addEventListener("DOMContentLoaded", function () {
//   // Sample data
//   var labels = [
//     "Zipline",
//     "NextRoll",
//     "Orbital Insights",
//     "Emerald Cloud Lab (ECL)",
//     "Kraken",
//     "Pipe",
//     "Plaid",
//     "Project SAM Productions LLC",
//   ];
//   var data1 = [
//     150015, 150000, 200000, 1000000, 714000, 1500000, 1000000, 500000,
//   ];
//   var data2 = [
//     142917, 150000, 212884, 1000000, 3477446, 1500000, 684877, 500000,
//   ];

//   // Get the canvas element and create a 2D drawing context
//   var ctx = document.getElementById("linechart1").getContext("2d");

//   // Create the chart
//   var myChart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: "Investment Cost",
//           borderColor: "#59d79e",
//           data: data1,
//           fill: false,
//         },
//         {
//           label: "Valuation as of 31 Dec, 2021",
//           borderColor: "#2F455C",
//           data: data2,
//           fill: false,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         x: {
//           type: "category",
//           labels: labels,
//           grid: { display: false },
//         },
//         y: {
//           beginAtZero: true,
//           grid: { display: true },
//         },
//       },
//     },
//   });
// });
// //Code for Line Chart - 2 ENDED

// //Code for Line Chart - 3 START
// document.addEventListener("DOMContentLoaded", function () {
//   // Sample data
//   var labels = [
//     "Emerald Cloud Lab (ECL)",
//     "Kraken",
//     "Pipe",
//     "Plaid",
//     "Project SAM Productions LLC-Equity Investment (initial purchase USD 250k +second purchase USD 250k",
//     "Koinz Holding B.V.-Inv. Cost",
//     "Project SAM Productions LLC - Loan in 2021",
//     "Project SAM Productions LLC - Loan in Q1,2022",
//     "Project SAM Productions LLC - Loan in Q2,2022",
//   ];
//   var data1 = [
//     1000000, 714000, 1500000, 1000000, 500000, 250000, 350000, 400000, 250000,
//   ];
//   var data2 = [
//     1372250, 1757588, 1500000, 684877, 500000, 250000, 350000, 400000, 250000,
//   ];

//   // Get the canvas element and create a 2D drawing context
//   var ctx = document.getElementById("linechart2").getContext("2d");

//   // Create the chart
//   var myChart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: "Investment Cost",
//           borderColor: "#59d79e",
//           data: data1,
//           fill: false,
//         },
//         {
//           label: "Valuation as of 31 Dec, 2022",
//           borderColor: "#2F455C",
//           data: data2,
//           fill: false,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         x: {
//           type: "category",
//           labels: labels,
//           grid: {
//             display: false, // hide vertical grid lines
//           },
//         },
//         y: {
//           beginAtZero: true,
//           grid: {
//             display: true, // keep horizontal grid lines
//           },
//         },
//       },
//       plugins: {
//         legend: {
//           display: true,
//         },
//         tooltip: {
//           enabled: true,
//         },
//       },
//       layout: {
//         padding: {
//           left: 10,
//           right: 10,
//           top: 10,
//           bottom: 10,
//         },
//       },
//       plugins: {
//         legend: {
//           display: true,
//         },
//         tooltip: {
//           enabled: true,
//         },
//         xaxis: {
//           maxTicksLimit: 10, // Adjust the maximum number of ticks on the x-axis
//           maxRotation: 45, // Adjust the maximum rotation angle of the x-axis labels
//         },
//       },
//     },
//   });
// });
// //Code for Line Chart - 3 ENDED

// // Code for Bar Graph - 1
// (function () {
//   google.charts.load("current", { packages: ["corechart", "bar"] });
//   google.charts.setOnLoadCallback(drawStuff);

//   function drawStuff() {
//     var chartDiv = document.getElementById("bargraph");
//     var data = google.visualization.arrayToDataTable([
//       ["", "Total Capital Invested", "NAV end of the year"],
//       ["2021", 5214015, 7668124], // RGB value
//       ["2022", 5964000, 7064715], // English color name
//       ["2023", 5964000, 6189715],
//     ]);

//     var materialOptions = {
//       width: 900,
//       chart: {
//         title: "Total Invested Capital vs. NAV end of December for 2021 & 2022",
//         //   //   subtitle:
//         //   //     "VII Ventures Fund SPC [Total Invested Capital vs. NAV end of December for 2021 & 2022]",
//         titleTextStyle: {
//           color: "#666", // Change the color of the chart title
//         },
//       },
//       colors: ["#2F455C", "#59d79e"],
//       bar: { groupWidth: "90%" },
//       legend: { position: "top" },
//       vAxis: {
//         format: "0", // Display axis numbers without abbreviation
//         textStyle: { color: "#666" }, // Adjust brightness by changing color
//       },
//       hAxis: {
//         textStyle: { color: "#666" }, // Adjust brightness by changing color
//       },
//     };
//     function drawMaterialChart() {
//       var materialChart = new google.charts.Bar(chartDiv);
//       materialChart.draw(
//         data,
//         google.charts.Bar.convertOptions(materialOptions)
//       );
//     }

//     function drawClassicChart() {
//       var classicChart = new google.visualization.ColumnChart(chartDiv);
//       classicChart.draw(data, classicOptions);
//     }

//     drawMaterialChart();
//   }
// })();
//Code for Bar Chart - 1 ENDED
