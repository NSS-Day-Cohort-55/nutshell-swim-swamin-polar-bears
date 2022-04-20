const apiURL = 'http://localhost:8088'



export const getArticles = () =>{
    return fetch(`${apiURL}/articles?_expand=user`)
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

export const getArticleById = (articleId) =>{
    return fetch(`${apiURL}/articles/${articleId}`)
        .then(response => response.json())
}

export const updateArticle = (articleObj) =>{
    return fetch(`${apiURL}/articles/${articleObj.id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(articleObj)
    }).then(response => response.json())
}