// Fetch data from the API
document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch(
    "https://investors-backend.viiventures.co/funds/investor-table?format=json&userId=1001"
  );
  const apiData = await response.json();

  // Function to format numbers in American number system
  function formatAmericanNumber(number) {
    return number.toLocaleString("en-US");
  }
  // Reference to the table body
  var tbody = document.querySelector("#myTable2 tbody");

  // Populate the table with API data
  apiData.body.user_data.forEach(function (item) {
    var row = document.createElement("tr");
    var fundscell = document.createElement("td");
    var sub2021cell = document.createElement("td");
    var sub2022cell = document.createElement("td");
    var NAVcell = document.createElement("td");
    var profitcell = document.createElement("td");
    var graphlogocell = document.createElement("td");

    fundscell.textContent = item.fund_name;
    sub2021cell.textContent = formatAmericanNumber(item.subscription_2021);
    sub2022cell.textContent = formatAmericanNumber(item.subscription_2022);
    NAVcell.textContent = formatAmericanNumber(item.nav);
    profitcell.textContent = formatAmericanNumber(item.pnl);
    graphlogocell.innerHTML = `<img src="${item.trend}" width = 70></img>`;

    row.appendChild(fundscell);
    row.appendChild(sub2021cell);
    row.appendChild(sub2022cell);
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

    var donutdata = google.visualization.arrayToDataTable([
      ["Funds", "Percentage Invested"],
      ["VII Ventures SPC", apiData.body.user_data[0].percent_fund_allocation],
      [
        "VII Ventures Fund 1 SP",
        apiData.body.user_data[1].percent_fund_allocation,
      ],
      [
        "VII Ventures Fund 2 SP",
        apiData.body.user_data[2].percent_fund_allocation,
      ],
    ]);

    var donutchart = new google.visualization.PieChart(
      document.getElementById("donutChart")
    );
    donutchart.draw(donutdata, donutoptions);
  }

  // Update Donut Chart data
  google.charts.load("current", { packages: ["corechart"] }); // Loads the "current" Google Visualisation API and calls "corechart" on that API
  google.charts.setOnLoadCallback(drawChart); //Callback function to execute drawChart function only when the google chart library is loaded
});
//Code for DONUT Chart ENDED
