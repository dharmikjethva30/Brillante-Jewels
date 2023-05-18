const mongoose = require('mongoose')
const gold = require("../models/gold")
const item = require("../models/item")

const setPrice = async () => {

    const price_24K = Math.floor(Math.random() * (80000 - 35000 + 1)) + 35000
    const price_22K = Math.floor(price_24K * (22 / 24))

    const goldPrice = await gold.findById("6465b81448aba4b7394542d1")

    goldPrice.price_22K = price_22K
    goldPrice.price_24K = price_24K

    const updated = await goldPrice.save()

    console.log("price updated");

    return updated
}

const updatePrices = async (price) => {
    const items = await item.find()

    for (let index = 0; index < items.length; index++) {
        const id = items[index]._id

        const currItem = await item.findById(id)

        const newPrice = (currItem.weight / 10) * price

        currItem.price = newPrice;

        currItem.all_price.push({
            date: new Date(),
            price: newPrice
        })

        const updated = await currItem.save()
        console.log(updated);
    }

    return "Done"
}

module.exports = { setPrice, updatePrices }