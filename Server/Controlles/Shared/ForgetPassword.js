 //Modules
 const Users = require('../../Models/Users')
 const { createToken } = require('../../MIddleWare/Sharde/CreateToken')
 const { SendEmail } = require('../../MIddleWare/Sharde/SendEmail')
 const { OTPGenerator } = require('../../MIddleWare/Sharde/OtpGenerator')
 const newOTP = OTPGenerator()
 const ForgetPassword = async(req, res, next) => {
     const Email = req.body.Email
     try {
         const find_user = await Users.findOne({ Email: `${Email}` })
         if (!find_user) {
             const error = new Error('InvalidEmail');
             error.status = 409; // set the status code to 409 (Conflict)
             throw error;
         } else {
             const update_User_Otp = await Users.updateOne({ Email: `${Email}` }, { $set: { otp: newOTP } })
             if (!update_User_Otp) {
                 const error = new Error('Server Error try again');
                 error.status = 409; // set the status code to 409 (Conflict)
                 throw error;
             } else {
                 const id = find_user._id
                 const userId = id.toString()
                 const token = createToken(userId, find_user.role)
                 SendEmail(req, res, next, newOTP.code, Email, token)
             }
         }
     } catch (err) {
         res.status(err.status || 500).json({ error: err.message })
     }

 }
 module.exports = { ForgetPassword }