// Fetch data from the API
document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch(
    "https://virtserver.swaggerhub.com/MEHRATAVISH000/Investment_Dashboard/1.0.0/funds/investor-table/?userId=1001"
  );
  const apiData = await response.json();

  // Function for Formatting numbers in the Indian numbering system (lakh-crore system)
  function formatIndianNumber(number) {
    const formattedNumber = new Intl.NumberFormat("en-IN").format(number);
    return formattedNumber;
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
    sub2021cell.textContent = formatIndianNumber(item.subscription_2021);
    sub2022cell.textContent = formatIndianNumber(item.subscription_2022);
    NAVcell.textContent = formatIndianNumber(item.nav);
    profitcell.textContent = formatIndianNumber(item.pnl);
    // graphlogocell.textContent = item.graph;

    row.appendChild(fundscell);
    row.appendChild(sub2021cell);
    row.appendChild(sub2022cell);
    row.appendChild(NAVcell);
    row.appendChild(profitcell);
    row.appendChild(graphlogocell);

    tbody.appendChild(row);

    // Create an image element
    var img = document.createElement("img");

    // Set the source from the data array (assuming logo URLs are provided in the web_link key)
    img.src = item.web_link;

    // Set the size of the image
    img.width = 40; // Set the width in pixels

    // Append the image element to the last cell
    graphlogocell.appendChild(img);
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
