import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    address : [
        {
            _id : false,
            country : String,
            city : String,
            street : String,
            phone : String
        }
    ],
    image : {
        type : String,
        default : null
    },
    role : {
        type : String,
        enum : ['admin', 'customers'],
        default : 'customers'
    },
    token : {
        type : String,
        default : null
    }
})

export const User = mongoose.model('User', usersSchema)