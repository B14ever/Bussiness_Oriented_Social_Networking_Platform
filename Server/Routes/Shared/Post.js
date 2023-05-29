const express = require('express')
const router = express.Router()
    //controlles
const { CreatePost, EditPosts, DeletePosts } = require('../../Controlles/Shared/CreatePosts')
const { GetAllPosts, GetUsersPost } = require('../../Controlles/Shared/GetPosts')
    //routes
router.post('/', CreatePost)
router.post('/editPosts', EditPosts)
router.post('/deletePosts', DeletePosts)
router.get('/', GetAllPosts)
router.get('/:userId', GetUsersPost)
module.exports = router