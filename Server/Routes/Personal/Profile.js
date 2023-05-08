const express = require('express')
const router = express.Router()
    //controlles
const { PersonalAccountUserInfo } = require('../../Controlles/Personal/Profile')
    //routes
router.get('/', PersonalAccountUserInfo)
module.exports = router