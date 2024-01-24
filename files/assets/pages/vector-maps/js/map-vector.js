(async function (maps) {
  var initializeWorldMap = async function (mapId, year) {
    var mapObjects = {};
    var $worldMap = maps("#" + mapId);

    // Fetch investment data from the API
    var apiResponse = await fetch(
      "https://investors-backend.viiventures.co/funds/funds-geographies?format=json&fundName=VII%20Ventures%20SPC"
    );
    var apiData = await apiResponse.json();

    console.log(apiData);

    $worldMap.vectorMap({
      map: "world_mill_en",
      backgroundColor: "transparent",
      normalizeFunction: "polynomial",
      hoverOpacity: 0.7,
      hoverColor: false,
      regionStyle: {
        initial: {
          fill: "#59D79E", // Default fill color for all regions
        },
        selected: {
          fill: "#205867", // Blue color for the selected region
        },
      },
    });
    // Update selected region for the specific map
    mapObjects[mapId] = $worldMap.vectorMap("get", "mapObject");
    console.log(year);
    // Iterate over the array of regions and set them as selected
    apiData.body.geographies[year].forEach((item) => {
      console.log(item.vector);
      item.vector.forEach((item) => {
        mapObjects[mapId].setSelectedRegions(item);
      });
    });
  };

  // Initialize maps for different years
  await initializeWorldMap("world-map-markers-2023", "2023");
  await initializeWorldMap("world-map-markers-2022", "2022");
  await initializeWorldMap("world-map-markers-2021", "2021");
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
