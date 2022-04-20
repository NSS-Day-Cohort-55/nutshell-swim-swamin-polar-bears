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
  const navigate = useNavigate()
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
    <section className="articles_content">
    </section>
    <div className="articles_flex">
      <Weather />
      <section className="articles_card_container">
      <div className="list_btn_container">
      <button type="button" className="btn_article" onClick={() => {navigate("/create/");}} id="new_article_btn">Add new article</button>
      <button type="button" className="btn_article" onClick={() => {navigate("/")}} id="friend_article_btn">All Articles</button>
      </div>
      {articles.map((article) => (
  <ArticleCard
    key={article.id}
    article={article}
    getLoggedInUser={getLoggedInUser}
  />
))}
      </section>
    </div>
  </>
  );
};


