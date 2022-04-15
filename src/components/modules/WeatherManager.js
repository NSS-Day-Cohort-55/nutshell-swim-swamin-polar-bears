import { settings } from "../Settings"




export const getLocalWeather = () =>{
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${settings.nashville.lat}&lon=${settings.nashville.long}&timezone=America/Chicago&units=imperial&appid=${settings.weatherKey}`)
        .then(response => response.json())
}