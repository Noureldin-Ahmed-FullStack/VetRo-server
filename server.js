import express from 'express'
import { dbConnection } from './dbConnection.js'
import userRouter from './modules/user/user.routes.js'
import petRouter from './modules/pet/pet.routes.js'
import cors from "cors"
import speciesRouter from './modules/SpeciesIdentifier/SpeciesIdentifier.routes.js'
import postRouter from './modules/post/post.routes.js'
import clinicRouter from './modules/clinic/clinic.routes.js'
import appointmentRouter from './modules/appointment/appointment.routes.js'
import commentRouter from './modules/comment/comment.routes.js'

const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(commentRouter)
app.use(appointmentRouter)
app.use(petRouter)
app.use(speciesRouter)
app.use(postRouter)
app.use(clinicRouter)
app.use((err, req, res, next) => {
  res.json({ error: err })
})
app.get('/', (req, res) => res.send('Hello World!'))
dbConnection()
app.listen(process.env.PORT || port, () => console.log(`Server Running 👾 ¯\_(ツ)_/¯`))