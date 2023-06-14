//Models
const AdminAccount = require('../../Models/Admin')
const GetAdmins = async(req, res, next) => {
    const { id } = req.params
    try {
        const Admins = await AdminAccount.find({ _id: { $ne: id }, }, { FirstName: 1, LastName: 1, _id: 1, City: 1, Country: 1, profilePhoto: 1 }).sort({ createdAt: -1 })
        if (!Admins) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ Admins })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const GetAdmin = async(req, res, next) => {
    const { id } = req.params
    try {
        const Admins = await AdminAccount.find({ _id: id }, { FirstName: 1, LastName: 1, _id: 1, City: 1, Country: 1, profilePhoto: 1, Email: 1, PhoneNumber: 1 })
        if (!Admins) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ Admins })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const UpdateProfile = async(req, res) => {
    const { FirstName, LastName, Country, City, PhoneNumber, Email } = req.body
    console.log('here')
    try {
        const updateUser = await AdminAccount.updateOne({ Email: `${Email}` }, { $set: { FirstName, LastName, Country, City, PhoneNumber } })
        if (!updateUser) {
            const error = new Error('Update failde try again');
            error.status = 409; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await AdminAccount.findOne({ Email: `${Email}` })
            res.status(200).json({ user })
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const AddPhoto = async(req, res) => {
    const { profilePhoto } = req.body.data
    const Email = req.body.Email
    try {
        const addprofilePhoto = await AdminAccount.updateOne({ Email: Email }, { $set: { profilePhoto: profilePhoto } }).exec();
        if (!addprofilePhoto) {
            const error = new Error('PhotoUploadFailde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await AdminAccount.findOne({ Email: `${Email}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { GetAdmins, GetAdmin, UpdateProfile, AddPhoto }