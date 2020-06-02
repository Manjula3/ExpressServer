const express=require("express")
const router=express.Router();



//@route  GET api/contacts
//@desc  Get all user contacts
//@access  Private
router.get('/',(req,res)=>
{
    res.send('Get contacts of the User')
})


//@route  POST api/contacts
//@desc  add New contacts
//@access  Private
router.post('/',(req,res)=>
{
    res.send(' Add contact')
})



//@route  PUT api/contacts/:id
//@desc  Update Contact
//@access  Private
router.post('/:id',(req,res)=>
{
    res.send(' Update contact')
})


//@route  DELETE api/contacts/:id
//@desc  Delete Contact
//@access  Private
router.post('/:id',(req,res)=>
{
    res.send('Delete contact')
})


module.exports=router;