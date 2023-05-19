 //Modules
 const Users = require('../../Models/Users')
     //Midleware
 const { HashPasword } = require('../../MIddleWare/Sharde/Bcrypt')

 const RecoverPassword = async(req, res, next) => {
     const decodedToken = req.decodedToken;
     const userId = decodedToken.id;
     const { Password } = req.body
     try {
         const newPassword = await HashPasword(Password)
         change_user_password = await Users.updateOne({ _id: `${userId}` }, { $set: { password: `${newPassword}` } })
         if (!change_user_password) {
             throw new Error('ChangePasswordFaild')
         } else {
             return res.status(200).json({ msg: "password changed succfully" })
         }
     } catch (err) {
         return res.status(400).json({ error: err.message })
     }
 }
 module.exports = { RecoverPassword }