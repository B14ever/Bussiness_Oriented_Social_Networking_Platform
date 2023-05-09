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

//routes for CompanyAccounts
const CompanyAccounts = require('./Routes/Company/SignUp')
app.use('/ComapnyAccountSignUp', CompanyAccounts)


//routes for Admin
const AdminAccounts = require('./Routes/Admin/AddAdmin')
app.use('/AdminAccount', AdminAccounts)


//SharedRoutes
const Verification = require('./Routes/Shared/EmailVerification')
app.use('/emailVerification', Verification)
const Login = require('./Routes/Shared/Login')
app.use('/Login', Login)
const ChangePassword = require('./Routes/Shared/ChangePassword')
app.use('/ChangePassword', ChangePassword)
const DeleteAccount = require('./Routes/Shared/DeleteAccount')
app.use('/deleteAccount', DeleteAccount)
    // Connect to MongoDB
mongoose.connect(process.env.MoGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { Server })
    .catch(err => console.error('Could not connect to MongoDB...', err))