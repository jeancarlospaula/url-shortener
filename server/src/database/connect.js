const mongoose = require('mongoose')

const connectToDatabase = async () => {
    await mongoose.connect(
        process.env.DB_URI,
        (error) => {
            if(error) throw error

            return console.log('Database successfully connected')
        }
    )
}

module.exports = connectToDatabase