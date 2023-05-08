const express = require('express')
const router = express.Router()
    //controlles
const { SignUP } = require('../../Controlles/Personal/Signup')
    //routes
router.post('/', SignUP)
module.exports = router