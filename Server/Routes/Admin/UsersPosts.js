const express = require('express')
const router = express.Router()
    //controlles\
const { GetAllPosts, GetPostsWithReport, DeletePosts } = require('../../Controlles/Admin/Post')
router.get('/', GetAllPosts)
router.get('/report', GetPostsWithReport)
router.post('/delete', DeletePosts)
module.exports = router