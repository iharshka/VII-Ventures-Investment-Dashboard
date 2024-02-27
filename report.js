const apiEndpoint =
  "https://investors-backend.viiventures.co/funds/reports?format=json";

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    return data.body;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to update HTML content with API data
async function updateContent() {
  const fundData = await fetchData();

  // Replace 'VII Ventures SPC' with the actual fund name you want to display
  const fundName = "VII Ventures SPC";

  // Replace the following code with your actual HTML structure
  document.querySelector(".elementor-heading-title").textContent = fundName;
  document
    .querySelector(".elementor-heading-title")
    .insertAdjacentHTML("afterend", '<div class="elementor-widget-container">');
  document
    .querySelector(".elementor-widget-container")
    .insertAdjacentHTML(
      "afterend",
      `<p class="elementor-heading-title elementor-size-default"><span style="font-weight: bolder; font-size: 14px;">Password:</span><span style="font-size: 14px;"> ${fundData[fundName].password}</span></p>`
    );
  document
    .querySelector(".elementor-widget-container")
    .insertAdjacentHTML(
      "afterend",
      `<div class="elementor-button-wrapper"><a class="elementor-button elementor-button-link elementor-size-sm" href="${fundData[fundName]["2021"]}" target="_blank"><span class="elementor-button-content-wrapper"><span class="elementor-button-text">Download</span></span></a></div>`
    );

  // Repeat the process for other years or sections as needed
}

// Call the function to update content when the page loads
window.addEventListener("load", updateContent);
