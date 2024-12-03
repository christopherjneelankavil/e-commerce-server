const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validator: {
            validate: (value) => {
                const result = /[a-z0-9\._%+\!\$&\*\=\^\|\~#%'`\?\{\}\/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
                return result.test(value);
            },
            message: "Invalid Email Address"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validator: {
            validate: (value) => {
                return value.length >= 8;
            },
            message: "Password must be at least 8 characters long"
        }
    },
    state: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    locality: {
        type: String,
        default: "",
    },
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
