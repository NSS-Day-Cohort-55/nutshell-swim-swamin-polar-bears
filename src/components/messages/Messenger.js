import React, { useState, useEffect } from "react";

export const Messenger = () => {
  const [newMessage, setNewMessage] = useState({
    body: "",
    userId: "",
    currentUserId: "",
  });

  useEffect(() => {}, []);

  return (
    <>
      <p>A Message</p>
    </>
  );
};
