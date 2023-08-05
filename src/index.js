import { key } from "./key.js";
const condition = document.querySelector("#condition")
const location = document.querySelector("#location")
const degree = document.querySelector("#degree");
const feels = document.querySelector("#feels");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
console.log("Weather Application loaded");

// URL (required), options (optional)
// fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=london`)
//     .then(function (response) {
//         // Check if the response was successful (status code 200)
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         // Parse the JSON response
//         return response.json();
//     })
//     .then(function (data) {
//         // Successful response, data contains the weather information
//         console.log(data);
//     })
//     .catch(function (err) {
//         // Error handling
//         console.log('Error:', err.message);
//     });
async function getWeatherData() {
    console.log("Fetching Weather Data");
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=london`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error code 200")
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
        const data = await getWeatherData();
        loadDataToDom(data)
        console.log(data);
        console.log(data.current);
        return data;
    } catch(err) {
        console.log("Data not retrieved");
        console.log("Error: ", err);
    }
}

function loadDataToDom(data) {
    condition.textContent = data.current.condition.text; // Update the condition text
    location.textContent = data.location.name; // Update the location name
    degree.textContent += data.current.temp_f;
    feels.textContent += data.current.feelslike_f;
    wind.textContent += data.current.gust_mph;
    humidity.textContent += data.current.humidity;
}

weatherData();
// ... and so on
