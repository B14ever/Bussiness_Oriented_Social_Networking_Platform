//Models
const Posts = require('../../Models/Post')
const CreatePost = async(req, res, next) => {
    const { authorName, authorId, authorPhoto, authorType, content, photo } = req.body.data
    try {
        const createPost = await Posts.create({ authorName, authorId, authorPhoto, authorType, content, photo })
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
    const { content, photo } = req.body.data
    const { postId } = req.params
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
const Like = async(req, res, next) => {
    const id = req.body.id
    const { postID } = req.params

    try {
        const LikePost = await Posts.updateOne({ _id: postID }, { $push: { like: id } })
        if (!LikePost) {
            const error = new Error('Post Not liked');
            error.status = 403;
            throw error;
        } else {
            const posts = await Posts.find({}).sort({ createdAt: -1 });
            return res.status(200).json({ posts });
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const Unlike = async(req, res, next) => {
    const id = req.body.id
    const { postID } = req.params
    try {
        const unLikePost = await Posts.updateOne({ _id: postID }, { $pull: { like: id } })
        if (!unLikePost) {
            const error = new Error('Post Not unliked');
            error.status = 403;
            throw error;
        } else {
            const posts = await Posts.find({}).sort({ createdAt: -1 });
            return res.status(200).json({ posts });
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
const ReportPosts = async(req, res, next) => {
    const { report } = req.body
    const { postID } = req.params
    try {
        const reportPost = await Posts.updateOne({ _id: postID }, { $push: { report: report } })
        if (!reportPost) {
            const error = new Error('Report not succfull');
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ msg: 'Report succfull' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { CreatePost, EditPosts, DeletePosts, Like, Unlike, ReportPosts }