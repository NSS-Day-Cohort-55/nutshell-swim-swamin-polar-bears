import React from "react"
import "./EventCard.css"
import { Link } from "react-router-dom"

export const EventCard = ({ eventObj, handleDeleteEvent, getLoggedInUser, forecastObj }) => {

    const user = getLoggedInUser()

    // console.log(eventObj)
    // console.log(forecastObj.daily[6].weather[0].description)


    const formatDate =(date) => {
		const year = date.split("-")[0]
		const month = date.split("-")[1]
		const day = date.split("-")[2]
		return `${month}-${day}-${year}`
	  };

      // This function generates and returns todays date
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

    // This function returns an event forecast after taking in both objects and comparing the event date to the current date
    const genForecast = (eventObject, forecastObj) =>{

        const today = genDate()

        //converts dates to epoch time in days
        const todayEpoch = Date.parse(today)/86400000
        const objEpoch = Date.parse(eventObject.date)/86400000

        //Creates an index that is used in the weather api by subtracting today's epoch from event's epoch
        const result = (objEpoch - todayEpoch)
        
        //This returns a weather object to be rendered on the event card based upon conditionals
        try{
            if(result > 7 || result < 0){
                let weather = {
                    description: "Weather is not available for this date",
                    temp: ""
                }
                return weather
            }else if(forecastObj === undefined){
                let weather = {
                    description: "Weather is not available at this time."
                }
                return weather
            }
            else{
                let forecastDesc = forecastObj?.daily[result]?.weather[0]?.description 

                // let forecastTemp = forecastObj?.daily[result]?.temp?.max
                let weather = {
                    description: forecastDesc ? `${forecastDesc}` : "Weather is currently unavailable"

                }
                return weather
            } 
        } catch(TypeError){
            console.log(TypeError)

        }
    }


    return (
        <div className="card">
            <div className="card-content">
                <h3><span className="card-eventName">{eventObj.name}</span></h3>
                <h5><span className="card-eventPoster">Posted By: {eventObj.user?.name}</span></h5>
                <p>{formatDate(eventObj.date)}</p>
                <p>{eventObj.location}</p>
                <p>Forecast: {genForecast(eventObj, forecastObj).description} </p>
                <p>{eventObj.description}</p>
                {user === eventObj.userId? <Link to={`/events/${eventObj.id}/edit`}><button type="button">Edit</button></Link>: ""}
                {user === eventObj.userId? <button type="button" onClick={() => handleDeleteEvent(eventObj.id)}>Delete</button>: ""}
            </div>
        </div>
    )
}