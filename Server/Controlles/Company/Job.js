//Models
const Job = require('../../Models/Job')
const AddJob = async(req, res, next) => {
    const { recureter, jobTitle, workType, jobLocation, jobType, description } = req.body
    try {
        const addJobs = await Job.create({ recureter, jobTitle, workType, jobLocation, jobType, description });
        if (!addJobs) {
            const error = new Error('Posting jobs failde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            return res.status(200).json({ msg: 'Jobs Add Succesfuly' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const EditJObs = async(req, res, next) => {
    const { jobsId, recureter, jobTitle, workType, jobLocation, jobType, description } = req.body
    try {
        const addJobs = await Job.updateOne({ _id: jobsId }, { $set: { recureter: recureter, jobTitle: jobTitle, workType: workType, jobLocation: jobLocation, jobType: jobType, description: description } });
        if (!addJobs) {
            const error = new Error('Edit jobs failde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            return res.status(200).json({ msg: 'Jobs edited Succesfuly' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const DeleteJObs = async(req, res) => {
    const { jobId } = req.body
    try {
        const deleteJobs = await Job.deleteOne({ _id: jobId });
        if (!deleteJobs) {
            const error = new Error('delete jobs failde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            return res.status(200).json({ msg: 'deleted sucssufuly' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const GetJobs = async(req, res) => {
    const { recureterId } = req.params
    try {
        const Jobs = await Job.find({ recureter: recureterId });
        if (!Jobs) {
            const error = new Error('you didnt post any jobs');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            return res.status(200).json({ Jobs })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { AddJob, DeleteJObs, EditJObs, GetJobs }