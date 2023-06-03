const express = require('express')
const router = express.Router()
    //controlles
const { GetJobs } = require('../../Controlles/Personal/GetAllJobs')
const { GetJob } = require('../../Controlles/Personal/GetAllJobs')
    //routes
router.get('/', GetJobs)
router.get('/:jobsId', GetJob)
module.exports = router