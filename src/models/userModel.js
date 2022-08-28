const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
	balance:{
        type:Number,
        default:100}, // Default balance at user registration is 100
	address: String,
	age: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"] // Allowed values are - “male”, “female”, “other”
    },
	isFreeAppUser: {
        type:Boolean,
        default: false

    }
   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users
