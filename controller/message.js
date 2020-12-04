const { User,Message } = require('../models')
const socket = require('socket.io')


module.exports = (socket, io, users) => {

      socket.on('disconnect', (data) => {
        console.log('User disconnect', data)
      })

      socket.on('user_connected', (username) => {
          
        users[username] = socket.id
        //socked id will be used to send message to individual person
       
        //notify all connected clients
        io.emit('user_connected', username)
      })

      socket.on('send_message', (data) => {

        let sockedId = users[data.receiver]
        
        io.to(sockedId).emit('new_message', data)

        io.emit('new_message', data)

        //Save in database
        //cause req, res not available in socket.io, just do it like this
        const user = async () => {
          return await User.findOne({ where: { uuid: data.uuid } })
        }

        user().then(user => {
          Message.create({ 
            sender: data.sender, 
            receiver: data.receiver, 
            message: data.message, 
            userId: user.id 
          })
        }) 
        
      })

      
}

exports.getMessage = async(req, res) => {
            try {
                const messages = await Message.findAll({ include: 'user' })
            
                return  res.json(messages);
            } catch (error) {
                console.log(error)
                return  res.status(500).json(error);

            }
        }