import React from "react"
import "./EventCard.css"
import { Link } from "react-router-dom"

export const EventCard = ({ eventObj, handleDeleteEvent }) => {

    const formatDate =(date) => {
		const year = date.split("-")[0]
		const month = date.split("-")[1]
		const day = date.split("-")[2]
		return `${month}-${day}-${year}`
	  };


    return (
        <div className="card">
            <div className="card-content">
                <h3><span className="card-eventName">{eventObj.name}</span></h3>
                <h5><span className="card-eventPoster">Posted By: {eventObj.user?.name}</span></h5>
                <p>{formatDate(eventObj.date)}</p>
                <p>{eventObj.location}</p>
                <p>{eventObj.description}</p>
                <button type="button" onClick={() => handleDeleteEvent(eventObj.id)}>Delete</button>
            </div>
        </div>
    )
}