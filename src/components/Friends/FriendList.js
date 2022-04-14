import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteFriend,
  getMyFriends,
} from "../modules/FriendManager";
import { FriendCard } from "./FriendCard";

export const FriendList = ({ getLoggedInUser }) => {
  const [friends, setFriends] = useState([]);

  //temporarily hard-coding logged in user. will need to fix this later

  const getFriends = () => {
    return getMyFriends(getLoggedInUser()).then((friendsFromAPI) => {
      setFriends(friendsFromAPI);
    });
  };

  const handleDeleteFriend = (id) => {
    deleteFriend(id).then(() => getFriends());
  };

  const navigate = useNavigate();

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <>
      <div className="container-cards">
        {friends.map((friend) => (
          <FriendCard
            key={friend.id}
            friend={friend}
            handleDeleteFriend={handleDeleteFriend}
          />
        ))}
      </div>
    </>
  );
};
