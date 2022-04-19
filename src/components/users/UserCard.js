import React from "react";

import { Link } from "react-router-dom";

export const UserCard = ({ user, handleAddFriend }) => {
  return (
    <>
    <label htmlFor="search_bar">Find friends</label>
    <input type="text" id="search_bar"/>
    <button type="button" id="search_btn">Search</button>
    </>
  );
};

{/* <div className="card">
  <div className="card-content">
    <h3>
      Name: <span className="card-username">{user.name}</span>
    </h3>
    <p>Email: {user.email}</p>
    <button type="button" onClick={() => handleAddFriend(user.id)}>
      Add As Friend
    </button>
  </div>
</div> */}