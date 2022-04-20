import react, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ArticleCard.css"




export const ArticleCard = ({ article, handleDeleteArticle, getLoggedInUser }) => {

    const user = getLoggedInUser();

    return (

        <section className="article_section">
            <div className="article_card">
                <div className="article_title">
                <a href={article.url} target="_blank"><h3>{article.title}</h3></a>
                </div>
                <div className="article_body">
                    <h4>Posted By: {article.user?.name}</h4>
                    <p>{article.synopsis}</p>
                    {/* <a href={article.url} target="_blank">Read article</a> */}
                </div>
                <div className="link_icon"></div>
                <div className="article_btn_container">
                    {user === article.userId ? <Link to={`/${article.id}/edit`}><button type="button" id="article_edit_button">Edit</button></Link> : ""}
                    {user === article.userId ? <button type="button" id="article_delete_button"onClick={() => handleDeleteArticle(article.id)}>Delete</button> : ""}
                </div>
            </div>
        </section>

    )

}