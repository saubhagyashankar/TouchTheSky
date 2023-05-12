const mongoose = require('mongoose');


const Users = mongoose.Schema({
    userName: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
    },
    email: {
        type: 'string',
    },
    role: {
        type: 'string'
    }
})


module.exports = mongoose.model("Users", Users)