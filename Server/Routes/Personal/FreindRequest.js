const express = require('express')
const router = express.Router()
    //controlles
const { FriendRequest } = require('../../Controlles/Personal/FriendRequest')
const { CancleFriendRequest } = require('../../Controlles/Personal/CancleRequest')
const { DclineInvitation } = require('../../Controlles/Personal/DeclineInvitation')
const { AcceptFriendRequest } = require('../../Controlles/Personal/AcceptFriendRequest')
const { UserInfo } = require('../../Controlles/Personal/UserInfo')
    //routes
router.post('/', FriendRequest)
router.post('/cancleRequest', CancleFriendRequest)
router.post('/declineInvitation', DclineInvitation)
router.post('/AcceptRequest', AcceptFriendRequest)
router.post('/CheckRequest', UserInfo)
module.exports = router