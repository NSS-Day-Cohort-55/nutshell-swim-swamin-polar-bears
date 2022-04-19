import react from "react";

const remoteURL = "http://localhost:8088";

export const getAllUsers = () => {
  // If your json-server URL is different, please change it below!
  return fetch(`${remoteURL}/users`).then((res) => res.json());
};

export const findUser = (userName) =>{
  return fetch(`${remoteURL}/users?q=${userName}`)
    .then(response => response.json())
}

export const getUserById = (userId) => {
  return fetch(`${remoteURL}/users/${userId}`)
  .then((res) => res.json());
}

export const getMyFriends = (id) => {
  return fetch(`${remoteURL}/friends?currentUserId=${id}&_expand=user`).then(
    (res) => res.json()
  );
};

export const addFriend = (newFriend) => {
  return fetch(`${remoteURL}/friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFriend),
  }).then((response) => response.json());
};

export const deleteFriend = (id) => {
  return fetch(`${remoteURL}/friends/${id}`, {
    method: "DELETE",
  }).then((result) => result.json());
};

export const existingFriendShipCheck = (thisFriendship) => {
  return fetch(`${remoteURL}/friends?userId=${thisFriendship.userId}&currentUserId=${thisFriendship.currentUserId}`)
      .then(res => {res.json();console.log(res)})
      // .then(friend => friend.length>0 ? true : false)
}