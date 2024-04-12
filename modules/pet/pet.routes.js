import express from 'express'
import { upload } from '../../src/middleware/FileUpload/uploads.js'
import { GetSinglePet, addPet, getAllpets, updatePet, updatepetCover } from './pet.controller.js'
import { getUserHeader,checkForImgMiddleWare } from '../../src/middleware/middleware.js'

const petRouter = express.Router()

petRouter.get('/pet', getAllpets)
petRouter.post('/pet',getUserHeader, upload.single('file'),checkForImgMiddleWare,addPet)
petRouter.get('/pet/:id', GetSinglePet)
petRouter.put('/petUpload/:id', upload.single('file'), updatepetCover)
petRouter.put('/pet/:id', upload.single('file'),checkForImgMiddleWare, updatePet)
// petRouter.delete('/pet/:id', deletepet)
petRouter.post('/petImageUpdate/:id', upload.single('file'), updatepetCover)
 


export default petRouter