export const remoteURL = "http://localhost:8088"

export const getAllTasks = () => {
    return fetch(`${remoteURL}/tasks?_expand=user`)
    .then(result => result.json())
}

export const getTaskById = (taskId) => {
    return fetch(`${remoteURL}/tasks/${taskId}?_expand=user`)
    .then(parseResponse => parseResponse.json())
}

export const deleteTask = (taskId) => {
    return fetch(`${remoteURL}/tasks/${taskId}`,{
        method: "DELETE"
    }).then(result => result.json())

}

export const addTask = (newTask) => {
    return fetch(`${remoteURL}/tasks`,{
        method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
  }).then(response => response.json())
}

export const updateTask  = (editedTask) => {
	return fetch(`${remoteURL}/tasks/${editedTask.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editedTask)
	}).then(data => data.json());
}