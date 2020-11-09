const { string } = require("joi")
const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    sender_id: {
        type: String,
        require: true,
    },
    reciever_id: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    
})

module.exports = mongoose.model("Message", MessageSchema)