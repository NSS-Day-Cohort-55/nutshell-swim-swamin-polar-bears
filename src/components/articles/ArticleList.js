import react, {useState, useEffect} from "react";
import { ArticleCard } from "./ArticleCard";
import { useNavigate } from "react-router-dom";
import { getArticles} from "../modules/ArticleManager"

export const ArticleList = () =>{

    const navigate = useNavigate()
    const [articles, updateArticles] = useState([])

    const getAllArticles = () =>{
        return getArticles()
            .then(article => updateArticles(article))
    }

    useEffect(()=>{
        getAllArticles()
    }, [])

    return (
        <>
            <section className="articles_content">
                <button type="button" onClick={()=> {navigate("/create/")}}>Add new article</button>
            </section>
            <div className="articles_card_container">
                {articles.map(article => <ArticleCard key={article.id} article={article}/>)}
            </div>

        </>


    )

}