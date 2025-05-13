import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: function() {
            return !this.email; // Required only if email is not provided
        }
    },
      email: {
        type: String,
        required: function() {
            return !this.phone; // Required only if phone is not provided
        }
    },
    joined:{
        type:Date,
    },
    blocked:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    }
})

const userModel=mongoose.model("users",userSchema)
export default userModel