//DONUT chart START
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var donutdata = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["VII Ventures Fund 2 SP", 19],
    ["VII Ventures SPC", 39.5],
    ["VII Ventures Fund 1 SP", 41.5],
  ]);

  var donutoptions = {
    // title: "Investment Geographies for 2022",
    // pieSliceText: "label",
    colors: ["#205867", "#ACD6E0", "#59D79E"],
    backgroundColor: "#f6f7fb",
    pieHole: 0.5,
    legend: "left",
  };

  var donutchart = new google.visualization.PieChart(
    document.getElementById("donutChart")
  );
  donutchart.draw(donutdata, donutoptions);
}
//DONUT Chart ENDED

// TABLE - 2 START
document.addEventListener("DOMContentLoaded", function () {
  function formatIndianNumber(number) {
    // Format numbers in the Indian numbering system (lakh-crore system)
    const formattedNumber = new Intl.NumberFormat("en-IN").format(number);
    return formattedNumber;
  }
  var data = [
    {
      funds: "VII Ventures SPC",
      sub2021: 5589015,
      sub2022: 5589015,
      NAV: 7064715,
      profit: -1347608,
      graph: "downtrend.png",
    },
    {
      funds: "VII Ventures SPC Fund 1",
      sub2021: 5589015,
      sub2022: 5589015,
      NAV: 7064715,
      profit: -1347608,
      graph: "uptrend.png",
    },
    {
      funds: "VII Ventures SPC Fund 1",
      sub2021: 5589015,
      sub2022: 5589015,
      NAV: 7064715,
      profit: -1347608,
      graph: "downtrend.png",
    },
  ];

  // Reference to the table body
  var tbody = document.querySelector("#myTable2 tbody");
  // Populate the table with data
  data.forEach(function (item) {
    var row = document.createElement("tr");
    var fundscell = document.createElement("td");
    var sub2021cell = document.createElement("td");
    var sub2022cell = document.createElement("td");
    var NAVcell = document.createElement("td");
    var profitcell = document.createElement("td");
    var graphlogocell = document.createElement("td");

    fundscell.textContent = item.funds;
    sub2021cell.textContent = formatIndianNumber(item.sub2021);
    sub2022cell.textContent = formatIndianNumber(item.sub2022);
    NAVcell.textContent = formatIndianNumber(item.NAV);
    profitcell.textContent = formatIndianNumber(item.profit);
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

    // Set the source from the data array
    img.src = item.graph; // Use the image URL from the data array

    // Set the size of the image
    img.width = 40; // Set the width in pixels
    // img.height = 50; // Set the height in pixels

    // // Set any additional attributes if needed
    // img.alt = "Logo";

    // Append the image element to the last cell
    graphlogocell.appendChild(img);
  });
});
// TABLE - 2 ENDED
