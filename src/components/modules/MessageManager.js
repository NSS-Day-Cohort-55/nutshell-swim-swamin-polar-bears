import react from "react";

const remoteURL = "http://localhost:8088";

export const getAllUsers = () => {
  // If your json-server URL is different, please change it below!
  return fetch(`${remoteURL}/users`).then((res) => res.json());
};

export const getMyMessages = (id) => {
  return fetch(`${remoteURL}/messages?currentUserId=${id}&_expand=user`).then(
    (res) => res.json()
  );
};

export const addMessage = (newMessage) => {
  return fetch(`${remoteURL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  }).then((response) => response.json());
};

export const deleteMessage = (id) => {
  return fetch(`${remoteURL}/messages/${id}`, {
    method: "DELETE",
  }).then((result) => result.json());
};