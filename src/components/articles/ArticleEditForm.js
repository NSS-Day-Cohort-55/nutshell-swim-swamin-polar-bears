import react, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, updateArticle } from "../modules/ArticleManager";
import "./ArticleForm.css"


export const ArticleEditForm = ({getLoggedInUser}) =>{

    const[article, setArticle] = useState({})
    const user = parseInt(getLoggedInUser())

    const navigate = useNavigate()
    const{articleId} = useParams()

    const handleChanges = (event) =>{
        const editedArticle = {...article}

        editedArticle[event.target.id] = event.target.value
        setArticle(editedArticle)
    }

    const handleUpdateArticle = (event) =>{
        event.preventDefault()

        updateArticle(article)
        .then(() => navigate("/"))

    }

    useEffect(()=>{
        getArticleById(articleId)
            .then(article =>{
                setArticle(article)
            })
    }, [])





    return (
        <form>
            <h2>Edit Article</h2>
            <fieldset>
                <label htmlFor="article_name">Article Title</label>
                <input type="text" id="title" onChange={handleChanges} required autoFocus className="controlled_form" placeholder="Article title"value={article.title} />
            </fieldset>
            <fieldset>
            <label htmlFor="article_synopsis">Article Synopsis</label>
                <input type="text" id="synopsis" onChange={handleChanges} required autoFocus className="controlled_form" placeholder="Article synopsis" value={article.synopsis} />
            </fieldset>
            <fieldset>
            <label htmlFor="article_url">Article URL</label>
                <input type="text" id="url" onChange={handleChanges} required autoFocus className="controlled_form" placeholder="Article url" value={article.url} />
            </fieldset>
            <fieldset>
                <label htmlFor="timestamp"></label>
                <input type="date" id="timestamp" onChange={handleChanges} required autoFocus className="controlled_form" value={article.timestamp} />
            </fieldset>
            <button type="button" id="article_edit_submit_btn" className="submit_btn" onClick={handleUpdateArticle}>Submit</button>
            <button type="button" id="article_edit_Cancel_btn" className="submit_btn" onClick={() => navigate("/")}>Cancel</button>

        </form>
    )
}