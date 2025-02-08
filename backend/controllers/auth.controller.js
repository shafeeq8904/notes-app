const bcrypt = require('bcrypt');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const User= require('../models/user.modal.js')


exports.createAccount = async (req,res)=>{
    const {fullName,email,password} =req.body;
    if(!fullName || !email || !password){
        return res.status(400).json({message:'Please fill all fields'})
    }

    const isUser = await User.findOne({email:email});

    if(isUser){
        return res.status(400).json({message:'User already exists'})
    }

    const user = await User.create({
        fullName,
        email,
        password:bcrypt.hashSync(password,bcryptSalt)
    })

    const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'36000m'});
    return res.json({accessToken,user, message:'Account created successfully'})

}

exports.login = async(req,res)=>{
    const {email,password}=req.body 
    if(!email || !password){
        return res.status(400).json({message:'Please fill all fields'})
    }
    const userInfo = await User.findOne({email})
    if (!userInfo) {
        return res.status(404).json({ message: 'Email ID not found' }); 
    }
    if(userInfo){
        const passok = bcrypt.compareSync(password,userInfo.password)

        if(passok){
            const user = {user:userInfo}
            const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'36000m'});
            return res.json({accessToken,email, message:'Login successful'})
            
        }
        else{
                return res.status(422).json({ message: 'Password wrong' });
            
        }
    }
    else{
        res.json('email ID not found')
    }
}