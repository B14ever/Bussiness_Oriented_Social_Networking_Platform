const express = require('express')
const router = express.Router()
    //controlles
const { FriendRequest } = require('../../Controlles/Personal/FriendRequest')
const { CancleFriendRequest } = require('../../Controlles/Personal/CancleRequest')
const { AcceptFriendRequest } = require('../../Controlles/Personal/AcceptFriendRequest')
    //routes
router.post('/', FriendRequest)
router.post('/cancleRequest', CancleFriendRequest)
router.post('/AcceptRequest', AcceptFriendRequest)
module.exports = router