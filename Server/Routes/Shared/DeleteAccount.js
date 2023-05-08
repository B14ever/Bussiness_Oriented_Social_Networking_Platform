const express = require('express')
const router = express.Router()
    //controlles
const { DeleteAccount } = require('../../Controlles/Shared/DeleteAccoun')
    //middle ware
const { verifyToken } = require('../../MIddleWare/Sharde/JWT_Verification')
    //routes
router.post('/', verifyToken, DeleteAccount)
module.exports = router