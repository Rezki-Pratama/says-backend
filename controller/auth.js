const { User,Token } = require('../models')
const bcrypt = require('bcrypt')
const config = require('../helper/generate')
const jwt = require('jsonwebtoken')
const ip = require('ip');

exports.register =  async(req, res) => {
            const { name, email, password, role } = req.body
            let salt = bcrypt.genSaltSync(10)
            encriptPassword = bcrypt.hashSync(password, salt)
            console.log(encriptPassword)
            try {
                const user = await User.create({
                     name : name, 
                     email: email, 
                     password: encriptPassword, 
                     role: role 
                })
            
                return  res.json(user);
            
            } catch (error) {
                console.log(error)
            
                return  res.status(500).json(error);

            }
        }

exports.login = async(req, res) => {
    const { email, password } = req.body
    try {

        const user = await User.findOne({
            where: { email }
        })

        if(user) {
            console.log('from body'+password)
            bcrypt.compare(password, user.password, async (err, hash) => {
                if(hash) {
                    let data = user.dataValues
                    let token = jwt.sign({data}, config.secret,{
                        expiresIn: 1440
                    })

                    const createToken = await Token.create({
                        access_token : token, 
                        email: email, 
                        ip_address: ip.address(), 
                        userId: user.id 
                   })

                   return  res.json({
                       success: true,
                       message: "Generate token success !",
                       token: token,
                       uuid: user.uuid,
                       user: user.name,
                   });
                } else {
                    res.json({
                        error: true,
                        message: "Password anda Salah !"
                    }); 
                }
            })
        } else {
             res.json({
                 error: true,
                 message: "Email anda tidak terdaftar !"
             });
        }

        // console.log(user.dataValues)

    } catch (error) {
        return res.status(500).json(error);
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