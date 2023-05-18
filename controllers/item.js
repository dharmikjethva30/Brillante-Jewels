const item = require("../models/item")
const gold = require("../models/gold")



const createItem = async(req,res) =>{
    const{name , weight} = req.body

    const goldPrice = await gold.find()

    const currentPrice =  (weight/10) * goldPrice[0].price_22K

    const all_price = []

    all_price.push({
        date : new Date(),
        price : currentPrice
    })

    const newItem = await item.create({
        name : name,
        price : currentPrice,
        weight : weight,
        all_price : all_price
    })

    res.status(200).send(newItem)
}

const getItem = async(req,res) =>{
    const {id} = req.query
    if(!id){
        const items = await item.find()
        res.status(400).send(items)
        return
    }
    const currItem = await item.findById(id)

    if(!currItem){
        res.status(400).send("Item not found")
        return
    }

    const {bestPrice, bestPriceDate} = await getBestPrice(currItem.all_price)


    res.status(200).send({bestPrice,bestPriceDate })

}

const getBestPrice = async(all_price) =>{
    //get best price in last 30 days
    const currDate = new Date()
    const last30Days = new Date(currDate.setDate(currDate.getDate() - 30))

    const prices = all_price.filter((price) => price.date > last30Days)

    let bestPrice = prices[0].price
    let bestPriceDate = prices[0].date

    for (let index = 1; index < prices.length; index++) {
        if(prices[index].price < bestPrice){
            bestPrice = prices[index].price
            bestPriceDate = prices[index].date
        }
    }

    return {bestPrice, bestPriceDate}
}

module.exports = {createItem,getItem} 