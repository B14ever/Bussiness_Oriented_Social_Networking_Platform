//Models
const Posts = require('../../Models/Post')
const GetAllPosts = async(req, res, next) => {
    try {
        const posts = await Posts.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
    }
};

const GetUsersPost = async(req, res, next) => {
    const { userId } = req.params
    const posts = await Posts.find({ authorId: userId }).sort({ createdAt: -1 })
    return res.status(200).json({ posts })

}

module.exports = { GetAllPosts, GetUsersPost }