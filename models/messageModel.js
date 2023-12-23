const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    sender: {
      id: mongoose.Types.ObjectId,
      name: String,

    },
    receiver: {
      id: mongoose.Types.ObjectId,
      name: String,

    },
    date_time: {
      type: Date,
      default: Date.now,
    },
    conversationId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;