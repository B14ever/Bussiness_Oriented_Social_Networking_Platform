//Models
const Posts = require('../../Models/Post')
const CreatePost = async(req, res, next) => {
    const { authorId, content, photo } = req.body
    try {
        const createPost = await Posts.create({ authorId, content, photo })
        if (!createPost) {
            const error = new Error('Post Not Created');
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ msg: 'Post Created' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const EditPosts = async(req, res, next) => {
    const { postId, content, photo } = req.body
    try {
        const PostEdited = await Posts.updateOne({ _id: postId }, { $set: { content: content, photo: photo } })
        if (!PostEdited) {
            const error = new Error('Post Not Edited');
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ msg: 'Post Edited' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const DeletePosts = async(req, res, next) => {
    const { postId } = req.body
    try {
        const DeletePosts = await Posts.deleteOne({ _id: postId })
        if (!DeletePosts) {
            const error = new Error('Post Not Deleted');
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ msg: 'Post Deleted' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { CreatePost, EditPosts, DeletePosts }