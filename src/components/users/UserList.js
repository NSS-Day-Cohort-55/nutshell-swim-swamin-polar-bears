import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  addFriend,
  existingFriendShipCheck,
} from "../modules/FriendManager";
import { UserCard } from "./UserCard";

export const UserList = ({ getLoggedInUser }) => {
  const [users, setUsers] = useState([]);

  //temporarily hard-coding logged in user. will need to fix this later

  const getUsers = () => {
    return getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
    });
  };

  const handleAddFriend = (id) => {
    const newFriend = {
      userId: id,
      currentUserId: getLoggedInUser(),
    };
    if (newFriend.userId !== newFriend.currentUserId) {
      addFriend(newFriend).then(() => getAllUsers().then(setUsers));
    } else {
      window.alert(
        "Cannot add friend. You have tried to add yourself or an existing friend."
      );
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container-cards">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            handleAddFriend={handleAddFriend}
          />
        ))}
      </div>
    </>
  );
};
