const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todosController')

// INDEX
router.get('/', todosController.listAllItems)

// NEW

// DELETE
router.delete('/:id', todosController.deleteItem)

// UPDATE
router.put('/:id', todosController.updateItem)

// CREATE
router.post('/', todosController.addItem)

// SHOW
router.get('/:id', todosController.showItem)

module.exports = router



