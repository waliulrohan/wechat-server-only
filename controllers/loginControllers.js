  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const createError = require('http-errors')

const User = require('../models/userModel')

// login
  async function login(req ,res ,next) {
    try{

        const user = await User.findOne({email:req.body.email});
        if (user) {
            const isValidPassword = await bcrypt.compare(req.body.password , user.password);
            if(isValidPassword){
                const userObject ={
                    id: user._id,
                    username: user.name,
                    email: user.email
                }
              const token= jwt.sign(userObject,process.env.JWT_SECRET,{
                expiresIn: process.env.EXPIRY
              })
                
              res.send({...userObject,token});
              
            }else{
                    throw createError('login failed!! Please try again')
            }
        }else{
            throw createError('login failed!! Please try again')
        }
    }catch(err){

        res.status(500).json({
            errors:{
                common:{
                    message:  "login failed"
                }
            }
        })
    }
  }


//  logout

function logout(req,res,next) {
  res.clearCookie(process.env.COOKIE_NAME)
  res.send("user logged out")
}




  module.exports = {
    login,
    logout,
  }