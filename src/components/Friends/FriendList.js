import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFriend, getAllFriends, getMyFriends } from "../modules/FriendManager";
import { FriendCard } from "./FriendCard";

export const FriendList = ({getLoggedInUser}) => {
  const [friends, setFriends] = useState([]);

  //temporarily hard-coding logged in user. will need to fix this later
  const currentlyLoggedInUser = 2;

  const getFriends = () => {
    return getMyFriends(currentlyLoggedInUser).then((friendsFromAPI) => {
      setFriends(friendsFromAPI);
      console.log(friendsFromAPI);
    });
  };

  const handleDeleteFriend = (id) => {
    deleteFriend(id).then(() => getMyFriends().then(setFriends));
  };

  const navigate = useNavigate();

  getLoggedInUser();

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
            // handleDeleteAnimal={handleDeleteAnimal}
          />
        ))}
      </div>
    </>
  );
};
