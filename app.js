/* Imports */
// > Part A: Import `getCountries` from fetch-utils.js
import { getCountries } from './fetch-utils.js';
// > Part B: Import `getContinents` from fetch-utils.js
import { getContinents } from './fetch-utils.js';
import { renderContinentOption, renderCountry } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');
const searchForm = document.getElementById('search-form');
const continentSelect = document.getElementById('continent-select');
const countryList = document.getElementById('country-list');

/* State */
let error = null;
let count = 0;
let continents = [];
let countries = [];

/* Events */
window.addEventListener('load', async () => {
    // > Part A: call findCountries (with no arguments)
    findCountries();
    // > Part B: await the call to get continents to get the response
    const continentsResponse = await getContinents();
    // > Part B: Assign to state the:
    error = continentsResponse.error; //      - error,
    continents = continentsResponse.data; //      - data (to the continents variable)

    if (!error) {
        displayContinentOptions();
        displayCountries();
    }
});

async function findCountries(name, continent) {
    // > Part A: Call the service function that gets the countries
    const response = await getCountries(name, continent);
    // > Part C: Add the name and continent arguments to getCountries

    // > Part A: Assign to state the :
    error = response.error; //      - error,
    countries = response.data; //      - data (to the countries variable)

    // > Part D: Assign to state the:
    count = response.count; //      - count (of db records)

    displayNotifications();
    if (!error) {
        displayCountries();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    // > Part C: Call findCountries with name and continent from formData
    const name = formData.get('name');
    const continent = formData.get('continent');
    findCountries(name, continent);
});

/* Display Functions */
function displayCountries() {
    countryList.innerHTML = '';

    for (const country of countries) {
        // > Part A: render and append to list
        const countryEl = renderCountry(country);
        countryList.append(countryEl);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        // > Part D: Display a message with
        //      - how many items were returned in countries array
        //      - how many total matching countries were in the db
        notificationDisplay.textContent = `Displaying ${countries.length} of ${count} matching.`;
    }
}

function displayContinentOptions() {
    // continentSelect.innerHTML = '';
    for (const continent of continents) {
        // > Part B: render and append options to select
        const optionEl = renderContinentOption(continent);
        continentSelect.append(optionEl);
    }
}
