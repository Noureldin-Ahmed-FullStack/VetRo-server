import mongoose from "mongoose";

const schema = new mongoose.Schema({
    clinicName:{
        type: String,
        trim:true,
        required:true,
        minLength:[2,'name is too short']
    },
    image:String,
    appointmentPrice:{
        type: Number,
        min: 0,
    },
   
    address:String,
    userID:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
    
})
export const clinicModel = mongoose.model("clinic", schema)