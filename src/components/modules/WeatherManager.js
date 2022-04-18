import { settings } from "../../Settings"




export const getLocalWeather = () =>{
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${settings.nashville.lat}&lon=${settings.nashville.long}&timezone=America/Chicago&units=imperial&appid=${settings.weatherKey}`)
        .then(response => response.json())
}

const getGeoCode = (city, state, apikey) =>{
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},+1&limit=5&appid=${apikey}`)
        .then(response => response.json())
        .then(things => {
            return things
        })
}
