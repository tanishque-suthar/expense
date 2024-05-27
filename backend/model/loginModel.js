const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

loginSchema.pre('save',async function(){
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("Credentials", loginSchema);