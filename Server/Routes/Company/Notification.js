const express = require('express')
const router = express.Router()
    //controlles
const { nottification } = require('../../Controlles/Company/Nottification')
    //routes
router.get('/:id', nottification)
module.exports = router