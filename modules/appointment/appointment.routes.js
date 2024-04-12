import express from 'express'
import { upload } from '../../src/middleware/FileUpload/uploads.js'
import { getUserHeader } from '../../src/middleware/middleware.js'
import { addAppointment, deleteAppointment, getAllAppointments, getAppointmentOfDoctor, updateAppointment } from './appointment.controller.js'

const appointmentRouter = express.Router()
appointmentRouter.get('/appointment', getAllAppointments)
appointmentRouter.get('/doctorAppointment',getUserHeader, getAppointmentOfDoctor)
appointmentRouter.post('/appointment',getUserHeader,addAppointment)
appointmentRouter.put('/appointment/:id', updateAppointment)
appointmentRouter.delete('/appointment/:id', deleteAppointment)


export default appointmentRouter