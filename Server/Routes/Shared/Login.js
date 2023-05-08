const express = require('express')
const router = express.Router()
    //Controless
const { Login } = require('../../Controlles/Shared/Login')
const { ForgetPassword } = require('../../Controlles/Shared/ForgetPassword')
const { EmailVerification } = require('../../Controlles/Shared/EmailVerification')
const { RecoverPassword } = require('../../Controlles/Shared/RecoverPassword')
    //middle ware
const { verifyToken } = require('../../MIddleWare/Sharde/JWT_Verification')
router.post('/', Login)
router.post('/forgotenPassword', ForgetPassword)
router.post('/forgotenPassword/EmailVerrification', EmailVerification)
router.post('/forgotenPassword/newPassword', verifyToken, RecoverPassword)
module.exports = router