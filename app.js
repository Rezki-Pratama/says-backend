const express = require('express')

const { sequelize, User, Message} = require('./models')
const user = require('./models/user')

const app = express()
app.use(express.json())

let routes = require('./routes/routes')
routes(app)

app.listen({ port: 5000 }, async () => {
    console.log('Server up on post 5000')
    await sequelize.authenticate()
    console.log('Database connected')
})