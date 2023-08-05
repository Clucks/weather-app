import { key } from "./key.js";
const condition = document.querySelector("#condition")
const location = document.querySelector("#location")
const degree = document.querySelector("#degree");
const feels = document.querySelector("#feels");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
console.log("Weather Application loaded");

async function getWeatherData() {
    console.log("Fetching Weather Data");
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=London`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error code 199")
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`Error:`, err.message);
        throw err;
    }
}

async function weatherData() {
    try {
        toggleLoadingScreen();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

        const data = await getWeatherData();
        toggleLoadingScreen();
        loadDataToDom(data)
        console.log(data);
        return data;
    } catch (err) {
        console.log("Data not retrieved");
        console.log("Error: ", err);
    }
}

function loadDataToDom(data) {
    condition.textContent = data.current.condition.text; // Update the condition text
    location.textContent = data.location.name; // Update the location name
    degree.textContent += data.current.temp_f + "°F";
    feels.textContent += data.current.feelslike_f + "°F";
    wind.textContent += data.current.gust_mph + " mph";
    humidity.textContent += data.current.humidity + "%";
}

function toggleLoadingScreen() {
    const existingScreen = document.querySelector(".loading-screen");

    if (!existingScreen) {
        const screen = document.createElement("div");
        screen.classList.add("loading-screen");
        const circle = document.createElement("div");
        circle.classList.add("circle");
        const p = document.createElement("p");
        p.textContent = "Loading...";
        screen.appendChild(circle);
        screen.appendChild(p);

        document.querySelector("#content").appendChild(screen);
    } else {
        existingScreen.setAttribute("hidden", true);
    }
}
weatherData();
