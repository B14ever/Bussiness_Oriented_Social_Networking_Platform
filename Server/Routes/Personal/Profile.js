const express = require('express')
const router = express.Router()
    //controlles
const { AddExprience } = require('../../Controlles/Personal/AddExprience')
const { AddEducation } = require('../../Controlles/Personal/AddEducation')
const { AddPhoto } = require('../../Controlles/Personal/AddPhoto')
const { AddSkill } = require('../../Controlles/Personal/AddSkill')
const { EditExprience } = require('../../Controlles/Personal/EditExprience')
const { EditEducation } = require('../../Controlles/Personal/EditEducation')
const { DeleteSkill } = require('../../Controlles/Personal/DeleteSkill')
const { AddBadge } = require('../../Controlles/Personal/AddBage')
    //routes\
router.post('/addExprience', AddExprience)
router.post('/addEducation', AddEducation)
router.post('/changePhoto', AddPhoto)
router.post('/addSkill', AddSkill)
router.post('/EditExprience', EditExprience)
router.post('/EditEducation', EditEducation)
router.post('/DeleteSkill', DeleteSkill)
router.post('/addBadge', AddBadge)

module.exports = router