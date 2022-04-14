import react, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {addArticles} from "../modules/ArticleManager"

export const CreateArticle = () =>{

    const [articles, setArticles] = useState({})

    const navigate = useNavigate()

    const controlInput = (event) =>{
        const newArticle = {...articles}
        let selectedTarget = event.target.value

        if(event.target.id.includes("Id")){
            selectedTarget = parseInt(selectedTarget)
        }
        newArticle[event.target.id] = selectedTarget
        setArticles(newArticle)
    }

    useEffect(()=>{

    },[])

    const saveArticle = (event) =>{
        event.preventDefault()
        addArticles(articles)
            .then(()=> navigate("/"))

    }


    return (
        <form>
            <h2>New Article</h2>
            <fieldset>
                <label htmlFor="article_name">Article Title</label>
                <input type="text" id="title" onChange={controlInput} required autoFocus className="controlled_form" placeholder="Article title"value={articles.title} />
            </fieldset>
            <fieldset>
            <label htmlFor="article_synopsis">Article Synopsis</label>
                <input type="text" id="synopsis" onChange={controlInput} required autoFocus className="controlled_form" placeholder="Article synopsis" value={articles.synopsis} />
            </fieldset>
            <fieldset>
            <label htmlFor="article_url">Article URL</label>
                <input type="text" id="url" onChange={controlInput} required autoFocus className="controlled_form" placeholder="Article url" value={articles.url} />
            </fieldset>
            <fieldset>
            <label htmlFor="article_date">Article Title</label>
                <input type="date" id="timestamp" onChange={controlInput} required autoFocus className="controlled_form" value={articles.timestamp} />
            </fieldset>
            <button type="button" id="article_submit_btn" className="submit_btn" onClick={saveArticle}>Submit</button>

        </form>

    )
}