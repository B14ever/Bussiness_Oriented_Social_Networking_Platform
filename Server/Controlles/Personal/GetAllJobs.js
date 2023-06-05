//Models

const Jobs = require('../../Models/Job')
const GetJobs = async(req, res, next) => {
    const jobs = await Jobs.find({}, { applicants: 0 }).populate({
        path: "recureter",
        select: "companyName logo  _id",
    });
    return res.status(200).json({ jobs })

}
const GetJob = async(req, res, next) => {
    const { jobsId } = req.params
    const job = await Jobs.find({ _id: jobsId }, { applicants: 0 }).populate({
        path: "recureter",
        select: "companyName logo  _id",
    });
    return res.status(200).json({ job })

}
const ApplyForJobs = async(req, res, next) => {
    const { jobsId } = req.params
    const { applicant, cv } = req.body.data
    try {
        const Applyjob = await Jobs.updateOne({ _id: jobsId }, { $push: { applicants: { applicant, cv } } }).exec()
        if (!Applyjob) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ msg: 'Applied succsfully' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }

}

module.exports = { GetJobs, GetJob, ApplyForJobs }