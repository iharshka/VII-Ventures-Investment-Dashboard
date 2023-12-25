//Code for Pie Chart - 1 START

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Language", "Speakers (in millions)"],
    ["VII Ventures SPC", 44.7],
    ["VII Ventures Fund 1 SP", 44.6],
    ["VII Ventures Fund 2 SP", 10.7],
  ]);

  var options = {
    legend: { position: "top" }, // Change "none" to "top", "bottom", "left", "right", or combination
    pieSliceText: "label",
    pieSliceTextStyle: {
      color: "white", // Set the color of the text
      fontSize: 12, // Set the font size
    },
    colors: ["#59d79e", "#2F455C", "#acd6e0"],
    pieStartAngle: 100,
    pieSliceText: "percentage",
    // tooltip: {
    //   trigger: "none", // Disable tooltip on hover
    // },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}
//Code for Pie Chart - 1 ENDED
