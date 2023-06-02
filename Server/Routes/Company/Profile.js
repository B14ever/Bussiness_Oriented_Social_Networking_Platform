const express = require('express')
const router = express.Router()
    //controlles
const { AddPhoto } = require('../../Controlles/Company/AddPhoto')
    //routes
router.post('/changePhoto', AddPhoto)
module.exports = router