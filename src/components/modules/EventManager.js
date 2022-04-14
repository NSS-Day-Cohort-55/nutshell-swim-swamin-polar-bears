const remoteURL = "http://localhost:8088"

export const getAllEvents = () => {
    return fetch(`${remoteURL}/events?_expand=user`)
    .then(res => res.json())
}

export const getEventById = (eventId) => {
    return fetch(`${remoteURL}/events/${eventId}`)
    .then(res => res.json())
}

export const addEvent = (newEvent) => {
    return fetch(`${remoteURL}/events`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
    }).then(response => response.json())
}