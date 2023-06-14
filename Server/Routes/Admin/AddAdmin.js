const express = require('express')
const router = express.Router()
    //controlles
const { AddAdmin } = require('../../Controlles/Admin/AddAdmin')
    //routes
router.post('/', AddAdmin)
module.exports = router