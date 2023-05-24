const express = require('express')
const router = express.Router()
    //controlles
const { FriendRequest } = require('../../Controlles/Personal/FriendRequest')
const { CancleFriendRequest } = require('../../Controlles/Personal/CancleRequest')
    //routes
router.post('/', FriendRequest)
router.post('/cancleRequest', CancleFriendRequest)
module.exports = router