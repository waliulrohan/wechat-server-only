const createError = require("http-errors");


const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

// search  
 async function searchUser(req,res,next) {
    const searchedUser= req.body.searchedUser;

    try{
        if(searchedUser){
        const user = await User.find({email : searchedUser });
        if(user.length > 0){
          res.send(user)
        }else{
          throw createError("search a valid email")
        }
         
    }else{
        throw createError("search something")
    }

    }catch(err){
        res.status(500).json({
            errors: {
              common: {
                msg: err.message,
              },
            },
          });
        
    }

 }

// add conversation 

async function addConversation(req,res,next) {
  try{
    const newConversation = new Conversation({
      creator:{
        id: req.user.id,
        name: req.user.username,
      },
      participant: {
        name: req.body.participant,
        id: req.body.id,

      },
    });

    const result = await newConversation.save();
    res.status(200).json({
      message:"new conversation added successsfully"
    })

  }catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}


// get all conversations

async function getAllConversations(req,res,next) {
  try{
     const users = await Conversation.find();
     res.send(users)
  }catch(err){
    next(err)
  }
}


// get messages
async function getMessages(req,res,next) {
  try{
    const messages = await Message.find({
      conversationId : req.body.conversationId
    })

const {participant} = await Conversation.find({_id:req.body.conversationId})


res.status(200).json({
  data: {
    messages: messages,
    participant
  },
  user: req.user.id,
  conversationId: req.body.conversationId,
});

  }catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg:  err.message,
        },
      },
    });
  }
}


// send message

async function sendMessage(req,res,next) {
if (req.body.message) {
  
  try{
    const newMessage = new Message({
  text: req.body.message,
  sender:{
    id:req.user.id,
    name:req.user.username
  },
  receiver:{
    id:req.body.receiverId,

    name:req.body.receiverName
  },
  conversationId:req.body.conversationId

});


const result = await newMessage.save();

// new-message socket event


global.io.emit("sumit",{
  
message:{
  conversationId:req.body.conversationId,
  sender:{
    id:req.user.id,
    name:req.user.username
  },
  text:req.body.message,
  date_time:result.date_time
}
});



res.status(200).json({
message: "Successful!",
data: result,
});
} catch (err) {
  res.status(500).json({
    errors: {
      common: {
        msg: err.message,
      },
    },
  });
}


}else{
  res.status(500).json({
    errors: {
      common: "message text is required!",
    },
  });
}


}




 module.exports={
    searchUser,
    addConversation,
    getMessages,
    sendMessage,
    getAllConversations
 }