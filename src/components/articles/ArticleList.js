import react, { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { useNavigate } from "react-router-dom";
import { getArticles, deleteArticle } from "../modules/ArticleManager";
import { Weather } from "../weather/Weather";

export const ArticleList = ({ getLoggedInUser }) => {
  const navigate = useNavigate();
  const [articles, updateArticles] = useState([]);

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
        <button
          type="button"
          onClick={() => {
            navigate("/create/");
          }}
        >
          Add new article
        </button>
      </section>
      <div>
        <Weather />
        <section className="articles_card_container">
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
