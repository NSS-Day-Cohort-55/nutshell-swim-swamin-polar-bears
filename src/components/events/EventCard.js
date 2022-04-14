import React from "react"
import "./EventCard.css"
import { Link } from "react-router-dom"

export const EventCard = ({ eventObj }) => {


    return (
        <div className="card">
            <div className="card-content">
                <h3><span className="card-eventName">{eventObj.name}</span></h3>
                <h5><span className="card-eventPoster">Posted By: {eventObj.user?.name}</span></h5>
                <p>{eventObj.date}</p>
                <p>{eventObj.location}</p>
                <p>{eventObj.description}</p>
            </div>
        </div>
    )
}