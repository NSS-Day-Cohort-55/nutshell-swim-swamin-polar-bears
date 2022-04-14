import react from "react";

const remoteURL = "http://localhost:8088";

export const getAllFriends = () => {
  // If your json-server URL is different, please change it below!
  return fetch(`${remoteURL}/friends?_expand=user`).then((res) => res.json());
};

export const getMyFriends = (id) => {
  return fetch(`${remoteURL}/friends?currentUserId=${id}&_expand=user`).then(
    (res) => res.json()
  );
};

export const deleteFriend = (id) => {
  return fetch(`${remoteURL}/friends/${id}`, {
    method: "DELETE",
  }).then((result) => result.json());
};