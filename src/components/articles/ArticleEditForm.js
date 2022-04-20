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
        <div className="new_article_display">
            <div className="new_article">
            <div className="header_div">
                        <h2>Edit Article</h2>
                    </div>
                <form>
                    <fieldset className="new_article_field">
                        <label htmlFor="article_name"className="label">Article Title</label>
                        <input type="text" id="title" onChange={handleChanges} required autoFocus className="controlled_form" placeholder="Article title"value={article.title} />
                    </fieldset>
                    <fieldset className="new_article_field">
                    <label htmlFor="article_synopsis" className="label">Article Synopsis</label>
                        <input type="text" id="synopsis" onChange={handleChanges} required autoFocus className="controlled_form" placeholder="Article synopsis" value={article.synopsis} />
                    </fieldset>
                    <fieldset className="new_article_field">
                    <label htmlFor="article_url" className="label">Article URL</label>
                        <input type="text" id="url" onChange={handleChanges} required autoFocus className="controlled_form" placeholder="Article url" value={article.url} />
                    </fieldset>
                    <fieldset className="new_article_field">
                        <label htmlFor="timestamp" className="label"></label>
                        <input type="date" id="timestamp" onChange={handleChanges} required autoFocus className="controlled_form" value={article.timestamp} />
                    </fieldset>
                    <div className="button_container">
                    <button type="button" id="article_edit_submit_btn" className="submit_btn" onClick={handleUpdateArticle}>Submit</button>
                    <button type="button" id="article_edit_Cancel_btn" className="submit_btn" onClick={()=> navigate("/")}>Cancel</button>
                    </div>


                </form>
            </div>
        </div>
    )
}