"use strict";

(function (maps) {
  "use strict";

  var initializeWorldMap = function (mapId) {
    var $worldMap = maps("#" + mapId);

    var mapObjects = []; // Array to store map objects

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
        mapObjects[mapId].setSelectedRegions([code]); // Update selected region for the specific map
      },
    });

    mapObjects[mapId] = $worldMap.vectorMap("get", "mapObject"); // Store the map object in the array

    // Manually select the USA region on initialization
    mapObjects[mapId].setSelectedRegions(["US"]);
  };

  initializeWorldMap("world-map-markers-2021");
  initializeWorldMap("world-map-markers-2022");
  initializeWorldMap("world-map-markers-2023");
})(window.jQuery);
("use strict");

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
