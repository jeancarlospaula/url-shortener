const ShortUrlModel = require("../models/shortUrl.model")
const crypto = require('crypto')

class ShortenUrlController{
    static async shortenUrl(res, params) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');

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
                    return
                }
    
                newHash = hash
            }
        
            if(!newHash){
                newHash = await ShortenUrlController.generateHash()
            }
    
            await ShortUrlModel.create({
                long_url: longUrl,
                hash_url: newHash,
                clicks_number: 0,
                create_date: Date.now()
            })
    
            const json = {
                shortened_url: process.env.HOST + newHash,
                qr_code_url: `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${process.env.HOST + newHash}`
            }
    
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(json))
            res.end()
        } catch (error) {
            if(error) throw error
            res.writeHead(501, {'Content-Type': 'application/json'})
            res.write(JSON.stringify({'error':{"message": 'Failed to shorten url'}}))
            res.end()
            return
        }
    }

    static async generateHash(){
        let newHash
        let hashDisponible = false
        while(!hashDisponible){
            newHash = crypto.randomBytes(7).toString('hex')
            const dbHash = await ShortUrlModel.find({"hash_url": newHash})

            if(dbHash.length == 0){
                hashDisponible = true
            }
        }
        return newHash
    }
}

module.exports = ShortenUrlController