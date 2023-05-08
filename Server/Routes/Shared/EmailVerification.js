const express = require('express')
const router = express.Router()
    //controlles
const { EmailVerification } = require('../../Controlles/Shared/EmailVerification')
const { RequestCode } = require('../../Controlles/Shared/RequestCode')
const { verifyToken } = require('../../MIddleWare/Sharde/JWT_Verification')
    //routes
router.post('/', verifyToken, EmailVerification)
router.post('/RequestCode', verifyToken, RequestCode)
module.exports = router