import { key } from "./key.js";
const condition = document.querySelector("#condition")
const location = document.querySelector("#location")
const degree = document.querySelector("#degree");
const feels = document.querySelector("#feels");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const image = document.querySelector("#condition-image");
const search = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
console.log("Weather Application loaded");

async function getWeatherData(location) {
    console.log("Fetching Weather Data");
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error code 199")
        }
        const data = await response.json();
        if (data.error) {
            search.textContent = "Invalid City"
        } else {
            return data;
        }
    } catch (err) {
        console.log(`Error:`, err.message);
        throw err;
    }
}

async function weatherData(location) {
    try {
        toggleLoadingScreen();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
        const data = await getWeatherData(location);
        loadDataToDom(data)
        toggleLoadingScreen();

        console.log(data);
        return data;
    } catch (err) {
        console.log("Data not retrieved");
        console.log("Error: ", err);
        return;
    }
}

function loadDataToDom(data) {
    condition.textContent = data.current.condition.text; // Update the condition text
    location.textContent = data.location.name; // Update the location name
    degree.textContent = data.current.temp_f + "°F";
    feels.textContent = data.current.feelslike_f + "°F";
    wind.textContent = data.current.gust_mph + " mph";
    humidity.textContent = data.current.humidity + "%";
    if (condition.textContent === "Sunny") {
        image.src = "../assets/sun.png"
    } else if (condition.textContent === "Overcast") {
        image.src = "../assets/cloudy.png"
    } else if (condition.textContent === "Partly cloudy") {
        image.src = "../assets/partcloudy.png"
    } else if (condition.textContent === "Overcast") {
        image.src = "../assets/sun.png"
    } else if (condition.textContent === "Light rain") {
        image.src = "../assets/rain.png"
    } else if (condition.textContent === "Patchy light rain with thunder") {
        image.src = "../assets/thunder.png"
    } else {
        image.src = "../assets/sun.png"
    }


}

function toggleLoadingScreen() {
    const existingScreen = document.querySelector(".loading-screen");
    if (!existingScreen) {
        console.log("loading not exist");
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
        console.log("loading exist changing hidden");
        existingScreen.toggleAttribute("hidden");
    }
}
weatherData("london");

searchButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const input = search.value.trim();
    if (input === "") {
        red();
        console.log("noinput");
    } else {
        console.log(input);
        if(getWeatherData(input) === null){
            red();
        }else{
            const data =  weatherData(input)
            loadDataToDom(data);
        }
    }
})
function red() {
    search.placeholder = "invalid city"
    // Add a class to the searchButton to animate the underline
    search.classList.add("error-animation");

    // Remove the class after the animation completes
    setTimeout(() => {
        search.classList.remove("error-animation");
        search.placeholder = ""
    }, 300); // Adjust the timeout to match your CSS transition duration
}
    // if()
    // search.textContent = "";
    // console.log(input);
    // const data = getWeatherData(input);
