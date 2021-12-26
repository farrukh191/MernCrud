const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Fname:{
        type:String,
        require:true
    },
    Lname:{
        type:String,
        require:true
    },
    Phone:{
        type:String,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
})

const createSchema = mongoose.model('userSchema', userSchema);
module.exports = createSchema;