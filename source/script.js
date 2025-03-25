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

document.addEventListener("DOMContentLoaded", () => {
  //DOMContentLoaded is an event that fires when the HTML document is fully loaded and parsed, but before images, stylesheets, and other external resources are completely loaded. By default, JavaScript in the <head> runs before the browser finishes loading the HTML. If you try to select an element (document.querySelector) that hasn’t been created yet, JavaScript will return null, causing errors like:
  displayDate();
});

displayDate(); // calls the function
setInterval(displayDate, 1000); // calls the function every second
