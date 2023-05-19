const gold = require("../models/gold")

const getPrice = async (req, res) => {
    const price = await updatePrice()

    res.status(200).send({
        price_22K: price.price_22K,
        price_24K: price.price_24K
    })
}

const updatePrice = async () => {
    const price_24K = Math.floor(Math.random() * (80000 - 35000 + 1)) + 35000

    // 22K price is 22/24 of 24K price
    const price_22K = Math.floor(price_24K * (22 / 24))

    const goldPrice = await gold.findById(process.env.GOLD_ID)

    goldPrice.price_22K = price_22K
    goldPrice.price_24K = price_24K

    const updated = await goldPrice.save()

    return updated
}

module.exports = { getPrice, updatePrice }