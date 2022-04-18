import react, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ArticleCard.css"




export const ArticleCard= ({article, handleDeleteArticle, getLoggedInUser}) =>{

    const user = getLoggedInUser()

    return(
        <section className="article_section">
        <h3>{article.title}</h3>
        <div>
            <p>{article.synopsis}</p>
            <a href={article.url} target="_blank">Read article</a>
        </div>
        
        {user === article.userId? <button type="button" onClick={() => handleDeleteArticle(article.id)}>Delete</button> : ""}
        {user === article.userId? <Link to={`/${article.id}/edit`}><button type="button">Edit</button></Link> : ""}
    </section>

    )

}