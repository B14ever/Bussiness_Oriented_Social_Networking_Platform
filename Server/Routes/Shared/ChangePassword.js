const express = require('express')
const router = express.Router()
    //controlles
const { ChangePassword } = require('../../Controlles/Shared/ChangePassword')
    //middle ware
const { verifyToken } = require('../../MIddleWare/Sharde/JWT_Verification')
    //routes
router.post('/', verifyToken, ChangePassword)
module.exports = router