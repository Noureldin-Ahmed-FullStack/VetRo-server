import express from 'express'
import { upload } from '../../src/middleware/FileUpload/uploads.js'
import { getUserHeader } from '../../src/middleware/middleware.js'
import { addComment } from './comment.controller.js'

const commentRouter = express.Router()
// commentRouter.get('/post', getAllPosts)
commentRouter.post('/comment',getUserHeader,addComment)

export default commentRouter