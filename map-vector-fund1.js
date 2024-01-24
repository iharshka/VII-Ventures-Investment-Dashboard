// "https://investors-backend.viiventures.co/funds/funds-geographies?format=json&fundName=VII%20Ventures%20FUND%201%20SP";
(async function (maps) {
  var initializeWorldMap = async function (mapId, year) {
    var mapObjects = {};
    var $worldMap = maps("#" + mapId);

    // Fetch investment data from the API
    var apiResponse = await fetch(
      "https://investors-backend.viiventures.co/funds/funds-geographies?format=json&fundName=VII%20Ventures%20FUND%201%20SP"
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
