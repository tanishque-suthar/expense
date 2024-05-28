const loginSchema = require('../model/loginModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginFunc = async(req,res,next)=>{
    try {
        const { username, password } = req.body;
        if(!username || !password ){
          return res.json({message:'All fields are required'})
        }
        const user = await loginSchema.findOne({ username });
        if(!user){
          return res.json({message:'Incorrect username' }) 
        }
        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
          return res.json({message:'Incorrect password' }) 
        }
         const token = createSecretToken(user._id);
         res.cookie("token", token, {
           withCredentials: true,
           httpOnly: false,
         });
         res.status(201).json({ message: "User logged in successfully", success: true });
         next()
      } catch (error) {
        console.error(error);
    }
}

exports.signupFunc = async(req,res,next)=>{
    try {
        const { username, password} = req.body;
        const existingUser = await loginSchema.findOne({ username });
        if (existingUser) {
          return res.json({ message: "User already exists" });
        }
        const user = await loginSchema.create({ username, password });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res
          .status(201)
          .json({ token:token, message: "User signed in successfully", success: true, user });
        next();
      } catch (error) {
        console.error(error);
      }
}

createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {expiresIn: 3 * 24 * 60 * 60,});
};

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false, message:"Access denied, token not entered" })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false, message:"Access denied, token not valid" });
    } 
    else {
      req.data = data;
      const user = await loginSchema.findById(data.id)
      if (user) {
        console.log(data, user._id, user.username);
        next();
      }
      else return res.json({ status: false })
    }
  })
  }