const express = require('express')
const router = express.Router()
    //controlles
const { AddJob, DeleteJObs, EditJObs, GetJobs, GetApplicants, AcceptApplicants, UnAcceptApplicants } = require('../../Controlles/Company/Job')
    //routes
router.post('/', AddJob)
router.post('/delete', DeleteJObs)
router.post('/edit', EditJObs)
router.get('/:recureterId', GetJobs)
router.get('/applicant/:jobId', GetApplicants)
router.post('/accept/:jobId', AcceptApplicants)
router.post('/unaccept/:jobId', UnAcceptApplicants)
module.exports = router