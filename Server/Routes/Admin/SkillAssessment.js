const express = require('express')
const router = express.Router()
    //controlles
const { CreateSkillAssessment } = require('../../Controlles/Admin/CreateSkillAssessment')
const { GetSkillAssessment } = require('../../Controlles/Admin/GetSkillAssessment')
    //routes
router.post('/', CreateSkillAssessment)
router.get('/', GetSkillAssessment)
module.exports = router