const ShortUrlModel = require("../models/shortUrl.model")

class ShortenUrlController{
    static async shortenedUrl(res, hashRoute) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        try {
            const shortedUrl = await ShortUrlModel.findOne({"hash_url": hashRoute})

            if(!shortedUrl){
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.write(JSON.stringify({'error':{'message':'Route Not Found'}}))
                res.end()
                return
            }
            
            let { clicks_number } = await ShortUrlModel.findOne({"hash_url": hashRoute}, {"clicks_number":1})
            const shortedUrlUpdated = await ShortUrlModel.findOneAndUpdate({"hash_url": hashRoute}, {"clicks_number":++clicks_number})
    
            res.writeHead(301, {'Location': encodeURI(shortedUrlUpdated.long_url)})
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