let selectedCityTimezone = "Europe/London"; // Default city timezone

document.addEventListener("DOMContentLoaded", () => {
  displayCurrentCity();
  setInterval(displayCurrentCity, 1000);

  // Display a default city when the page loads
  updateCity(selectedCityTimezone);
  setInterval(() => updateCity(selectedCityTimezone), 1000);

  let selectCitiesElement = document.querySelector("#select-cities");
  selectCitiesElement.addEventListener("change", (event) => {
    selectedCityTimezone = event.target.value; //store the new selected city
    updateCity(event.target.value);
  });
});

function displayCurrentCity() {
  let currentCityElement = document.querySelector("#current-city");
  if (!currentCityElement) return;

  let currentCityTimezone = moment.tz.guess();
  let currentCityName = currentCityTimezone.split("/")[1].replace("_", " ");
  let currentCityTime = moment().tz(currentCityTimezone);

  currentCityElement.innerHTML = `
    <div class="area">
      <div class="city-info">
        <p>Current Timezone</br>
          <span class="city">${currentCityName}</span>
          <span id="utc-la">UTC ${currentCityTime.format("Z")}</span>
        </p>
        <p class="date">${currentCityTime.format("dddd, LL")}</p>
      </div>
      <h2 class="time">${currentCityTime.format("HH:mm:ss")}</h2>
    </div>
    <hr class="divider" />
  `;
  currentCityElement.setAttribute("data-timezone", currentCityTimezone);
}

function updateCity(cityTimezone) {
  if (!cityTimezone) return;

  let cityContainer = document.querySelector("#second-city");
  if (!cityContainer) return;

  let cityName = cityTimezone.split("/")[1].replace("_", " ");
  let cityTime = moment().tz(cityTimezone);

  cityContainer.innerHTML = `
    <div class="area">
      <div class="city-info">
        <p><span class="city">${cityName}</span>
          <span id="utc-second">UTC ${cityTime.format("Z")}</span>
        </p>
        <p class="date">${cityTime.format("dddd, LL")}</p>
      </div>
      <h2 class="time">${cityTime.format("HH:mm:ss")}</h2>
    </div>`;
  cityContainer.setAttribute("data-timezone", cityTimezone);
}
