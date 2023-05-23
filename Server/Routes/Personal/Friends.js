const express = require('express')
const router = express.Router()
    //controlles
const { GetPersonalAccounts } = require('../../Controlles/Personal/Friends')
const { PersonalAccountsDetail } = require('../../Controlles/Personal/PersonalAccontsDetail')
    //routes
router.post('/', GetPersonalAccounts)
router.get('/:id', PersonalAccountsDetail)
module.exports = router