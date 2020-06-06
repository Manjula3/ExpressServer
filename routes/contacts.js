const express=require("express")
const router=express.Router();
const User=require('../models/User')
const auth=require('../middleware/auth')
const Contact=require('../models/Contact')


//FOR VALIDATING THE REQ RECEIVED
const { check, validationResult } = require('express-validator');




//@route  GET api/contacts
//@desc  Get all user contacts
//@access  Private
router.get('/',auth,async (req,res)=>
{
    try {
        const contacts=await Contact.find({user:req.user.id}).sort({date:-1});
        res.json(contacts)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})




//@route  POST api/contacts
//@desc  add New contacts
//@access  Private
router.post('/',
[
    auth,
    [
check('name',' Name is required').not().isEmpty(),
check('birthDate',"birthDate is required").not().isEmpty()
    ]],async (req,res)=>
{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }

    const {name,birthDate,phone,type}=req.body;
    try {
       const newContact=new Contact({
           name,
           birthDate,
           phone,
           type,
           user:req.user.id
       }) 

       const contact=await newContact.save();
       res.json(contact)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})




//@route  PUT api/contacts/:id
//@desc  Update Contact
//@access  Private
router.post('/:id',auth,async (req,res)=>
{
    const {name,birthDate,phone,type}=req.body;

    //build contact object
    const contactFields={};
    if(name) contactFields.name=name;
    if(birthDate) contactFields.birthDate=birthDate;
    if(phone) contactFields.phone=phone;
    if(type) contactFields.type=type;


    try {
        let contact= await Contact.findById(req.params.id);
        if(!contacts) return res.status(404).json({msg:'Contact not found'})


        //make sure user owns the contact
        if(contact.user.toString() !== req.user.id)
        {
              return res.status(401).json({msg:'not authorised'})
        }

        contact=await Contact.findByIdAndUpdate(req.params.id,{
            $set:contactFields
        },
        {new:true})

        res.json(contact)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})




//@route  DELETE api/contacts/:id
//@desc  Delete Contact
//@access  Private
router.post('/:id',auth,async (req,res)=>
{
    try {
        let contact= await Contact.findById(req.params.id);
        if(!contacts) return res.status(404).json({msg:'Contact not found'})


        //make sure user owns the contact
        if(contact.user.toString() !== req.user.id)
        {
              return res.status(401).json({msg:'not authorised'})
        }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({msg:'Contact Removed'})

        res.json(contact)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})


module.exports=router;