const express = require('express')

const { sequelize, User, Message} = require('./models')
const user = require('./models/user')

const app = express()
app.use(express.json())

app.post('/users', async(req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({ name, email, password })

        return  res.json(user);

    } catch (error) {
        console.log(error)

        return  res.status(500).json(error);
        
    }
})

app.get('/users', async(req, res) => {
    try {
        const users = await User.findAll()
        return  res.json(users);
    } catch (error) {
        console.log(error)
        return  res.status(500).json({error: 'Something went wrong'}); 
    }
})

app.get('/users/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    try {
        const users = await User.findOne({
            where: { uuid },
            include: 'messages'
        })
        return  res.json(users);
    } catch (error) {
        console.log(error)
        return  res.status(500).json({error: 'Something went wrong'}); 
    }
})

app.post('/message', async(req, res) => {
    const { userUuid, sender, receiver, message } = req.body
    try {
        const user = await User.findOne({ where: { uuid: userUuid } })

        const messages = await Message.create({ sender, receiver, message, userId: user.id})

        console.log(messages)

        return  res.json(messages);
    } catch (error) {
        console.log(error)
        return  res.status(500).json(error);
        
    }
})

app.get('/message', async(req, res) => {
    try {
        const messages = await Message.findAll({ include: 'user' })

        return  res.json(messages);
    } catch (error) {
        console.log(error)
        return  res.status(500).json(error);
        
    }
})

app.put('/users/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    const { name, email, password } = req.body
    try {

        const users = await User.findOne({ where: { uuid } })

        users.name = name
        users.email = email
        users.password = password

        users.save()

        return  res.json(users);
    } catch (error) {
        console.log(error)
        return  res.status(500).json({error: 'Something went wrong'}); 
    }
})

app.delete('/users/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    try {
        const users = await User.findOne({ where: { uuid } })

        await users.destroy()

        return  res.json({ message: 'User deleted !' });
    } catch (error) {
        console.log(error)
        return  res.status(500).json({error: 'Something went wrong'}); 
    }
})


app.listen({ port: 5000 }, async () => {
    console.log('Server up on post 5000')
    await sequelize.authenticate()
    console.log('Database connected')
})