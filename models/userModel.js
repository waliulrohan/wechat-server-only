const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
},
  {
    timestamps: true
  }
);

const People = mongoose.model('User', userSchema); // Create a model named 'Chat' based on the chatSchema

module.exports = People; // Export the ChatModel for external use
