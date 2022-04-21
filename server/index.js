const http = require('http')
const { routes } = require('./src/routes/routes')
const connectToDatabase = require('./src/database/connect')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3000

connectToDatabase()

const server = http.createServer((req, res)=>{routes(req, res)})

server.listen(port, () => {console.log(`Server Active on PORT: ${port}`)})

