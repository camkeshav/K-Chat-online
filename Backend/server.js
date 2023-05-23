const express = require("express")
const connectDB = require("./config/db")
const env = require("dotenv")
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')

const app = express()
env.config()
connectDB()
app.use(express.json())
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("app started successfully at port")
})

app.use('/api/user', userRoutes)

app.listen(PORT, console.log(`Server started successfully at port ${PORT}`.yellow.bold))