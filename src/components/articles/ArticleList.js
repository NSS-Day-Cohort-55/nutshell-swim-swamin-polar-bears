import react, { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { useNavigate } from "react-router-dom";
import { getMyFriends } from "../modules/FriendManager";
import { getArticles, deleteArticle, getArticleById } from "../modules/ArticleManager";
import { Weather } from "../weather/Weather";
import "./ArticleCard.css"

export const ArticleList = ({ getLoggedInUser }) => {
  const navigate = useNavigate();
  const [articles, updateArticles] = useState([]);
  const [friendArticles, updateFriendArticles] = useState([])
  const [friends, setFriends] = useState([])

  const sortArticlesByFriends = (userId) => {
    //*getting all of the logged in users friends
    getMyFriends(userId).then(myFriends => (setFriends(myFriends)
    ))


    return (
      <>


        {friendArticles.map((article) => (<ArticleCard
          key={article.id}
          article={article}
          handleDeleteArticle={handleDeleteArticle}
          getLoggedInUser={getLoggedInUser}
        />))}

      </>
    )
  }



  const getAllArticles = () => {
    return getArticles().then((article) => {
      article
        .sort((a, b) => {
          return new Date(a.timestamp) - new Date(b.timestamp);
        })
        .then(updateArticles(article));
    });
  };

  const handleDeleteArticle = (articleObj) => {
    deleteArticle(articleObj).then(() => getAllArticles());
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <>
      <section className="articles_content">
      </section>
      <div className="articles_flex">
        <Weather />
        <section className="articles_card_container">
          <button
            type="button"
            className="btn_article"
            onClick={() => {
              navigate("/create/");
            }}
          >
            Add new article
          </button>
          <button type="button" className="btn_article_sort" onClick={() => { navigate("/onlyfriends") }}>Friend's Articles</button>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              handleDeleteArticle={handleDeleteArticle}
              getLoggedInUser={getLoggedInUser}
            />
          ))}
        </section>
      </div>
    </>
  );
};