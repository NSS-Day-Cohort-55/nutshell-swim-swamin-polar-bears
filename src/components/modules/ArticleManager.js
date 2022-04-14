const apiURL = 'http://localhost:8088'



export const getArticles = () =>{
    return fetch(`${apiURL}/articles/`)
        .then(response => response.json())
}

export const addArticles = (articleObj) =>{
    return fetch(`${apiURL}/articles/`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(articleObj)
    }).then(response => response.json())
}

export const deleteArticle = (articleId) =>{
    return fetch(`${apiURL}/articles/${articleId}`,{
        method: "DELETE"
    }).then(response => response.json())
}