function displayDate() {
  //Los Angeles
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesUtcElement = losAngelesElement.querySelector("#utc-la");
    let losAngelesTime = moment().tz("America/Los_Angeles");

    losAngelesUtcElement.innerHTML = `UTC ${losAngelesTime.format("Z")}  `;
    losAngelesDateElement.innerHTML = losAngelesTime.format("dddd, LL");
    losAngelesTimeElement.innerHTML = losAngelesTime.format("HH:mm:ss");
  }

  let newYorkElement = document.querySelector("#new-york");
  if (newYorkElement) {
    let newYorkDateElement = newYorkElement.querySelector(".date");
    let newYorkTimeElement = newYorkElement.querySelector(".time");
    let newYorkUtcElement = newYorkElement.querySelector("#utc-ny");
    let newYorkTime = moment().tz("America/New_York");

    newYorkUtcElement.innerHTML = `UTC ${newYorkTime.format("Z")}`;
    newYorkDateElement.innerHTML = newYorkTime.format("dddd, LL");
    newYorkTimeElement.innerHTML = newYorkTime.format("HH:mm:ss");
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);

  let cityContainerElement = document.querySelector("#city-container");
  cityContainerElement.innerHTML = `
      <div class="city-entry">
       <div class="area" id="los-angeles">
       <div class="city-info">
        <p>
          <span class="city">${cityName}</span>
          <span id="utc-la">UTC ${cityTime.format("Z")}</span>
        </p>
        <p class="date">${cityTime.format("dddd, LL")}</p>
      </div>
      <h2 class="time">${cityTime.format("HH:mm:ss")}</h2>   
      </div>        </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  //DOMContentLoaded is an event that fires when the HTML document is fully loaded and parsed, but before images, stylesheets, and other external resources are completely loaded. By default, JavaScript in the <head> runs before the browser finishes loading the HTML. If you try to select an element (document.querySelector) that hasn’t been created yet, JavaScript will return null, causing errors like:
  displayDate();
});

displayDate(); // calls the function
setInterval(displayDate, 1000); // calls the function every second

let selectCitiesElement = document.querySelector("#select-cities");
selectCitiesElement.addEventListener("change", updateCity);
