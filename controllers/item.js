const axios = require('axios')

const item = require("../models/item")
const gold = require("../models/gold")

// add new item
const createItem = async (req, res) => {
    const { name, weight } = req.body

    if (!name || !weight) {
        res.status(400).send({ message: "Name and weight are required" })
        return
    }

    try {
        const goldPrice = await gold.find()

        const currentPrice = (weight / 10) * goldPrice[0].price_22K
        const all_price = []

        all_price.push({
            date: new Date(),
            price: currentPrice
        })

        const newItem = await item.create({
            name: name,
            price: currentPrice,
            weight: weight,
            all_price: all_price
        })

        const createdItem = {
            id: newItem._id,
            name: newItem.name,
            price: newItem.currentPrice,
            weight: newItem.weight,
            all_price: newItem.all_price
        }

        res.status(201).send(createdItem)
    } catch (error) {
        res.status(400).send({ error })
    }
}

// update prices of all items
const updatedItems = async (req, res) => {
    try {
        const len = await updatePrices()


        res.status(200).send({ message: `${len} items modified` })
    } catch (error) {
        res.status(400).send({ error })
    }
}


// get item prices
const getItem = async (req, res) => {
    const { id, timeRange } = req.query

    // if id is not provided then return all items
    if (!id) {

        try {
            const items = await item.find()
            const result = []
            for (let index = 0; index < items.length; index++) {
                const all_price = items[index].all_price;

                const { bestPrice, bestPriceDate } = await getBestPrice(all_price, timeRange)

                result.push({
                    id: items[index]._id,
                    name: items[index].name,
                    currentPrice: items[index].price,
                    bestPrice: bestPrice,
                    bestPriceDate: bestPriceDate
                })
            }

            res.status(200).send({ result })
        } catch (error) {
            res.status(400).send({ error })
        }
        return
    }

    const currItem = await item.findById(id)

    if (!currItem) {
        res.status(400).send("Item not found")
        return
    }

    try {
        const { bestPrice, bestPriceDate } = await getBestPrice(currItem.all_price, timeRange)
        const result = {
            id: currItem._id,
            name: currItem.name,
            currentPrice: currItem.price,
            bestPrice: bestPrice,
            bestPriceDate: bestPriceDate
        }

        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({ error })
    }
}


const updatePrices = async () => {

    // getting current gold price
    const { data } = await axios.get('http://localhost:3000/gold/price')
    const price = data.price_22K

    try {
        const result = await item.updateMany({}, [
            {
                $set: {
                    price: { $multiply: [{ $divide: ['$weight', 10] }, price] },
                    all_price: {
                        $concatArrays: [
                            '$all_price',
                            [
                                {
                                    date: new Date(),
                                    price: { $multiply: [{ $divide: ['$weight', 10] }, price] }
                                }
                            ]
                        ]
                    }
                }
            }
        ]);

        return result.modifiedCount;

    } catch (error) {
        return error
    }
}

const getBestPrice = async (all_price, range) => {

    // setting default range to 30 days if not provided
    if (!range) {
        range = 30
    }

    const currDate = new Date()
    const timeRange = new Date(currDate.setDate(currDate.getDate() - range))

    // filtering prices according to time range
    const prices = all_price.filter((price) => price.date > timeRange)

    let bestPrice = prices[0].price
    let bestPriceDate = prices[0].date

    for (let index = 1; index < prices.length; index++) {

        // getting best price
        if (prices[index].price < bestPrice) {
            bestPrice = prices[index].price
            let Date = prices[index].date
            bestPriceDate = Date.getDate() + "/" + (Date.getMonth() + 1) + "/" + Date.getFullYear()

        }
    }

    return { bestPrice, bestPriceDate }
}

module.exports = { createItem, getItem, updatedItems, updatePrices } 