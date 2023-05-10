const express = require('express')
const router = express.Router()
    //controlles
const { AddEducation } = require('../../Controlles/Personal/AddEducation')
const { AddPhoto } = require('../../Controlles/Personal/AddPhoto')
    //routes\
router.post('/addEducation', AddEducation)
router.post('/changePhoto', AddPhoto)

module.exports = router