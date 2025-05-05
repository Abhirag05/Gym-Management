//importing
const mongoose = require('mongoose');

//connection
mongoose.connect("mongodb+srv://abhiragsv2005:abhiragsv2005@abhirag.dttdww2.mongodb.net/userdetails?retryWrites=true&w=majority&appName=Abhirag")
.then(()=>{
    console.log('connected successful')
})
.catch((err)=>{
    console.log(err)
})