import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers, getMyFriends,
  addFriend,
  existingFriendShipCheck, findUser
} from "../modules/FriendManager";
import { UserCard } from "./UserCard";
import "./UserCard.css"

export const UserList = ({ getLoggedInUser }) => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([])
  const [userSearch, foundUser] = useState({
    name: ""
  })

  const navigate = useNavigate()

  const getUsers = () => {
    return getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
    });
  };
  
  const getAllMyFriends = (userId) => {
    getMyFriends(userId).then(myFriends => {
      
      setFriends(myFriends)
      // console.log(friends)
    })
  }

  useEffect(() => {
    getAllMyFriends(getLoggedInUser());
  }, []);

  const findUsers = (userName) =>{
    findUser(userName).then(user =>{
      setUsers(user)
      console.log(user)
    })
  }
  const handleAddFriend = (id) => {
    //*doing the same thing I did in Articles. Creating an array of friend Id's
    let friendIdArr = [];
    friends.forEach((friend) => {
      friendIdArr.push(friend.userId)
    })
    console.log(friendIdArr)
    const newFriend = {
      userId: id,
      currentUserId: getLoggedInUser(),
    };
    if (newFriend.userId !== newFriend.currentUserId && newFriend.userId !== friendIdArr.find(element => element === newFriend.userId)) {
      
        addFriend(newFriend)
      .then(() => navigate("/friends/"));
      
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
    <div className="search_bar">
      <label htmlFor="search_bar">Find friends</label>
      <input type="text" id="name" onChange={controlInput} />
      <button type="button" id="search_btn" onClick={handleSearch}>Search</button>
    </div>
      <div className="container-cards">
      {users.length > 0 ? users.map(user => <UserCard key={user.id} user={user} handleAddFriend={handleAddFriend}/>) : ""}
      </div>
    </>
  );
};
