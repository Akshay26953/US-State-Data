const searchInput = document.querySelector("#search"); 
const suggestions = document.querySelector('.suggestions');
const Data = []; //Empty array to store fetched data

fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
.then(res => res.json()) //convert fetched data into json
.then(data => Data.push(...data)); //push json data to empty array with spread operator 

//Create a funciton to match input with values in Data
function findMatches(wordToMatch, Data) {
    return Data.filter(places => {
        const regex = new RegExp((wordToMatch), 'gi');
        return places.city.match(regex) || places.state.match(regex);
    })
}

searchInput.addEventListener('change', matchInput);
searchInput.addEventListener('keyup', matchInput)

function matchInput() {
    const matchData = findMatches(this.value, Data);
    console.log(this.value.length)
    if (this.value.length === 0) {
        
    } 
    const regex = new RegExp(this.value, 'gi');
    const suggestion = matchData.map(place => {
        const cityName = place.city.replace(regex, `<span class="h2">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="h2">${this.value}</span>`);
        const population = place.population;
        return `
        <li class="suggList">
        <span>${cityName}, ${stateName}</span>
        <span>${population}</span>
        </li>
        `
    }).join(" ");
    suggestions.innerHTML = suggestion;
    // console.log(regex);
}