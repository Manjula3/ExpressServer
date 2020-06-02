const express=require("express")
const router=express.Router();



//@route  GET api/auth
//@desc  Get logged in user
//@access  Private
router.get('/',(req,res)=>
{
    res.send('Get logged in user')
})

//@route  POST api/auth
//@desc  AUTH USER AND GET TOKEN
//@access  Public
router.get('/',(req,res)=>
{
    res.send(' logged in user')
})


module.exports=router;