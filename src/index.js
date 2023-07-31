import { key } from "./key.js";

console.log("hi");

// URL (required), options (optional)
fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=london`)
    .then(function (response) {
        // Check if the response was successful (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
    })
    .then(function (data) {
        // Successful response, data contains the weather information
        console.log(data);
    })
    .catch(function (err) {
        // Error handling
        console.log('Error:', err.message);
    });
