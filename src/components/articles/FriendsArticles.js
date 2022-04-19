import React, { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { useNavigate } from "react-router-dom";
import { getMyFriends } from "../modules/FriendManager";
import {
  getArticles,
  deleteArticle,
  getArticleById,
} from "../modules/ArticleManager";
import { Weather } from "../weather/Weather";
import "./ArticleCard.css";

export const SortArticlesByFriends = ({ getLoggedInUser }) => {
  const [friends, setFriends] = useState([]);
  const [articles, setArticles] = useState([]);
  //*getting all of the logged in users friends
  useEffect(() => {
    getMyFriends(getLoggedInUser()).then((myFriends) => setFriends(myFriends));
  }, []);
  //*getting all articles and comparing the poster's userId to the userId of all friends
  
  const getFriendArticles = () => {
    let friendIdArr = [];
    friends.forEach((friend) => {
      friendIdArr.push(friend.userId);
    });
    // friendIdArr.push(getLoggedInUser())
    getArticles().then((allArticles) => {
      setArticles(
        allArticles.filter((article) => {
          return friendIdArr.includes(article.userId);
        })
      );
    });
  };
  useEffect(() => {
    getFriendArticles();
  }, [friends]);

  return (
    <>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          getLoggedInUser={getLoggedInUser}
        />
      ))}
    </>
  );
};
