import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent  } from "../modules/EventManager";
import { loadFull } from "tsparticles"
import Particles from "react-tsparticles";
import "./PostEvent.css"

export const EventEditForm = ({getLoggedInUser}) => {

    const[eventObj, setEvent] = useState({})
    const user = parseInt(getLoggedInUser)

    const navigate = useNavigate()
    const{eventId} = useParams()

    //*particles functions
    const particlesInit = async (main) => {
		// console.log(main);

		await loadFull(main);
	};

	const particlesLoaded = (container) => {
		console.log(container)
	}
    //*Edit functions
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
        <>
        <form>
            <div className="new_event">
            <h2>Edit Event</h2>
            <fieldset>
                <label htmlFor="event_name">Name Of Event:</label>
                <input type="text" id="event_name" onChange={handleEventChanges} required autoFocus className= "event_controlled_form" placeholder="Event Title" value={eventObj.name}/>
            </fieldset>
            <fieldset>
                <label htmlFor="event_date">Date Of Event:</label>
                <input type="date" id="event_date" onChange={handleEventChanges} required autoFocus className="event_controlled__form" placeholder="Event Date" value={eventObj.date}/>
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
            </div>
        </form>
        {/* <Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={{
					
					background: {
					// color: {
					// 	value: "#0d47a1",
					// },
					},
					fpsLimit: 120,
					interactivity: {
					events: {
						onClick: {
						enable: true,
						mode: "push",
						},
						onHover: {
						enable: true,
						mode: "repulse",
						},
						resize: true,
					},
					modes: {
						push: {
						quantity: 4,
						},
						repulse: {
						distance: 200,
						duration: 0.4,
						},
					},
					},
					particles: {
					color: {
						value: "#ffffff",
					},
					links: {
						color: "#ffffff",
						distance: 150,
						enable: true,
						opacity: 0.5,
						width: 1,
					},
					collisions: {
						enable: true,
					},
					move: {
						direction: "none",
						enable: true,
						outModes: {
						default: "bounce",
						},
						random: false,
						speed: 1,
						straight: false,
					},
					number: {
						density: {
						enable: true,
						area: 800,
						},
						value: 80,
					},
					opacity: {
						value: 0.5,
					},
					shape: {
						type: "polygon",
					},
					size: {
						value: { min: 1, max: 1 },
					},
					},
					detectRetina: true,
				}}
    		/> */}
        </>
    )
}