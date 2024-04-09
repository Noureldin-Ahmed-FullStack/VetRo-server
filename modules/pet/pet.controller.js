
import slugify from "slugify"
import { catchError } from "../../src/middleware/catchError.js"
import { petModel } from "../../Models/Pet.model.js"
import { userModel } from "../../Models/user.model.js"

import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';





const addPet= catchError(async (req, res) => {
    const pet = await petModel.create(req.body)
    await userModel.findByIdAndUpdate(
        req.user.uid,
        { $push: { pets: pet.id } },
        { new: true } // Return the updated document after update
      );
    res.json({ message: "success" })
})
const getAllpets = catchError(async (req, res) => {
    const pets = await petModel.find()
    res.json(pets)
})
const GetSinglePet= catchError(async (req, res, next) => {
    const pet = await petModel.findById(req.params.id)
    if (!pet) {
        return res.json({ message: "Petdoesnt exist" })
    }
    res.json(pet)
})
const updatePet= catchError(async (req, res, next) => {
    let pet =  await petModel.findByIdAndUpdate(req.params.id, req.body)
    if (!pet) {
        return res.status(404).json({message:"Petdoesnt exist"})
    }
    res.json({message:"Petupdated"})
})
const deletePet= catchError(async (req, res, next) => {
    let pet =  await petModel.findByIdAndDelete(req.params.id)
    if (!pet) {
        return res.status(404).json({message:"Petdoesnt exist"})
    }
    res.json({message:"deleted"})

})

const updatepetCover = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) { 
            console.log(result); 
            await petModel.findByIdAndUpdate(req.params.id, { image: result.secure_url })

        });
    res.json("success " + req.file);
})


export {
    addPet,
    getAllpets,
    GetSinglePet,
    updatePet,
    deletePet,
    updatepetCover
}