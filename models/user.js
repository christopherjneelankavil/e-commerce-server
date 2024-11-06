const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validator:{
            validate:(value)=>{
                const result = /[a-z0-9\._%+\!\$&\*\=\^\|\~#%'`\?\{\}\/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/
                return result.test(value);
            },
            message: "Invalid Email Address"
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validator:{
            validate:(value)=>{
                return value.length >=8;
            },
            message : "Password must be atleast 8 characters long"
        }
    },
    state:{
        type:String,
        default:"",
    },
    city:{
        type:String,
        default:"",
    },
    locality:{
        type:String,
        default:"",
    },
});

const User = mongoose.model('User',userSchema);

module.exports = User;