import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  addFriend,
  existingFriendShipCheck, findUser
} from "../modules/FriendManager";
import { UserCard } from "./UserCard";

export const UserList = ({ getLoggedInUser }) => {
  const [users, setUsers] = useState([]);
  const [userSearch, foundUser] = useState({
    name: ""
  })

  //temporarily hard-coding logged in user. will need to fix this later

  const getUsers = () => {
    return getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
    });
  };

  const findUsers = (userName) =>{
    findUser(userName).then(user =>{
      setUsers(user)
      console.log(user)
    })
  }
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

  const controlInput = (event) =>{
    const searchedUser = {...userSearch}

    searchedUser[event.target.id] = event.target.value
    console.log("event", searchedUser)
    foundUser(searchedUser)
  }

  const handleSearch = () =>{
    findUsers(userSearch.name)
  }

  // useEffect(() => {
  //   findUsers();
  // }, []);

  return (
    
    <>
      <label htmlFor="search_bar">Find friends</label>
      <input type="text" id="name" onChange={controlInput} />
      <button type="button" id="search_btn" onClick={handleSearch}>Search</button>
      <div className="container-cards">
      {users.length > 0 ? users.map(user => <UserCard key={user.id} user={user} handleAddFriend={handleAddFriend}/>) : ""}
      </div>
    </>
  );
};
