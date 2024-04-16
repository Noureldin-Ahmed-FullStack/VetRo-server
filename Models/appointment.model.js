import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    issue: {
        type: String,
        required: [true,'you need to submit your issue']
    },
    coverImage: {
        type: String
    },
    images: [{
        type: String
    }],
    Status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clinic',
        required: [true,'clinic is required']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true,'doctor is required']
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pet',
        required: [true,'pet is required']
    },
    bookedTime: {
        type: String,
        required: [true,'appointment time is required']
    },
    phoneNumber: {
        type: String,
    }
}, { timestamps: true });
export const appointmentModel = mongoose.model("appointment", appointmentSchema)