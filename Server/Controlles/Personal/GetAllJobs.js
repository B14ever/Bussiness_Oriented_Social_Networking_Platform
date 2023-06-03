//Models

const Jobs = require('../../Models/Job')
const GetJobs = async(req, res, next) => {
    const jobs = await Jobs.find({}).populate({
        path: "recureter",
        select: "companyName logo  _id",
    });
    return res.status(200).json({ jobs })

}
const GetJob = async(req, res, next) => {
    const { jobsId } = req.params
    const job = await Jobs.find({ _id: jobsId }).populate({
        path: "recureter",
        select: "companyName logo  _id",
    });
    return res.status(200).json({ job })

}

module.exports = { GetJobs, GetJob, }