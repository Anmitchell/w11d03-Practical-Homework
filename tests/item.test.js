const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Testing on port ${PORT}`)
})

//const todo = require('../models/todo')
const Todo = require('../models/todo')
let mongoServer

// sets up MongoMemoryServer for creating a local database
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

// after server for MongoMemoryServer is done upload database to mongodb database
afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test todos endpoints', () => {

    test('Add a new item to todo list', async () => {
        const response = await request(app)
        .post('/todos')
        .send({
            title: 'Clean Bathroom',
            description: 'Scrub Toilet',
            complete: false,
            created_at: "2023-06-13"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.item.title).toEqual('Clean Bathroom')
        expect(response.body.item.description).toEqual('Scrub Toilet')
        expect(response.body.item.complete).toEqual(false)
        expect(response.body.item.created_at).toBe('2023-06-13')
    })

    test('Return a list of all todos', async () => {
        const response = await request(app).get('/todos')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('items')
    })

    test('Return a todo', async () => {
        const todo = new Todo({
            title: 'Organize living room',
            description: 'Put away electronics',
            complete: true,
            created_at: "2023-06-15"
        })

        const response = await request(app).get(`/todos/${todo.id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('item')
    })

    test('Delete a todo', async () => {
        const todo = new Todo({
            title: 'Clean Bathroom',
            description: 'Scrub Toilet',
            complete: false,
            created_at: "2023-06-13"
        })

        await todo.save()
        const response = await request(app)
            .delete(`/todos/${todo._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Item deleted')
    })

    test('Update a todo in the list', async () => {
        const todo = new Todo({
            title: 'Clean Bathroom',
            description: 'Scrub Toilet',
            complete: false,
            created_at: "2023-06-13"
        })

        await todo.save()
        const response = await request(app)
            .put(`/todos/${todo._id}`)
            .send({
                title: 'Clean Kitchen',
                description: 'Scrub Counter-top',
                complete: false,
                created_at: "2023-06-14"
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.item.title).toEqual('Clean Kitchen')
        expect(response.body.item.description).toEqual('Scrub Counter-top')
        expect(response.body.item.complete).toEqual(false)
        expect(response.body.item.created_at).toBe('2023-06-14')
    })
})


