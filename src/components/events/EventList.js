import React, { useState, useEffect } from 'react';
import { getLocalWeather } from '../modules/WeatherManager.js';
import { EventCard } from './EventCard.js';
import { deleteEvent, getAllEvents,  } from '../modules/EventManager';
import { useNavigate } from 'react-router-dom';


export const EventList = ({getLoggedInUser}) => {
    const [events, setEvents] = useState([])
    const [forecast, setForecast] = useState([])

    const navigate = useNavigate();

    const getEvents = () => {
        return getAllEvents().then(eventsFromAPI => {
            setEvents(eventsFromAPI)
        })
    }

    const handleDeleteEvent = id => {
        deleteEvent(id)
        .then(() => getAllEvents().then(setEvents))
    }

    useEffect(() => {
        getEvents();
    }, []);

    useEffect(()=>{
        getLocalWeather()
            .then(weather => setForecast(weather))
    },[])


    


    return (
        <>
            <div className='cards-container'>
                <div className='cards-display'>

                <button type='button'
                    className='new_event_btn'
                    onClick={() => {navigate("/events/create")}}>
                    Add An Event!
                </button>
                    {events.map(event=> <EventCard eventObj={event} key={event.id} handleDeleteEvent={handleDeleteEvent} getLoggedInUser={getLoggedInUser} forecastObj={forecast}/>)}
                </div>
            </div>
        </>
    )

}