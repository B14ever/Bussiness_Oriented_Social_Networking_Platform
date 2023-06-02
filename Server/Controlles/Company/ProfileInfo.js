//Models
const CompanyAccount = require('../../Models/CompanyAccount')
const AddAbout = async(req, res) => {
    const { Email, tagline } = req.body
    try {
        const addAbout = await CompanyAccount.updateOne({ Email: Email }, { $set: { tagline: tagline } }).exec();
        if (!addAbout) {
            const error = new Error('PhotoUploadFailde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await CompanyAccount.findOne({ Email: `${Email}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const AddVision = async(req, res) => {
    const { Email, mission } = req.body
    try {
        const addMission = await CompanyAccount.updateOne({ Email: Email }, { $set: { mission: mission } }).exec();
        if (!addMission) {
            const error = new Error('PhotoUploadFailde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await CompanyAccount.findOne({ Email: `${Email}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const AddWorkes = async(req, res) => {
    const { title, describtion } = req.body.data
    const Email = req.body.Email
    const Workes = { title, describtion }
    try {
        const addWorkes = await CompanyAccount.updateOne({ Email: Email }, { $push: { workes: Workes } }).exec();
        if (!addWorkes) {
            const error = new Error('Workes not add');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await CompanyAccount.findOne({ Email: `${Email}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const RemoveWorkes = async(req, res) => {
    const { Email, workId } = req.body
    try {
        const removeWorkes =
            await CompanyAccount.updateOne({ Email: Email, "workes._id": workId }, { $pull: { workes: { _id: workId } } }).exec();
        if (!removeWorkes) {
            const error = new Error('Workes not add');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await CompanyAccount.findOne({ Email: `${Email}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const UpdateProfile = async(req, res) => {
    const { companyName, Country, City, Email, PhoneNumber, organizationSize, organizationType, industry, } = req.body
    try {
        const updateUser = await CompanyAccount.updateOne({ Email: `${Email}` }, { $set: { companyName, Country, City, PhoneNumber, organizationSize, organizationType, industry, } })
        if (!updateUser) {
            const error = new Error('Update failde try again');
            error.status = 409; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await CompanyAccount.findOne({ Email: `${Email}` })
            res.status(200).json({ user })
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { AddAbout, AddVision, AddWorkes, RemoveWorkes, UpdateProfile }