const express = require('express')
const router = express.Router()
    //controlles
const { AddEducation } = require('../../Controlles/Personal/AddEducation')
    //routes\
router.post('/addEducation', AddEducation)

module.exports = router