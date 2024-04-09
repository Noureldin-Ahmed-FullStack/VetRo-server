
import slugify from "slugify"
import { catchError } from "../../src/middleware/catchError.js"
import { clinicModel } from "../../Models/clinic.model.js"

import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { userModel } from "../../Models/user.model.js";





const addClinic = catchError(async (req, res) => {
    const clinic = await clinicModel.create(req.body)
    await userModel.findByIdAndUpdate(
        req.user.uid,
        { $push: { clinics: clinic.id } },
        { new: true } // Return the updated document after update
      );
    res.json({ message: "success" })
})
const getAllClinics = catchError(async (req, res) => {
    const clinics = await clinicModel.find()
    res.json(clinics)
})
const GetSingleClinic= catchError(async (req, res, next) => {
    const clinic = await clinicModel.findById(req.params.id)
    if (!clinic) {
        return res.json({ message: "clinic doesnt exist" })
    }
    res.json(clinic)
})
const updateClinic= catchError(async (req, res, next) => {
    let clinic =  await clinicModel.findByIdAndUpdate(req.params.id, req.body)
    if (!clinic) {
        return res.status(404).json({message:"clinic doesnt exist"})
    }
    res.json({message:"clinicupdated"})
})
const deleteClinic= catchError(async (req, res, next) => {
    let clinic =  await clinicModel.findByIdAndDelete(req.params.id)
    if (!clinic) {
        return res.status(404).json({message:"clinic doesnt exist"})
    }
    res.json({message:"deleted"})

})

const updateClinicCover = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) { 
            console.log(result); 
            await clinicModel.findByIdAndUpdate(req.params.id, { image: result.secure_url })

        });
    res.json("success " + req.file);
})


export {
    addClinic,
    getAllClinics,
    GetSingleClinic,
    updateClinic,
    deleteClinic,
    updateClinicCover
}