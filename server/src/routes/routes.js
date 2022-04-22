const url = require('url')
const ShortenedUrlController = require('../controllers/ShortenedUrlController')
const ShortenUrlController = require('../controllers/ShortenUrlController')

const routes = (req, res) => {
    const method = req.method
    const urlInfos = url.parse(req.url)

    const route = urlInfos.pathname
    const queryParams = new URLSearchParams(urlInfos.search)

    
    if(method == 'POST'){
        switch (route) {
            case '/shorten': case '/shorten/':
                ShortenUrlController.shortenUrl(res, queryParams); break
            default:
                routeNotFound(res)
        }
    }
            
    if(method == 'GET'){
        const hashRoute = validadeRoute(route)
        const hashValue = hashRoute != ''

        switch (hashValue) {
            case true:
                ShortenedUrlController.shortenedUrl(res, hashRoute); break
            default:
                routeNotFound(res)
        }
    }
}

const routeNotFound = (res) => {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({'error':{'message':'Route Not Found'}}))
    res.end()
}

const validadeRoute = (route) => {
    const pathParams = route.split('/')
    
    if(pathParams.length >= 3){
        return ''
    }

    return pathParams[1]
}


module.exports = { routes, routeNotFound }