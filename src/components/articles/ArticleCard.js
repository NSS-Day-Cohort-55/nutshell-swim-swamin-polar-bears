import react, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ArticleCard.css"




export const ArticleCard = ({ article, handleDeleteArticle, getLoggedInUser }) => {

    const user = getLoggedInUser()

    return (

        <section className="article_section">
            <div className="article_card">
                <div className="article_title">
                <h3>{article.title}</h3>
                </div>
                <div className="article_body">
                    <p>Synopsis: {article.synopsis}</p>
                    <a href={article.url} target="_blank">Read article</a>
                </div>
                <div className="btn_container">
                    {user === article.userId ? <button type="button" id="delete_button"onClick={() => handleDeleteArticle(article.id)}>Delete</button> : ""}

                    {user === article.userId ? <Link to={`/${article.id}/edit`}><button type="button" id="edit_button">Edit</button></Link> : ""}
                </div>
            </div>
        </section>

    )

}