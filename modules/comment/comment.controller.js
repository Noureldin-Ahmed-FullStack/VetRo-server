
import slugify from "slugify"
import { catchError } from "../../src/middleware/catchError.js"

import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { commentModel } from "../../Models/comment.model.js";
import { postModel } from "../../Models/post.model.js";





const addComment = catchError(async (req, res) => {
    req.body.createdBy = req.user.uid
    const comment = await commentModel.create(req.body)
    await postModel.findByIdAndUpdate(req.body.post,
        { $push: { comments: comment.id } },
        { new: true } // Return the updated document after update
    );
    res.json({ message: "success" })
})
const updateComment = catchError(async (req, res, next) => {
    let post = await postModel.findByIdAndUpdate(req.params.id, req.body)
    if (!post) {
        return res.status(404).json({ message: "post doesnt exist" })
    }
    res.json({ message: "post updated" })
})
const deleteComment = catchError(async (req, res, next) => {
    let post = await postModel.findByIdAndDelete(req.params.id)
    if (!post) {
        return res.status(404).json({ message: "post doesnt exist" })
    }
    res.json({ message: "deleted" })

})




export {
    addComment,
    updateComment,
    deleteComment,
}