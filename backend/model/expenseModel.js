const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
        trim:true
    },
    date:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type: String,
        required:true,
        trim:true
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})
module.exports = mongoose.model("Expense",expenseSchema);