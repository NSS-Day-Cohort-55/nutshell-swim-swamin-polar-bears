import react from "react";

const remoteURL = "http://localhost:8088";

export const getAllMessages = () => {
  // If your json-server URL is different, please change it below!
  return fetch(`${remoteURL}/messages?_expand=user&_expand=currentUser&_sort=timeStamp&_order=desc`).then((res) => res.json());
};

export const getMyMessages = (id) => {
  return fetch(`${remoteURL}/messages?currentUserId=${id}&_expand=user`).then(
    (res) => res.json()
  );
};

export const addMessage = (newMessage) => {
  return fetch(`${remoteURL}/messages?`, {
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

export const updateMessage = (editedMessage) => {
  return fetch(`${remoteURL}/messages/${editedMessage.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedMessage),
  }).then((data) => data.json());
};

export const getMessageById = (messageId) => {
  return fetch(
    `${remoteURL}/messages/${messageId}?_expand=user`
  ).then((res) => res.json());
};