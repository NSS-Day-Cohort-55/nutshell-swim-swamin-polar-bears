import react, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";




export const ArticleCard= ({article, handleDeleteArticle}) =>{
    return(
        <section className="article_section">
        <h3>{article.title}</h3>
        <div>
            <p>{article.synopsis}</p>
            <a href={article.url} target="_blank">Read article</a>
        </div>
        <button type="button" onClick={() => handleDeleteArticle(article.id)}>Delete</button>
    </section>

    )

}