const express = require('express')
const router = express.Router()
    //controlles
const { SignUP } = require('../../Controlles/Company/SignUp')
    //routes
router.post('/', SignUP)
module.exports = router