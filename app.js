const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require("morgan")
const cron = require('node-cron')

const fs = require('fs')

const goldRoutes = require("./routes/gold")
const itemRoutes = require("./routes/item")

const item = require("./controllers/item")

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

// database connection
const connect = async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(err))
}

// middlewares
app.use(express.json())

// To allow cross-origin requests
app.use(cors())

// To log requests in terminal
// app.use(morgan("combined"))

// To store request Logs
let accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' })
app.use(morgan("combined", { stream: accessLogStream }))

// routes
app.use('/gold', goldRoutes)
app.use('/item', itemRoutes)

//global error handler
app.use((req, res) => {
    if (req.err) {
        res.status(500).send({ error: req.err })
    }
    else {
        res.status(404).send({ error: "404 no such endpoint not found !" })
    }
})

//currently automating every minute for testing but will be changed to daily when implemented
//change cron expression to '0 0 * * *' for daily automation
cron.schedule('* * * * *', async () => {

    const updated = await item.updatePrices()
    console.log(`Prices of ${updated} item updated`)
    console.log('Daily Price Update Done')

})

app.listen(PORT, async() => {
    await connect()
    console.log(`App listening on port ${PORT}!`)
})

module.exports = { app }
