// ./models/user.model.js

const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: {
        type : String,
        unique : true,
        required : true
    },
    password: {
        type: String,
        required: true
    },
    image_url:String
})

mongoose.model('User',userSchema)
