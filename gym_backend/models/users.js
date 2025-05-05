const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      // Add these new fields for profile
      age: {
        type: Number,
        default: 25
      },
      weight: {
        type: Number,
        default: 70
      },
      height: {
        type: Number,
        default: 170
      },
      avatar: {
        data: Buffer,  // Binary data of the image
        contentType: String  // Mime type of the image
    },
      joinDate: {
        type: Date,
        default: Date.now
      }
})

const UserModel=mongoose.model("user",UserSchema)
module.exports=UserModel