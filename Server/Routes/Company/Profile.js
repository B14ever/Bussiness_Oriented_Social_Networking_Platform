const express = require('express')
const router = express.Router()
    //controlles
const { AddPhoto } = require('../../Controlles/Company/AddPhoto')
const { AddAbout } = require('../../Controlles/Company/ProfileInfo')
const { AddVision } = require('../../Controlles/Company/ProfileInfo')
const { AddWorkes } = require('../../Controlles/Company/ProfileInfo')
const { RemoveWorkes } = require('../../Controlles/Company/ProfileInfo')
const { UpdateProfile } = require('../../Controlles/Company/ProfileInfo')
    //routes
router.post('/changePhoto', AddPhoto)
router.post('/about', AddAbout)
router.post('/vision', AddVision)
router.post('/addWorkes', AddWorkes)
router.post('/removeWorkes', RemoveWorkes)
router.post('/updateProfile', UpdateProfile)
module.exports = router