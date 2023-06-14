require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// use cors midlware to allow server request from other origin
app.use(
        cors({
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST"],
            credentials: true,
        })
    )
    //Backend Server
const Server = app.listen(process.env.PORT, console.log('Connected TO Database and listing to port 8000'))
    //MiddleWres
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());
//routes for Personal Account
const PersonalAccountSignUp = require('./Routes/Personal/SignUP')
app.use('/PersonalAccountSignup', PersonalAccountSignUp)
const PersonalAccountUpdateProfile = require('./Routes/Personal/UpdateProfile')
app.use('/PersonlaProfileUpdateAccount', PersonalAccountUpdateProfile)
const PersonalAccountProfiel = require('./Routes/Personal/Profile')
app.use('/PersonalAccountProfile', PersonalAccountProfiel)
const GetQuestion = require('./Routes/Personal/GetQuestions')
app.use('/questions', GetQuestion)
const GetPersnoalAccountsForNetWork = require('./Routes/Personal/Friends')
app.use('/Peoples', GetPersnoalAccountsForNetWork)
const FriendRequest = require('./Routes/Personal/FreindRequest')
app.use('/friendRequest', FriendRequest)
const ChatRoom = require('./Routes/Personal/ChatRoom')
app.use('/ChatRoom', ChatRoom)
const Message = require('./Routes/Personal/Message')
app.use('/message', Message)
const MyNottification = require('./Routes/Personal/Notification')
app.use('/notification', MyNottification)
    //routes for CompanyAccounts
const CompanyAccounts = require('./Routes/Company/SignUp')
app.use('/ComapnyAccountSignUp', CompanyAccounts)
const CompanyAccountProfile = require('./Routes/Company/Profile')
app.use('/Profile', CompanyAccountProfile)
const JobVacanices = require('./Routes/Company/Jobs')
app.use('/jobs', JobVacanices)
const MyNotification = require('./Routes/Company/Notification')
app.use('/nottification', MyNotification)

//routes for Admin
const AdminAccounts = require('./Routes/Admin/AddAdmin')
app.use('/AdminAccount', AdminAccounts)
const SkillAssessment = require('./Routes/Admin/SkillAssessment')
app.use('/skillAssessment', SkillAssessment)
const Users = require('./Routes/Admin/GetUsers')
app.use('/users', Users)
const UsersPosts = require('./Routes/Admin/UsersPosts')
app.use('/usersPosts', UsersPosts)
const Admins = require('./Routes/Admin/Admins')
app.use('/admins', Admins)
    //SharedRoutes
const Verification = require('./Routes/Shared/EmailVerification')
app.use('/emailVerification', Verification)
const Login = require('./Routes/Shared/Login')
app.use('/Login', Login)
const ChangePassword = require('./Routes/Shared/ChangePassword')
app.use('/ChangePassword', ChangePassword)
const DeleteAccount = require('./Routes/Shared/DeleteAccount')
app.use('/deleteAccount', DeleteAccount)
const Posts = require('./Routes/Shared/Post')
app.use('/posts', Posts)
const Vacanices = require('./Routes/Shared/GetJobs')
app.use('/vacanices', Vacanices)
const Pages = require('./Routes/Personal/GetPages')
app.use('/pages', Pages)


//  soket.io server 
const io = require('socket.io')(Server, {
    pingTimeOut: 60000,
    cors: {
        origin: "http://localhost:5173"
    }
})
io.on("connection", (socket) => {
        socket.on('setup', (userId) => {
            socket.join(userId)
            socket.emit('connected')
        })
        socket.on('join chat', (room) => {
            socket.join(room)
        })
        socket.on('new message', (newMessageRecieved) => {
            var chat = newMessageRecieved
            if (!chat.chat.users) return console.log("chat.users not defineds")
            chat.chat.users.forEach((user) => {
                if (user === newMessageRecieved.sender._id) return;
                socket.in(user).emit("message recieved", newMessageRecieved);
            });
        })
    })
    // Connect to MongoDB
mongoose.connect(process.env.MoGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { Server })
    .catch(err => console.error('Could not connect to MongoDB...', err))