const User = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports.signUp = async (req, res)=>{
    const {username, password} = req.body
    const hashPassword = await bcrypt.hash(password,12)
    try {
        const hashPassword = await bcrypt.hash(password,12)
        const newUser = await User.create({
            username: username,
            password: hashPassword
        });
        req.session.user = newUser
        res.status(201).json({
            status: 'success',
            data:{
                user: newUser
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail'
        })
    }
}

module.exports.login = async (req, res)=>{
    const {username, password} = req.body
    try {
        const user = await User.findOne({username});
        if(!user){
            res.status(400).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if(isCorrect){
            req.session.user = user
            res.status(201).json({
                status: 'success',
                data:{
                    user
                }
            });
        }else{
            res.status(400).json({
                status: 'fail',
                message: 'Username/password incorrect'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            status: 'fail'
        })
    }
}