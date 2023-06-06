const express = require('express')
const router = express.Router()
    //controlles
const { GetJobs, GetJob, ApplyForJobs, PendingJobs, CancleApplication } = require('../../Controlles/Personal/GetAllJobs')
    //routes
router.get('/:userId', GetJobs)
router.get('/pending/:userId', PendingJobs)
router.get('/:jobsId', GetJob)
router.post('/apply/:jobsId', ApplyForJobs)
router.post('/cancle/:jobsId', CancleApplication)
module.exports = router