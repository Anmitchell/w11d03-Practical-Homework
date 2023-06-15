const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    complete: { type: Boolean, default: false},
    created_at: { type: String, default: Date.now}
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo

