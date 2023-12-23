const bcrypt = require("bcrypt");

const User = require('../models/userModel')

// add user
async function addUser(req, res) {
    try {

  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

  
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
  
  
      const result = await newUser.save();
 
  
      res.status(200).json({
        message: 'User was added successfully',
      });
    } catch (err) {
      console.error('Error Adding User:', err);
      res.status(500).json({
        errors: {
          common: {
            message:"adding user failed"
          },
        },
      });
    }
  }


// remove user
async function removeUser(req,res,next) {
  try{
    const user = await User.findByIdAndDelete({_id: req.params.id})
   res.status(200).json({
    message:"User is removed "
   })
  }catch(err){
    res.status(500).json({
      errors: {
        common: {
          message:"couldn't remove user"
        },
      },
    });
  }
  
}

// get all user
async function getUsers(req,res,next) {
  try{
 
     const users = await User.find();
     res.send(users)
  }catch(err){
    next(err)
  }
}


  

module.exports ={
    addUser,
    removeUser,
    getUsers

}