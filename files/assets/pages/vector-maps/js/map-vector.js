(async function (maps) {
  var initializeWorldMap = async function (mapId) {
    var $worldMap = maps("#" + mapId);

    var mapObjects = []; // Array to store map objects

    // Fetch investment data from the API
    var apiResponse = await fetch(
      "https://virtserver.swaggerhub.com/MEHRATAVISH000/Investment_Dashboard/1.0.0/funds/funds-geographies/?fundName=VII%2520Ventures%2520SPC"
    );
    var apiData = await apiResponse.json();

    $worldMap.vectorMap({
      map: "world_mill_en",
      scaleColors: ["#59D79E", "#1B8BF9"],
      normalizeFunction: "polynomial",
      hoverOpacity: 0.7,
      hoverColor: false,
      regionStyle: {
        initial: {
          fill: "#59D79E",
        },
        selected: {
          fill: "#205867", // Blue color for the selected region
        },
      },
      markerStyle: {
        initial: {
          r: 9,
          fill: "#2F455C",
          "fill-opacity": 0.9,
          stroke: "#fff",
          "stroke-width": 7,
          "stroke-opacity": 0.4,
        },
        hover: {
          stroke: "#fff",
          "fill-opacity": 1,
          "stroke-width": 1.5,
        },
      },
      backgroundColor: "transparent",
      onRegionClick: function (event, code) {
        // Update selected region for the specific map
        mapObjects[mapId].setSelectedRegions([code]);

        // Check if the API data for the selected year and region exists
        if (
          apiData &&
          apiData.body.geographies[mapId] &&
          apiData.body.geographies[mapId][0]
        ) {
          var selectedRegionData = apiData.body.geographies[mapId].find(
            function (item) {
              return item.vector === code || item.geo === code;
            }
          );

          // Update the fill color based on the percentage invested in the region
          if (selectedRegionData) {
            var percentInvested = selectedRegionData.percent_invested;
            var fillColor = getFillColor(percentInvested);
            mapObjects[mapId].setRegionStyle(code, { fill: fillColor });
          }
        }
      },
    });

    mapObjects[mapId] = $worldMap.vectorMap("get", "mapObject"); // Store the map object in the array

    // Manually select the USA region on initialization
    mapObjects[mapId].setSelectedRegions(["US"]);
    mapObjects[mapId].setSelectedRegions(["FR"]);
    mapObjects[mapId].setSelectedRegions(["NO"]);
  };

  // Function to get the fill color based on the percentage invested
  function getFillColor(percentInvested) {
    // Implement your logic to determine fill color based on percentage
    // For example, you can use a gradient or a set of predefined colors
    // In this example, I'll use a gradient between two colors
    var color1 = "#59D79E"; // Lower limit color
    var color2 = "#1B8BF9"; // Upper limit color
    var fillColor = interpolateColors(color1, color2, percentInvested / 100);
    return fillColor;
  }

  // Function to interpolate colors based on a percentage
  function interpolateColors(color1, color2, percent) {
    var r = Math.round(
      parseInt(color1.substring(1, 3), 16) * (1 - percent) +
        parseInt(color2.substring(1, 3), 16) * percent
    );
    var g = Math.round(
      parseInt(color1.substring(3, 5), 16) * (1 - percent) +
        parseInt(color2.substring(3, 5), 16) * percent
    );
    var b = Math.round(
      parseInt(color1.substring(5, 7), 16) * (1 - percent) +
        parseInt(color2.substring(5, 7), 16) * percent
    );
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
  }

  // Initialize maps for different years
  await initializeWorldMap("world-map-markers-2021");
  await initializeWorldMap("world-map-markers-2022");
  await initializeWorldMap("world-map-markers-2023");
})(window.jQuery);

// (function (maps) {
//   "use strict";

//   var initializeWorldMap = function (mapId) {
//     var $worldMap = maps("#" + mapId);

//     var mapObjects = []; // Array to store map objects

//     $worldMap.vectorMap({
//       map: "world_mill_en",
//       scaleColors: ["#59D79E", "#1B8BF9"],
//       normalizeFunction: "polynomial",
//       hoverOpacity: 0.7,
//       hoverColor: false,
//       regionStyle: {
//         initial: {
//           fill: "#59D79E",
//         },
//         selected: {
//           fill: "#205867", // Blue color for the selected region
//         },
//       },
//       markerStyle: {
//         initial: {
//           r: 9,
//           fill: "#2F455C",
//           "fill-opacity": 0.9,
//           stroke: "#fff",
//           "stroke-width": 7,
//           "stroke-opacity": 0.4,
//         },
//         hover: {
//           stroke: "#fff",
//           "fill-opacity": 1,
//           "stroke-width": 1.5,
//         },
//       },
//       backgroundColor: "transparent",
//       onRegionClick: function (event, code) {
//         var map = mapObjects[mapId];
//         var selectedRegions = map.getSelectedRegions() || [];
//         var index = selectedRegions.indexOf(code);

//         if (index !== -1) {
//           selectedRegions.splice(index, 1); // Deselect if already selected
//         } else {
//           selectedRegions.push(code); // Select if not already selected
//         }

//         map.setSelectedRegions(selectedRegions);
//       },
//     });

//     mapObjects[mapId] = $worldMap.vectorMap("get", "mapObject"); // Store the map object in the array
//   };

//   initializeWorldMap("world-map-markers-2021");
//   initializeWorldMap("world-map-markers-2022");
//   initializeWorldMap("world-map-markers-2023");
// })(window.jQuery);
