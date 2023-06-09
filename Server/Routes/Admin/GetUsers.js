const express = require('express')
const router = express.Router()
    //controlles
const { PageUsers, PageUser } = require('../../Controlles/Admin/Pages')
router.get('/pageusers', PageUsers)
router.get('/page/:pagesId', PageUser)
module.exports = router