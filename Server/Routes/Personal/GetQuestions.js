const express = require('express')
const router = express.Router()
    //controlles
const { GetQuestions } = require('../../Controlles/Personal/GetQuestion')
    //routes
router.post('/', GetQuestions)
module.exports = router