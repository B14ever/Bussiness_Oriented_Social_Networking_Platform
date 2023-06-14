const express = require('express')
const router = express.Router()
    //controlles
const { GetAdmins, GetAdmin, UpdateProfile, AddPhoto } = require('../../Controlles/Admin/Admins')

//routes
router.get('/:id', GetAdmins)
router.get('/admin/:id', GetAdmin)
router.post('/update', UpdateProfile)
router.post('/ChangePhoto', AddPhoto)
module.exports = router