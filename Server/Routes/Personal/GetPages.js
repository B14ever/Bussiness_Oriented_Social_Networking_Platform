const express = require('express')
const router = express.Router()
    //controlles
const { Getpages, Getpage, Follow, UnFollow } = require('../../Controlles/Personal/GetCompanies')
    //routes
router.post('/', Getpages)
router.get('/:pagesId', Getpage)
router.post('/follow', Follow)
router.post('/unfollow', UnFollow)
module.exports = router