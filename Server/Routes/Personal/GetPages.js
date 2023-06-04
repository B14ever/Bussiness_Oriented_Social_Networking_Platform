const express = require('express')
const router = express.Router()
    //controlles
const { Getpages, Getpage, Follow, UnFollow, Pages } = require('../../Controlles/Personal/GetCompanies')
    //routes
router.post('/', Getpages)
router.get('/:pagesId', Getpage)
router.post('/follow', Follow)
router.post('/unfollow', UnFollow)
router.post('/myPages', Pages)
module.exports = router