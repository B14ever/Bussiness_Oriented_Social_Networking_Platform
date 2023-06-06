const express = require('express')
const router = express.Router()
    //controlles
const { CreatePost, EditPosts, DeletePosts, Like, Unlike, ReportPosts } = require('../../Controlles/Shared/Post')
const { GetAllPosts, GetUsersPost } = require('../../Controlles/Shared/GetPosts')
    //routes
router.post('/', CreatePost)
router.post('/editPosts/:postId', EditPosts)
router.post('/likePosts/:postID', Like)
router.post('/unlikePosts/:postID', Unlike)
router.post('/report/:postID', ReportPosts)
router.post('/deletePosts', DeletePosts)
router.get('/', GetAllPosts)
router.get('/:userId', GetUsersPost)
module.exports = router