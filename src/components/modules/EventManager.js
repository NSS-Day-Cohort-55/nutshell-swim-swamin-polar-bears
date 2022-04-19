const remoteURL = "http://localhost:8088"

export const getAllEvents = () => {
    return fetch(`${remoteURL}/events?_expand=user`)
    .then(res => res.json())
    .then(parsedResult => {
        parsedResult.sort(
            (currentEntry, nextEntry) => 
            Date.parse(currentEntry.date) -Date.parse(nextEntry.date)
        )
        return parsedResult
    })
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
export const deleteEvent = (eventId) => {
    return fetch(`${remoteURL}/events/${eventId}`, {
        method: "DELETE"
    }).then(result => result.json())
}

export const updateEvent = (eventObj) => {
    return fetch(`${remoteURL}/events/${eventObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(eventObj)
    }).then(response => response.json())
}