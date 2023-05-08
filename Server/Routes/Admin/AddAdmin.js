const express = require('express')
const router = express.Router()
    //controlles
const { AddAdmin } = require('../../Controlles/Admin/SignUP')
const { EmailVerification } = require('../../Controlles/Shared/EmailVerification')
const { RequestCode } = require('../../Controlles/Shared/RequestCode')
    //routes
router.post('/', AddAdmin)
router.post('/Verification', EmailVerification)
router.post('/Verification/RequestCode', RequestCode)
module.exports = router