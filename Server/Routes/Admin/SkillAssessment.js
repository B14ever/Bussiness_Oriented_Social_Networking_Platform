const express = require('express')
const router = express.Router()
    //controlles
const { CreateSkillAssessment } = require('../../Controlles/Admin/CreateSkillAssessment')
const { GetSkillAssessment } = require('../../Controlles/Admin/GetSkillAssessment')
const { AssesmentDescription } = require('../../Controlles/Admin/AssesmentDescription')
const { NewQuestion } = require('../../Controlles/Admin/NewQuestion')
    //routes
router.post('/', CreateSkillAssessment)
router.get('/', GetSkillAssessment)
router.post('/changeDescription', AssesmentDescription)
router.post('/newQuestion', NewQuestion)
module.exports = router