const User= require('../models/user.modal.js')

exports.getUserInfo = async(req,res) =>{

    const {user} = req.user;
    
    const isUser = await User.findOne({_id:user._id})
    if(!isUser){
        return res.status(404).json({message:'User not found'})
    }

    return res.json({
        user:{
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            createdOn: isUser.createdOn
        },
        message:'User found successfully'
    })

}