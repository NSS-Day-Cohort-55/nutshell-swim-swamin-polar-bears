export const remoteURL = "http://localhost:8088"

export const getTaskById = (taskId) => {
    return fetch(`${remoteURL}/tasks?userId=${taskId}&_expand=user`)
    .then(parseResponse => parseResponse.json())
}

export const deleteAnimal = (taskId) => {
    return fetch(`${remoteURL}/tasks/${taskId}`)
    .then(parseResponse => parseResponse)

}