import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEvent } from '../modules/EventManager';
import "./PostEvent.css"
import { getAllEvents } from '../modules/EventManager';


export const PostEvent = ({getLoggedInUser}) => {
    const [eventObj, setEvent] = useState({
        name: "",
        userId: getLoggedInUser(),
        date: new Date().toISOString().split("T")[0],
        description: "",
        location: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const formatDate =(date) => {
		const year = date.split("-")[0]
		const month = date.split("-")[1]
		const day = date.split("-")[2]
		return `${month}-${day}-${year}`
	  };

    const handleControlledInputChange = (event) => {
        const newEvent = { ...eventObj}
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }

        newEvent[event.target.id] = selectedVal

        setEvent(newEvent)
    }

    const handleClickSaveEvent = (event) => {
        // event.preventDefault()

        setIsLoading(true)
        formatDate(eventObj.date)
        addEvent(eventObj)
            .then(() => navigate("/events"))
    }


    return (
        <form className="form">
            <h2 className='form_title'>New Event</h2>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='name'>Event Name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Event Name" value={eventObj.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='date'>Event Date:</label>
                    <input type="date" id='date' className='form-control' onChange={handleControlledInputChange} value={eventObj.date}/>
                </div>
            </fieldset>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='description'>Description:</label>
                    <input type="text" id="description" className="form-control" onChange={handleControlledInputChange} value={eventObj.description}/>
                </div>

            </fieldset>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='location'>Location:</label>
                    <input type="text" id="location" className="form-control" onChange={handleControlledInputChange} value={eventObj.location}/>
                </div>
            </fieldset>
            <button type="button" className="btn btn-primary" disabled={isLoading}
				onClick={handleClickSaveEvent}>
				Bust
            </button>
        </form>
    )

    
}
