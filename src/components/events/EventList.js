import React, { useState, useEffect } from 'react';

import { EventCard } from './EventCard.js';
import { getAllEvents } from '../modules/EventManager';
import { useNavigate } from 'react-router-dom';


export const EventList = () => {
    const [events, setEvents] = useState([])

    const navigate = useNavigate();

    const getEvents = () => {
        return getAllEvents().then(eventsFromAPI => {
            setEvents(eventsFromAPI)
        })
    }

    useEffect(() => {
        getEvents();
    }, []);


    return (
        <>
            <div className='cards-container'>
                {events.map(event=> <EventCard eventObj={event} key={event.id}/>)}
            </div>
        </>
    )

}