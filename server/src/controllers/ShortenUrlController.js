const ShortUrlModel = require("../models/shortUrl.model")
const crypto = require('crypto')

class ShortenUrlController{
    static async shortenUrl(res, params) {
        try {
            const longUrl = params.get('url')
            const hash = params.get('hash')
    
            if(!longUrl || !(longUrl.startsWith('http://') || longUrl.startsWith('https://'))){
                res.writeHead(400, {'Content-Type': 'application/json'})
                res.write(JSON.stringify({'error':{"message":"'url' parameter not set correctly"}}))
                res.end()
                return
            }
    
            let newHash
            if(hash){
                let existingHash = await ShortUrlModel.find({"hash_url": hash})
    
                if(existingHash.length != 0){
                    res.writeHead(400, {'Content-Type': 'application/json'})
                    res.write(JSON.stringify({'error':{"message":"Hash already exists"}}))
                    res.end()
                }
    
                newHash = hash
            }
        
            if(!newHash){
                newHash = crypto.randomBytes(7).toString('hex')
            }
    
            await ShortUrlModel.create({
                long_url: longUrl,
                hash_url: newHash,
                clicks_number: 0,
                create_date: Date.now()
            })
    
            const json = {
                short_url: process.env.HOST + newHash,
                qr_code: `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${longUrl}`
            }
    
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(json))
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