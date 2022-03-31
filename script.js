const url = "https://geo.ipify.org/api/v2/country,city?apiKey=";
const geoApiKey = "at_bfYP0ALvxe1bi1y15ZvlujMFc84Ap";
const button = document.querySelector("button");
const input = document.querySelector("#search");

let map = L.map("map").setView([51.505, -0.09], 15);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiamtlbGwiLCJhIjoiY2t3N3JlNmFzMWVnYjJxbWVxNGR5cXh4MSJ9.CCiBpULqHcrdq2fXBv7qog",
  }
).addTo(map);

let marker = L.marker([51.505, -0.09]).addTo(map);

const getIP = async (param, input) => {
  map.remove();
  const endPoint = `${url}${geoApiKey}${param}${input}`;
  const response = await fetch(endPoint);
  const jsonResponse = await response.json();
  if (response.ok) {
    let latitude = jsonResponse.location.lat;
    let longitute = jsonResponse.location.lng;
    let ipAddress = (document.querySelector(".ip__address").innerText =
      jsonResponse.ip);
    let location = (document.querySelector(
      ".location"
    ).innerText = `${jsonResponse.location.region}, ${jsonResponse.location.country}`);
    let timezone = (document.querySelector(
      ".timezone"
    ).innerText = `UTC${jsonResponse.location.timezone}`);
    let isp = (document.querySelector(".isp").innerText = jsonResponse.isp);

    // add map
    map = L.map("map").setView([latitude, longitute], 15);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiamtlbGwiLCJhIjoiY2t3N3JlNmFzMWVnYjJxbWVxNGR5cXh4MSJ9.CCiBpULqHcrdq2fXBv7qog",
      }
    ).addTo(map);

    let marker = L.marker([latitude, longitute]).addTo(map);
  }
};

getIP("", "");

button.addEventListener("click", () => {
  let newInput = input.value;
  if (!newInput == "") {
    getIP("&domain=", newInput);
  }
});
