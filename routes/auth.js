const express=require("express")
const router=express.Router();
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const config=require('config')
const auth=require('../middleware/auth')
const User=require('../models/User')


//FOR VALIDATING THE REQ RECEIVED
const { check, validationResult } = require('express-validator');



//@route  GET api/auth
//@desc  Get logged in user
//@access  Private
router.get('/',auth,async (req,res)=>
{
    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json(user) 
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})



//@route  POST api/auth
//@desc  AUTH USER AND GET TOKEN
//@access  Public
router.post('/',
[
    check('email','Please check if the mail is valid').isEmail(),
    check('password','Please enter a password with 6 or more cahracters')
    .exists()
]
,async (req,res)=>
{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }

    const{email,password}=req.body
    try {
       let user=await User.findOne({email}) 

       if(!user)
       {
           return res.status(400).json({msg:'invalid credebtials'})
       }

       const isMatch=await bcrypt.compare(password,user.password)

       if(!isMatch)
       {
           return res.status(400).json({msg:'invalid credentials'})
       }
      

       const payload={
        user:{
            id:user.id
        }
    }

    jwt.sign(payload,config.get('jwtSecret'),{
        expiresIn:360000
    },(err,token)=>{
        if(err) throw err;
        res.json({token})
    })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})


module.exports=router;