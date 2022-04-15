import React, { useState, useEffect } from "react";

export const Messenger = () => {
  const [newMessage, setNewMessage] = useState({
    body: "",
    userId: "",
    currentUserId: "",
  });

  return (
    <>
      <p>A Message</p>
    </>
  );
};
