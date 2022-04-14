import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { FriendList } from "./Friends/FriendList";
import { TaskList } from "./Tasks/TaskList";
import { TaskDetail } from "./Tasks/TaskDetail";

export const ApplicationViews = ({ isAuthenticated, setAuthUser, getLoggedInUser }) => {
  const PrivateOutlet = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>
          <Route
            path="/friends"
            element={<FriendList getLoggedInUser={getLoggedInUser} />}
          />
          <Route path="/messages" element={""} />
          <Route exact path="/tasks" element={

            <TaskList />

          } />
          <Route exact path="/tasks/:taskId" element={

            <TaskDetail />

          } />
          <Route path="/events" element={""} />
        </Route>

        <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
