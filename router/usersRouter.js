const express = require("express")

const { addUserValidators, addUserValidationHandlers } = require("../middlewere/users/usersValidators");
const { addUser, removeUser, getUsers } = require("../controllers/usersControllers");
const { checkLogin } = require("../middlewere/common/checkLogin");
 
const router = express.Router()
//get all user
router.get('/allUser',getUsers)

// add user
router.post('/addUser',addUserValidators,addUserValidationHandlers,addUser)

// remove user
router.delete("/:id",removeUser)

module.exports = router;