import React, { useState, useEffect } from 'react';
import { getEventWeather, getLocalWeather } from '../modules/WeatherManager.js';
import { EventCard } from './EventCard.js';
import { deleteEvent, getAllEvents,  } from '../modules/EventManager';
import { useNavigate } from 'react-router-dom';


export const EventList = ({getLoggedInUser}) => {
    const [events, setEvents] = useState([])
    const [forecast, setForecast] = useState({
        description: "",
        temp: ""
    })

    const navigate = useNavigate();

    const getEvents = () => {
        return getAllEvents().then(eventsFromAPI => {
            setEvents(eventsFromAPI)
        })
    }

    const genDate = () =>{
        const currentDate = new Date()
        let year = currentDate.getFullYear()
        let month = currentDate.getMonth() +1
        let day = currentDate.getDate()

        day < 10 ? day = '0'+day : day=day
        month < 10 ? month = '0'+month : month=month

        const todaysDate = `${year}-${month}-${day}`
        return todaysDate
    }

    const handleDeleteEvent = id => {
        deleteEvent(id)
        .then(() => getAllEvents().then(setEvents))
    }

    const genForecast = (eventObject) =>{
        const today = genDate()
        const todayEpoch = Date.parse(today)/86400000
        const objEpoch = Date.parse(eventObject.date)/86400000

        const result = objEpoch - todayEpoch
        console.log("results", result)

        if(result > 7 || result < 0){
            return "Weather is not available for this date"
        }else{
            getLocalWeather()
                .then(newWeather => {

                   let weather = {
                        description: newWeather.daily[result].weather[0].description,
                        temp: newWeather.daily[result].temp
                        
                    }
                    
                    setForecast(weather)
                })
                
        } 
        return forecast
    }

    useEffect(() => {
        getEvents();
    }, []);


    


    return (
        <>
            <button type='button'
                className='btn'
                onClick={() => {navigate("/events/create")}}>
                Add An Event!
            </button>
            <div className='cards-container'>
                {events.map(event=> <EventCard eventObj={event} key={event.id} handleDeleteEvent={handleDeleteEvent} getLoggedInUser={getLoggedInUser} genForecast={genForecast}/>)}
            </div>
        </>
    )

}