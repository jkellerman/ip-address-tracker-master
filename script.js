const url = "https://geo.ipify.org/api/v2/country,city?apiKey=";
const geoApiKey = "at_bfYP0ALvxe1bi1y15ZvlujMFc84Ap";
const button = document.querySelector("button");
const input = document.querySelector("#search");

const getIP = async (param, input) => {
  const endPoint = `${url}${geoApiKey}${param}${input}`;
  const response = await fetch(endPoint);
  const jsonResponse = await response.json();
  if (response.ok) {
    let ipAddress = (document.querySelector(".ip__address").innerText =
      jsonResponse.ip);
    let location = (document.querySelector(
      ".location"
    ).innerText = `${jsonResponse.location.region}, ${jsonResponse.location.country}`);
    let timezone = (document.querySelector(
      ".timezone"
    ).innerText = `UTC${jsonResponse.location.timezone}`);
    let isp = (document.querySelector(".isp").innerText = jsonResponse.isp);
  }
};

getIP("", "");

button.addEventListener("click", () => {
  let newInput = input.value;
  if (!newInput == "") {
    getIP("&domain=", newInput);
  }
});

var map = L.map("map").setView([51.505, -0.09], 13);
