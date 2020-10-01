'use strict';

const apiKey = "sFKJFo52JngNlcYgjHaeh6J9rwfksyfMlW6anVZU"
const searchURL = "https://developer.nps.gov/api/v1/parks"

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    let endResult = [];
    var i = 0;
    for (i = 0; i < responseJson.data.length; i++) {
        endResult.push(
        `<div class="group">
            <div class="item">
                <h1>${responseJson.data[i].fullName}</h1>
            </div>
            <div class="item">
                <h3>${responseJson.data[i].description}</h3>
            </div>
            <div class="item">
                <h3><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></h3>
            </div>
            <div class="item">
                <p>${responseJson.data[i].addresses[0].line1} ${responseJson.data[i].addresses[0].line2} ${responseJson.data[i].addresses[0].line3}</p>
                <p>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
            </div>
        </div>`)
        $('.results-list').html(endResult);
        $('.results-list').removeClass('hidden');
    }
}

function getParks(query, maxResults=20) {
    const params = {
        q: query,
        limit: maxResults
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString + '&api_key=' + apiKey;

    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('#js-error-message').text(`Something went wrong: ${error.message}`)
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchArea = $('#js-search-area').val();
        const maxResults = $('#js-max-results').val();
        getParks(searchArea, maxResults);
    });
}

$(watchForm);
