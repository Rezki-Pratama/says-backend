const { User, Friend } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.addFriend = async (req, res) => {
    const {uuid, status, userId } = req.body

    try {

        const friend = await Friend.create({ status, uuid, userId})
        return  res.json(friend);
    } catch (error) {
        console.log(error)
        return  res.status(500).json(error);
    }
}

exports.getFriend = async (req, res) => {
    const uuid = req.query.uuid
    const name = req.query.name

    try {
        const friend = await Friend.findAll({
        where: {
            uuid: uuid, 
            }, 
        include: {
            model: User,
            as: 'user',
            where: {
                name: {
                    [Op.like]: `%${name}%`
                  }
            }
        }
        })
        return  res.json(friend);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

exports.searchFriend = async (req, res) => {
    const name = req.query.name

    try {
        const friend = await User.findAll({ 
        where: {
            name: {
                [Op.like]: `%${name}%`
              }
            } 
        })

        return  res.json(friend);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}
  