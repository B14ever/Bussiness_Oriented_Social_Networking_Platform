const nodemailer = require("nodemailer")
require('dotenv').config()
const SendEmail = async(req, res, next, Code, Email, token) => {
    const config = {
        service: 'gmail',
        host: "smtp.ethereal.email",
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }
    const transporter = nodemailer.createTransport(config)
    const message = {
        from: process.env.EMAIL,
        to: `${Email}`,
        subject: 'Verification Code',
        text: Code
    }
    try {
        await transporter.sendMail(message)
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'verifiy email', token })
        next()
    } catch (error) {
        res.status(409).json({ error: 'Server Error' })
    }
}
module.exports = { SendEmail }