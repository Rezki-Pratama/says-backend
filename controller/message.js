const { User,Message } = require('../models')

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