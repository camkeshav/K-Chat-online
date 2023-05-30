const express = require("express")
const connectDB = require("./config/db")
const env = require("dotenv")
const colors = require('colors')

const { notFound } = require('./Middleware/errorHandler')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express()
env.config()
connectDB()
app.use(express.json())
const PORT = process.env.PORT || 5000

// app.get('/', (req, res) => {
//     res.send("app started successfully at port")
// })


app.use(cors())
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use(notFound)

app.listen(PORT, console.log(`Server started successfully at port ${PORT}`.yellow.bold))