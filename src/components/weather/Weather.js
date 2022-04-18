import react, {useState, useEffect} from "react";
import { settings } from "../../Settings";
import { getLocalWeather } from "../modules/WeatherManager";
import "./weather.css"

export const  Weather = () =>{

    const [weather, updateWeather] = useState({})

    useEffect(()=>{
        getLocalWeather().then(newWeather => {
            let weather = {
                current: newWeather.current.temp,
                feels_like: newWeather.current.feels_like,
                description: newWeather.current.weather[0].description
            }
            updateWeather(weather)
        })
    },[])

    return(

    <div className="weather_container">
        <h3>Today's weather</h3>
        <p>Temperature: {weather.current}</p>
        <p>Feels like: {weather.feels_like}</p>
        <p>Expect: {weather.description}</p>
    </div>
    )
}
