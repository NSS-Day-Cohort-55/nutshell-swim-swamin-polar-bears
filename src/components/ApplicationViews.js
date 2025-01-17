import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { FriendList } from "./friends/FriendList";
import { TaskList } from "./Tasks/TaskList";
import { TaskDetail } from "./Tasks/TaskDetail";
import { UserList } from "./users/UserList";
import { EventList } from "./events/EventList";
import { PostEvent } from "./events/PostEvent";
import { EventEditForm } from "./events/EventEditForm";
import { ArticleList } from "./articles/ArticleList";
import { SortArticlesByFriends } from "./articles/FriendsArticles";
import { CreateArticle } from "./articles/CreateArticle";
import { MessageList } from "./messages/MessageList";
import { PublicMessenger } from "./messages/PublicMessenger";
import { PrivateMessenger } from "./messages/PrivateMessenger";
import { MessageEditForm } from "./messages/MessageEditForm";
import { ArticleEditForm } from "./articles/ArticleEditForm";
import { CreateTask } from "./Tasks/CreateTaskForm";
import { TaskEditForm } from "./Tasks/TaskEditForm";

export const ApplicationViews = ({
  isAuthenticated,
  setAuthUser,
  getLoggedInUser,
}) => {
  const PrivateOutlet = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>
          <Route
            path="/"
            element={<ArticleList getLoggedInUser={getLoggedInUser} />}
          />
          <Route
            path="/create/"
            element={<CreateArticle getLoggedInUser={getLoggedInUser} />}
          />
          <Route
            path="/:articleId/edit"
            element={<ArticleEditForm getLoggedInUser={getLoggedInUser} />}
          />
          <Route
            path="/onlyfriends"
            element={<SortArticlesByFriends getLoggedInUser={getLoggedInUser}/>}
          />
          <Route
            path="/friends"
            element={<FriendList getLoggedInUser={getLoggedInUser} />}
          />
          <Route
            path="/messages"
            element={<MessageList getLoggedInUser={getLoggedInUser} />}
          />
          <Route
            path="/messages/new"
            element={<PublicMessenger getLoggedInUser={getLoggedInUser} />}
          />
          <Route
            path="/messages/new/:userId"
            element={
              <PrivateMessenger getLoggedInUser={getLoggedInUser} />
            }
          />
          <Route
            path="/messages/edit/:messageId"
            element={
              <MessageEditForm getLoggedInUser={getLoggedInUser} />
            }
          />
          <Route exact path="/tasks" element={<TaskList />} />

          <Route exact path="/tasks/:taskId" element={<TaskDetail />} />

          <Route
            path="/tasks/create"
            element={<CreateTask getLoggedInUser={getLoggedInUser} />}
          />

          <Route
            path="/tasks/:taskId/edit"
            element={<TaskEditForm getLoggedInUser={getLoggedInUser} />}
          />

          <Route
            path="/users"
            element={<UserList getLoggedInUser={getLoggedInUser} />}
          />
          <Route
            path="/events"
            element={<EventList getLoggedInUser={getLoggedInUser} />}
          />
          <Route
            path="/events/:eventId/edit"
            element={<EventEditForm getLoggedInUser={getLoggedInUser} />}
          />
          <Route
            path="/events/create"
            element={<PostEvent getLoggedInUser={getLoggedInUser} />}
          />
        </Route>

        <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
