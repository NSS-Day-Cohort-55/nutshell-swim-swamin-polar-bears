import react, {useState, useEffect} from "react";
import { settings } from "../Settings";
import { getLocalWeather } from "../modules/WeatherManager";
import "./weather.css"

export const  Weather = () =>{

    const [weather, updateWeather] = useState([])

    return(

    <div class="weather_container">
        <h3>Today's weather</h3>
        <p>blah</p>
        <p></p>
        <p></p>
    </div>
    )
}
