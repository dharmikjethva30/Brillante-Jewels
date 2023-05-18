const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require("morgan")
const cron = require('node-cron')
// const fs = require('fs')

const automate = require("./controllers/automate")
const item = require("./controllers/item")


dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

// To store Logs
// let accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' })
// app.use(morgan("combined", { stream: accessLogStream }))

const connect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(err))
}

// middlewares
app.use(express.json())
app.use(cors())

app.use(morgan("combined"))

app.get('/', item.getItem)
app.post('/', item.createItem)


//currently automating every minute for testing but will be changed to daily when implemented
cron.schedule('* * * * *', async() => {
    const price = await automate.setPrice()
    console.log(price)
    const len = await automate.updatePrices(price.price_22K)
    console.log('running a task every minute');
})


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
    connect()
})