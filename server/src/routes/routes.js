const url = require('url')
const ShortenUrlController = require('../controllers/ShortenUrlController')

const routes = (req, res) => {
    const method = req.method
    const urlInfos = url.parse(req.url)

    const rote = urlInfos.pathname
    const queryParams = new URLSearchParams(urlInfos.search)
    
    if(method == 'POST'){
        switch (rote) {
            case '/shorten':
                ShortenUrlController.shortenUrl(res, queryParams); break
            default:
                roteNotFound(res)
        }
    }
}

const roteNotFound = (res) => {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({'error':{'message':'Route Not Found'}}))
    res.end()
}


module.exports = { routes }