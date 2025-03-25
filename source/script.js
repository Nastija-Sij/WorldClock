document.addEventListener("DOMContentLoaded", () => {
  displayCurrentCity();
  setInterval(updateAllTimes, 1000); // Update all displayed cities every second
});

let selectCitiesElement = document.querySelector("#select-cities");
selectCitiesElement.addEventListener("change", addCity);

function displayCurrentCity() {
  let currentCityTimeZone = moment.tz.guess();
  let currentCityName = currentCityTimeZone.replace("_", " ").split("/")[1];
  let currentCityTime = moment().tz(currentCityTimeZone);

  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = `
    <div class="area">
      <div class="city-info">
        <p><span class="current-tz">Current timezone:</span> </br>
          <span class="city">${currentCityName}</span>
          <span class="utc">UTC ${currentCityTime.format("Z")}</span>
        </p>
        <p class="date">${currentCityTime.format("dddd, LL")}</p>
      </div>
      <h2 class="time">${currentCityTime.format("HH:mm:ss")}</h2>
    </div>
    <hr />
  `;
  currentCityElement.setAttribute("data-timezone", currentCityTimeZone);
}

function addCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return; // Exit if no city selected

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);

  // Check if the city already exists to prevent duplicates
  let existingCity = document.querySelector(
    `[data-timezone="${cityTimeZone}"]`
  );
  if (existingCity) return;

  let cityContainerElement = document.querySelector("#city-container");
  let newCityElement = document.createElement("div");
  newCityElement.classList.add("city-entry");
  newCityElement.setAttribute("data-timezone", cityTimeZone);

  newCityElement.innerHTML = `
    <div class="area">
      <div class="city-info">
        <p>
          <span class="city">${cityName}</span>
          <span class="utc">UTC ${cityTime.format("Z")}</span>
        </p>
        <p class="date">${cityTime.format("dddd, LL")}</p>
      </div>
      <h2 class="time">${cityTime.format("HH:mm:ss")}</h2>
    </div>
    
  `;

  cityContainerElement.appendChild(newCityElement);
}

function updateAllTimes() {
  // Update current city
  let currentCityElement = document.querySelector("#current-city");
  let currentCityTimeZone = currentCityElement.getAttribute("data-timezone");
  let currentCityTime = moment().tz(currentCityTimeZone);

  if (currentCityElement) {
    currentCityElement.querySelector(".date").textContent =
      currentCityTime.format("dddd, LL");
    currentCityElement.querySelector(".time").textContent =
      currentCityTime.format("HH:mm:ss");
    currentCityElement.querySelector(
      ".utc"
    ).textContent = `UTC ${currentCityTime.format("Z")}`;
  }

  // Update all selected cities
  let cityEntries = document.querySelectorAll(".city-entry[data-timezone]");
  cityEntries.forEach((city) => {
    let cityTimeZone = city.getAttribute("data-timezone");
    let cityTime = moment().tz(cityTimeZone);

    city.querySelector(".date").textContent = cityTime.format("dddd, LL");
    city.querySelector(".time").textContent = cityTime.format("HH:mm:ss");
    city.querySelector(".utc").textContent = `UTC ${cityTime.format("Z")}`;
  });
}
