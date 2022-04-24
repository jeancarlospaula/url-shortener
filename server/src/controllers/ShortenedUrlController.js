const ShortUrlModel = require("../models/shortUrl.model")

class ShortenUrlController{
    static async shortenedUrl(res, hashRoute) {
        try {
            let { clicks_number } = await ShortUrlModel.findOne({"hash_url": hashRoute}, {"clicks_number":1})
            const shortedUrl = await ShortUrlModel.findOneAndUpdate({"hash_url": hashRoute}, {"clicks_number":++clicks_number})

            if(!shortedUrl){
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.write(JSON.stringify({'error':{'message':'Route Not Found'}}))
                res.end()
                return
            }
    
            res.writeHead(301, {'Location': encodeURI(shortedUrl.long_url)})
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