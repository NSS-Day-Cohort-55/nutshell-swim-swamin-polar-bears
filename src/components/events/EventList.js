import React, { useState, useEffect } from 'react';

import { EventCard } from './EventCard.js';
import { deleteEvent, getAllEvents,  } from '../modules/EventManager';
import { useNavigate } from 'react-router-dom';


export const EventList = () => {
    const [events, setEvents] = useState([])

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


    return (
        <>
            <button type='button'
                className='btn'
                onClick={() => {navigate("/events/create")}}>
                Bust a nut
            </button>
            <div className='cards-container'>
                {events.map(event=> <EventCard eventObj={event} key={event.id} handleDeleteEvent={handleDeleteEvent}/>)}
            </div>
        </>
    )

}