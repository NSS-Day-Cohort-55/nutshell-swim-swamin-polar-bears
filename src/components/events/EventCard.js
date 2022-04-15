import React from "react"
import "./EventCard.css"
import { Link } from "react-router-dom"

export const EventCard = ({ eventObj, handleDeleteEvent, getLoggedInUser }) => {

    const user = getLoggedInUser()

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
                {user === eventObj.userId? <Link to={`/events/${eventObj.id}/edit`}><button type="button">Edit</button></Link>: ""}
                {user === eventObj.userId? <button type="button" onClick={() => handleDeleteEvent(eventObj.id)}>Delete</button>: ""}
            </div>
        </div>
    )
}