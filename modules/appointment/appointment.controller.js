
import slugify from "slugify"
import { catchError } from "../../src/middleware/catchError.js"

import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { appointmentModel } from "../../Models/appointment.model.js";





const addAppointment = catchError(async (req, res) => {
    req.body.createdBy = req.user.uid
    const post = await appointmentModel.create(req.body)
    res.json({ message: "success" })
})
const getAppointmentOfDoctor = catchError(async (req, res) => {
    const doctor = req.user.uid
    const appointment = await appointmentModel.find({ doctor: doctor }).populate({
        path: 'createdBy',
        select: '-password' // Exclude the 'password' field
    }).populate({
        path: 'doctor',
        select: '-password' // Exclude the 'password' field
    }).populate({
        path: 'pet',
    }).populate({
        path: 'clinic',
    })
    res.json(appointment)
})
const getAppointmentOfUser = catchError(async (req, res) => {
    const user = req.params.id
    const appointment = await appointmentModel.find({ createdBy: req.params.id }).populate({
        path: 'createdBy',
        select: '-password' // Exclude the 'password' field
    }).populate({
        path: 'doctor',
        select: '-password' // Exclude the 'password' field
    }).populate({
        path: 'pet',
    }).populate({
        path: 'clinic',
    })
    res.json(appointment)
})
const getAllAppointments = catchError(async (req, res) => {
    const appointment = await appointmentModel.find().populate({
        path: 'createdBy',
        select: '-password' // Exclude the 'password' field
    }).populate({
        path: 'doctor',
        select: '-password' // Exclude the 'password' field
    }).populate({
        path: 'pet',
    }).populate({
        path: 'clinic',
    })
    res.json(appointment)
})

const updateAppointment = catchError(async (req, res, next) => {
    let appointment = await appointmentModel.findByIdAndUpdate(req.params.id, req.body)
    if (!appointment) {
        return res.status(404).json({ message: "appointment doesnt exist" })
    }
    res.json({ message: "appointment updated" })
})
const deleteAppointment = catchError(async (req, res, next) => {
    let appointment = await appointmentModel.findByIdAndDelete(req.params.id)
    if (!appointment) {
        return res.status(404).json({ message: "appointment doesnt exist" })
    }
    res.json({ message: "deleted" })

})


// const updatePostImages = catchError(async (req, res) => {
//     cloudinary.config({
//         cloud_name: 'dqijwldax',
//         api_key: '764827226872981',
//         api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
//     });
//     const imageUrls = [];
//     try {
//         // Loop through uploaded files and upload them to Cloudinary
//         for (const file of req.files) {
//             const result = await cloudinary.uploader.upload(file.path);
//             imageUrls.push(result.secure_url);
//         }

//         // All files uploaded, send response with image URLs
//         await appointmentModel.findByIdAndUpdate(req.params.id, { images: imageUrls })
//         res.status(200).json({ imageUrls });
//     } catch (error) {
//         console.error('Error uploading files to Cloudinary:', error);
//         res.status(500).json({ error: 'Error uploading files to Cloudinary' });
//     }
// });



export {
    addAppointment,
    getAppointmentOfDoctor,
    getAllAppointments,
    updateAppointment,
    deleteAppointment,
    getAppointmentOfUser
}