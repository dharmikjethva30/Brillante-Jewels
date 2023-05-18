const express = require('express')

const {getPrice} = require("../controllers/gold")

const router = express.Router()

router.get('/price', getPrice)

module.exports = router
