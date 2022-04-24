const mongoose = require('mongoose')

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.jvkl5.mongodb.net/database?retryWrites=true&w=majority`,
        (error) => {
            if(error) throw error

            return console.log('Database successfully connected')
        }
    )
}

module.exports = connectToDatabase