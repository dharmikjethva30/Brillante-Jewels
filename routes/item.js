const express = require('express');
const router = express.Router();

const {createItem ,getItem, updatedItems } = require("../controllers/item")

router.get('/price', getItem)
router.get('/update', updatedItems)
router.post('/add', createItem)

module.exports = router;

