const mongoose = require('mongoose')

const shortUrlSchema = new mongoose.Schema({
    long_url:{
        type: String,
        required: true
    },
    hash_url:{
        type: String,
        required: true
    },
    clicks_number:{
        type: Number,
        required: true
    },
    create_date:{
        type: Date,
        required: true
    }
})

const ShortUrlModel = mongoose.model('ShortUrl', shortUrlSchema)

module.exports = ShortUrlModel