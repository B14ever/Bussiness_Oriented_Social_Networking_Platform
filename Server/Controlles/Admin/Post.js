//Models
const Posts = require('../../Models/Post')
const PersonalAccount = require('../../Models/PersonalAccount')
const CompanyAccount = require('../../Models/CompanyAccount')
const GetAllPosts = async(req, res, next) => {
    try {
        const posts = await Posts.find({ report: { $eq: [] } }).sort({ createdAt: -1 });
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
    }
};
const GetPostsWithReport = async(req, res, next) => {
    try {
        const posts = await Posts.find({ "report": { $exists: true, $not: { $size: 0 } } }).sort({ createdAt: -1 });
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
    }
};
const DeletePosts = async(req, res, next) => {
    const { _id, authorId, authorType, content } = req.body
    let sendNotffication;
    const nottification = `${content.slice(0,30)}....Your post has received too many reports of violating our community guidelines. We have reviewed your post and found that it does violate our guidelines. As a result, we have deleted your post and it is no longer available to the public`
    if (authorType === 'personal') {
        sendNotffication = PersonalAccount.updateOne({ _id: authorId }, { $push: { nottification: nottification } }).exec()
    }
    if (authorType === 'company') {
        sendNotffication = CompanyAccount.updateOne({ _id: authorId }, { $push: { nottification: nottification } }).exec()
    }
    const DeletePosts = Posts.deleteOne({ _id: _id })
    try {

        const Action = await Promise.all([DeletePosts, sendNotffication])
        if (!Action) {
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
module.exports = { GetAllPosts, GetPostsWithReport, DeletePosts }