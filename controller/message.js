const { User,Message } = require('../models')
const socket = require('socket.io')


const users = []

module.exports = (socket) => {

    let interval

    if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => getApiAndEmit(socket), 1000);
      socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
      });

      const getApiAndEmit = socket => {
        const response = new Date();
        // Emitting a new message. Will be consumed by the client
        socket.emit("FromAPI", response);
      };
}

exports.createMessage = async(req, res) => {
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