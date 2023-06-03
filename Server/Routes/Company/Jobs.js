const express = require('express')
const router = express.Router()
    //controlles
const { AddJob } = require('../../Controlles/Company/Job')
const { DeleteJObs } = require('../../Controlles/Company/Job')
const { EditJObs } = require('../../Controlles/Company/Job')
const { GetJobs } = require('../../Controlles/Company/Job')
    //routes
router.post('/', AddJob)
router.post('/delete', DeleteJObs)
router.post('/edit', EditJObs)
router.get('/:recureterId', GetJobs)
module.exports = router