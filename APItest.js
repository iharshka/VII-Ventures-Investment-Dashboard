async function apirun() {
  // Fetch MOIC data from the API
  const response = await fetch(
    "https://virtserver.swaggerhub.com/MEHRATAVISH000/Investment_Dashboard/1.0.0/api/overall-portfolio/vii-ventures/"
  );
  const dataFromAPI = await response.json();

  // Extract labels and data from the API response
  const labels = ["", ...Object.keys(dataFromAPI), ""];
  const data = [
    null,
    ...Object.values(dataFromAPI).map((item) => item.moic),
    null,
  ];
  console.log(labels);
  console.log(data);
}
apirun();
