const ShortUrlModel = require("../models/shortUrl.model")

class ShortenUrlController{
    static async shortenedUrl(res, hashRoute) {
        try {
            const shortedUrl = await ShortUrlModel.findOne({"hash_url": hashRoute})

            if(!shortedUrl){
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.write(JSON.stringify({'error':{'message':'Route Not Found'}}))
                res.end()
                return
            }
    
            res.writeHead(301, {'Location': shortedUrl.long_url})
            res.end()
        } catch (error) {
            if(error) throw error
            res.writeHead(501, {'Content-Type': 'application/json'})
            res.write(JSON.stringify({'error':{"message": 'Failed to shorten url'}}))
            res.end()
        }
    }
}

module.exports = ShortenUrlController