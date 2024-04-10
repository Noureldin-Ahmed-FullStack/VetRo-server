import express from 'express'
import {checkEmailExist, getUserHeader } from '../../src/middleware/middleware.js'
import { ContactMe, GetSingleUser, GetSingleUserRes, Validate, addtoWishlist, getAllUsers, setUserRole, signIn, signUp, updateUser, updateUserPic } from './user.controller.js'
import { hashPass, validateShema } from '../../src/middleware/hashPassword.js'
import { upload } from '../../src/middleware/FileUpload/uploads.js'

const userRouter = express.Router()

userRouter.post('/signUp',validateShema, checkEmailExist,hashPass,signUp)
userRouter.post('/signIn', signIn)
userRouter.post('/userRole',getUserHeader, setUserRole)
userRouter.post('/ContactMe', ContactMe)
userRouter.get('/users', getAllUsers)
userRouter.get('/getSingleUser/:id', GetSingleUserRes)
userRouter.get('/usersValidation/:id', Validate)
userRouter.post('/addToWishlist', addtoWishlist)
 
// userRouter.post('/upload/:id',GetSingleUser, upload.single('file'), updateUserPic)
userRouter.post('/upload/:id',GetSingleUser, upload.single('file'), updateUserPic)
userRouter.put('/user/:id',GetSingleUser, upload.single('file'), updateUser)


export default userRouter