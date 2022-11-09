const feedDisplay = document.querySelector('#feed')




fetch('http://localhost:8000/')
    .then(response => {return response.json()})
    .then(data => {
        console.log(data)
        data.forEach(article => {
            // const articleItem = `<div><li><h3>` + article.title + `</h3><p>`+ article.url + `</p></li></ol></div>`
            const articleItem = 
            `<h3>` + article.count +"). " + article.title + `</h3>
            <p> <a href="`+ article.url+`">`+ article.url +`</a></p>`
            
            feedDisplay.insertAdjacentHTML('beforeend', articleItem)
        })
    })
    .catch(err => console.log(err))