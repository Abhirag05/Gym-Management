const mongoose=require('mongoose')

const ContactSchema=new mongoose.Schema({
    fullname:String,
    email:String,
    phonenumber:String,
    message:String,
    
})

const ContactModel=mongoose.model("contact",ContactSchema)
module.exports=ContactModel