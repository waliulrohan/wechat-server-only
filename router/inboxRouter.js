const express = require("express")

const { searchUser,addConversation,getMessages, sendMessage, getAllConversations} = require('../controllers/inboxControllers');
const { checkLogin } = require("../middlewere/common/checkLogin");
 
const router = express.Router()


// search user 
router.post("/search",searchUser)

// add a conversation  
router.post("/conversation",checkLogin,addConversation)

// get messages of a conversation
router.post("/allMessages", checkLogin, getMessages);

// send message
router.post("/message", checkLogin, sendMessage);

// get all conversations
router.get('/allConversations',getAllConversations)



module.exports = router;