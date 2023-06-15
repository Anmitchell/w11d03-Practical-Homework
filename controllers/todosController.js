const Item = require('../models/todo')

/*********************/
/*******INDUCES*******/
/*********************/

// INDEX: Show all items in database
exports.listAllItems = async (req, res) => {
    try {
        const foundItems = await Item.find({})
        res.json({items: foundItems})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// NEW: Used for Views

// DELETE: Delete item in list
exports.deleteItem = async (req, res) => {
    try {
        await Item.findOneAndDelete({'_id': req.params.id})
        .then(() => {
            res.json({ message: 'Item deleted'})
        })
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// UPDATE: Update item in list
exports.updateItem = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const item = await Item.findOne({ _id: req.params.id })
        updates.forEach(update => item[update] = req.body[update])
        await item.save()
        res.json({ item })
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// CREATE: Add an item to list
exports.addItem = async (req, res) => {
    try {
        const item = new Item(req.body) // create new instance of Item using the requested data from the URI (req.body)
        await item.save() // save item to database
        res.json({item})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// Edit: Used for Views

// SHOW: Show an item in list
exports.showItem = async (req, res) => {
    try {
        const item = await Item.find({ _id: req.params.id })
        res.json({ item })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}