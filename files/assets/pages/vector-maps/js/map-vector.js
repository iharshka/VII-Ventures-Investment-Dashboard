"use strict";
!(function (maps) {
  "use strict";
  var b = function () {};
  b.prototype.init = function () {
    var $worldMap = maps("#world-map-markers");

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
          fill: "#205867", // Blue color for the United States
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
      // markers: [
      //   {
      //     latLng: [28.61, 77.23], // Coordinates for New Delhi, India
      //     name: "New Delhi, India",
      //   },
      // ],
    });

    // Manually select the region for the United States
    $worldMap.vectorMap("get", "mapObject").setSelectedRegions(["US"]);
    $worldMap.vectorMap("get", "mapObject").setSelectedRegions(["ASIA"]);
  };
  (maps.VectorMap = new b()), (maps.VectorMap.Constructor = b);
})(window.jQuery),
  (function (maps) {
    "use strict";
    maps.VectorMap.init();
  })(window.jQuery);
