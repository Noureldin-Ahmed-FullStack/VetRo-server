import express from 'express'
import { upload } from '../../src/middleware/FileUpload/uploads.js'
import { getAllClinics, addClinic, GetSingleClinic, updateClinicCover, updateClinic, checkForImgMiddleWare, } from './clinic.controller.js'
import { getUserHeader } from '../../src/middleware/middleware.js'

const clinicRouter = express.Router()

clinicRouter.get('/clinic', getAllClinics)
clinicRouter.post('/clinic',getUserHeader, upload.single('file'),checkForImgMiddleWare,addClinic)
clinicRouter.get('/clinic/:id', GetSingleClinic)
clinicRouter.put('/clinicUpload/:id', upload.single('file'), updateClinicCover)
clinicRouter.put('/clinic/:id', upload.single('file'),checkForImgMiddleWare, updateClinic)
// clinicRouter.delete('/clinic/:id', deleteclinic)
clinicRouter.post('/clinicImageUpdate/:id', upload.single('file'), updateClinicCover)
 


export default clinicRouter