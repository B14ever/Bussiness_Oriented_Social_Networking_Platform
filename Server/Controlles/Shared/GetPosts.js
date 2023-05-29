//Models
const Posts = require('../../Models/Post')
const GetAllPosts = async(req, res, next) => {
    try {
        const posts = await Posts.aggregate([{
                $lookup: {
                    from: "personalaccounts",
                    localField: "authorId",
                    foreignField: `_id`,
                    as: "personalAuthor",
                },
            },
            {
                $lookup: {
                    from: "companyaccounts",
                    localField: "authorId",
                    foreignField: `_id`,
                    as: "companyAuthor",
                },
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    photo: 1,
                    comments: 1,
                    Likes: 1,
                    author: {
                        $concatArrays: ["$personalAuthor.FirstName", "$personalAuthor.LastName", "$personalAuthor.profilePhoto", "$companyAuthor"]
                    }
                }
            }
        ]);
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
    }
};

const GetUsersPost = async(req, res, next) => {
    const { userId } = req.params
    const posts = await Posts.find({ authorId: userId })
    return res.status(200).json({ posts })

}

module.exports = { GetAllPosts, GetUsersPost }