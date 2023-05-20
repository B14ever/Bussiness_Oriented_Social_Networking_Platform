const express = require('express')
const router = express.Router()
    //controlles
const { CreateSkillAssessment } = require('../../Controlles/Admin/CreateSkillAssessment')
const { GetSkillAssessment } = require('../../Controlles/Admin/GetSkillAssessment')
const { AssesmentDescription } = require('../../Controlles/Admin/AssesmentDescription')
const { NewQuestion } = require('../../Controlles/Admin/NewQuestion')
const { DeleteQuestion } = require('../../Controlles/Admin/DeleteQuestion')
const { DeleteAssessment } = require('../../Controlles/Admin/DeleteAssessment')
    //routes
router.post('/', CreateSkillAssessment)
router.get('/', GetSkillAssessment)
router.post('/changeDescription', AssesmentDescription)
router.post('/newQuestion', NewQuestion)
router.post('/delete', DeleteQuestion)
router.post('/deleteAssessment', DeleteAssessment)
module.exports = router