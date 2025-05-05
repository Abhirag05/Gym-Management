const mongoose=require('mongoose')

const AdmissionSchema=new mongoose.Schema({
    fullname:String,
    email:String,
    phonenumber:String,
    fitnessgoal:String,
    selectedplan: String,
    payment: {
        method: {
            type: String,
            enum: ['online', 'offline'],
            default: 'online'
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'completed'
        },
    },

    createdAt: {  // Add this new field
        type: Date,
        default: Date.now  // This will automatically set the current date when a new admission is created
    }
})

const AdmissionModel=mongoose.model("admission",AdmissionSchema)
module.exports=AdmissionModel