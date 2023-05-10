const express = require('express')
const router = express.Router()
    //controlles
const { UpdateProfile } = require('../../Controlles/Personal/UpdateProfile')
const { ChangePassword } = require('../../Controlles/Shared/ChangePassword')
const { DeleteAccount } = require('../../Controlles/Shared/DeleteAccoun')
    //middle ware
const { verifyToken } = require('../../MIddleWare/Sharde/JWT_Verification')
    //routes
router.post('/', UpdateProfile)
router.post('/ChangePassword', verifyToken, ChangePassword)
router.post('/deleteAccount', verifyToken, DeleteAccount)
module.exports = router