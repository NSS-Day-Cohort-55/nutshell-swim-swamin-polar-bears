import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent  } from "../modules/EventManager";
import "./PostEvent.css"

export const EventEditForm = ({getLoggedInUser}) => {

    const[eventObj, setEvent] = useState({})
    const user = parseInt(getLoggedInUser)

    const navigate = useNavigate()
    const{eventId} = useParams()

    const handleEventChanges = (event) => {
        const editedEvent = {...eventObj}

        editedEvent[event.target.id] = event.target.value
        setEvent(editedEvent)
    }

    const handleUpdateEvent = (event) => {
        event.preventDefault()

        updateEvent(eventObj)
        .then(() => navigate("/events"))

    }

    useEffect(() => {
        getEventById(eventId)
            .then(eventObj =>{
                console.log(eventObj)
                setEvent(eventObj)
            })
    }, [])

    return (
        <form>
            <h2>Edit Event</h2>
            <fieldset>
                <label htmlFor="event_name">Name Of Event:</label>
                <input type="text" id="name" onChange={handleEventChanges} required autoFocus className= "controlled_form" placeholder="Event Title" value={eventObj.name}/>
            </fieldset>
            <fieldset>
                <label htmlFor="event_date">Date Of Event:</label>
                <input type="date" id="date" onChange={handleEventChanges} required autoFocus className="controlled__form" placeholder="Event Date" value={eventObj.date}/>
            </fieldset>
            <fieldset>
                <label htmlFor="event_description">Event Description:</label>
                <input type="text" id="description" className="form-control" onChange={handleEventChanges} value={eventObj.description}/>
            </fieldset>
            <fieldset>
                <label htmlFor="event_location">Event Location:</label>
                <input type="location" id="location" className="form-control" onChange={handleEventChanges} value={eventObj.location}/>
            </fieldset>
            <button type="button" id="event_edit_cancel_btn" className="submit_btn" onClick={() => navigate("/events")}>Cancel</button>
            <button type="button" id="event_edit_submit_btn" className="submit_btn" onClick={handleUpdateEvent}>Submit</button> 
        </form>
    )
}