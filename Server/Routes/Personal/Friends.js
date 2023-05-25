const express = require('express')
const router = express.Router()
    //controlles
const { GetPersonalAccounts } = require('../../Controlles/Personal/Friends')
const { PersonalAccountsDetail } = require('../../Controlles/Personal/PersonalAccontsDetail')
const { Invitation } = require('../../Controlles/Personal/Invitation')
    //routes
router.post('/', GetPersonalAccounts)
router.get('/:id', PersonalAccountsDetail)
router.post('/invitation', Invitation)
module.exports = router