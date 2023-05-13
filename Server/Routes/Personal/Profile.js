const express = require('express')
const router = express.Router()
    //controlles
const { AddExprience } = require('../../Controlles/Personal/AddExprience')
const { AddEducation } = require('../../Controlles/Personal/AddEducation')
const { AddPhoto } = require('../../Controlles/Personal/AddPhoto')
const { AddSkill } = require('../../Controlles/Personal/AddSkill')
const { EditExprience } = require('../../Controlles/Personal/EditExprience')
    //routes\
router.post('/addExprience', AddExprience)
router.post('/addEducation', AddEducation)
router.post('/changePhoto', AddPhoto)
router.post('/addSkill', AddSkill)
router.post('/EditExprience', EditExprience)

module.exports = router