const mongoose = require('mongoose')

const goldSchema = new mongoose.Schema({
    price_22K : {
        type: Number,
        required: true
    },
    price_24K : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('goldPrice', goldSchema)