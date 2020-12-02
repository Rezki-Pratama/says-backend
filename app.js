const express = require('express')

const { sequelize, User, Message} = require('./models')
const user = require('./models/user')
const socket = require('socket.io')

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
});

let routes = require('./routes/routes')
routes(app)

const server = app.listen({ port: 5000 }, async () => {
    console.log('Server up on post 5000')
    await sequelize.authenticate()
    console.log('Database connected')
})

const io = socket(server)

io.on('connection', (socket)=>{
    console.log('User connected', socket.id)

    require('./controller/message')(socket)

})