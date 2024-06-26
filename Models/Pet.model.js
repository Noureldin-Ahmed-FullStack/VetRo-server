import mongoose from "mongoose";

const schema = new mongoose.Schema({
    petName:{
        type: String,
        trim:true,
        required:true,
        minLength:[2,'name is too short']
    },
    image:String,
    age:{
        type:Number,
        min: 0,
        max: 100
    },
    gender:String,
    breed:String,
    type:String,
    userID:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
    
})
export const petModel = mongoose.model("pet", schema)