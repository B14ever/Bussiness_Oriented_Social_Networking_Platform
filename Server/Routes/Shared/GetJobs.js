const express = require('express')
const router = express.Router()
    //controlles
const { GetJobs, GetJob, ApplyForJobs } = require('../../Controlles/Personal/GetAllJobs')
    //routes
router.get('/', GetJobs)
router.get('/:jobsId', GetJob)
router.post('/apply/:jobsId', ApplyForJobs)
module.exports = router