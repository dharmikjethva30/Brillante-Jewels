const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true
    },
    weight : {
        type: Number,
        required : true
    },
    all_price : {
        type : [
            {
                date : {
                    type : Date,
                    required : true
                },
                price : {
                    type : Number,
                    required : true
                }
            }
        ]
    }
})


module.exports = mongoose.model('item', itemSchema)