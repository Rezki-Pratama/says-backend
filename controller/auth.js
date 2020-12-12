const { User} = require('../models')

exports.register =  async(req, res) => {
            const { name, email, password } = req.body
            try {
                const user = await User.create({ name, email, password })
            
                return  res.json(user);
            
            } catch (error) {
                console.log(error)
            
                return  res.status(500).json(error);

            }
        }

exports.getAllUsers =  async(req, res) => {
            try {
                const users = await User.findAll()
                return  res.json(users);
            } catch (error) {
                console.log(error)
                return  res.status(500).json({error: 'Something went wrong'}); 
            }
        }

exports.getOneUsers = async(req, res) => {
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
        }

exports.editUsers =  async(req, res) => {
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
        }
        
exports.deleteUsers = async(req, res) => {
            const uuid = req.params.uuid
            try {
                const users = await User.findOne({ where: { uuid } })
        
                await users.destroy()
        
                return  res.json({ message: 'User deleted !' });
            } catch (error) {
                console.log(error)
                return  res.status(500).json({error: 'Something went wrong'}); 
            }
        }