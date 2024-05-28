const loginSchema = require('../model/loginModel');
const jwt = require('jsonwebtoken');
const expenseSchema = require("../model/expenseModel")

exports.addExpense = async(req,res)=>{
    console.log("test");
    console.log(req.body);
    const {title,amount,date,category,paymentMethod} = req.body;
    const user = req.data.id;
    // const token = req.cookies.token;
    // var user = "";
    // jwt.verify(token, process.env.TOKEN_KEY, async (err, data) =>{
    //     const usertemp = await loginSchema.findById(data.id);
    //     user = usertemp._id;
    // })
    const expense = expenseSchema({
        user,
        title,
        amount,
        category,
        paymentMethod,
        date
    })

    try {
        if(!title || !amount || !category || !paymentMethod || !date){
            return res.status(400).json({message:"Fill all the fields"});
        }
        else if(amount<=0 && !amount==='number'){
            return res.status(400).json({message:"Amount must be a positive number greater than zero"});
        }
        await expense.save();
        res.status(200).json({message:"Expense addition successful!"});
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
    console.log(expense);
}

exports.getExpenses = async(req,res)=>{
    try {
        // const token = req.cookies.token;
        // var user = "";
        // jwt.verify(token, process.env.TOKEN_KEY, async (err, data) =>{
        //     const usertemp = await loginSchema.findById(data.id);
        //     user = usertemp._id;
        // })
        // console.log(user);
        // const expenses = await expenseSchema.find({ user: user });
        const expenses = await expenseSchema.find({ user: req.data.id });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}

exports.deleteExpense = async(req,res)=>{
    const {id} = req.params;
    expenseSchema.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({message:"Expense deleted successfully"});
    })
    .catch((error)=>{
        res.status(500).json({message:"Server error"});
    })
}