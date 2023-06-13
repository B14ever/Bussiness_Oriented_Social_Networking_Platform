//Models
const Job = require('../../Models/Job')
const AddJob = async(req, res, next) => {
    const { recureter, jobTitle, workType, jobLocation, jobType, jobRequirements, jobResponsibilities, form, webSite } = req.body
    try {
        const addJobs = await Job.create({ recureter, jobTitle, workType, jobLocation, jobType, form, jobRequirements, jobResponsibilities, webSite });
        if (!addJobs) {
            const error = new Error('Posting jobs failde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;

        } else {
            return res.status(200).json({ msg: 'Jobs Add Succesfuly' })
        }

    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({ error: err.message })
    }
}
const EditJObs = async(req, res, next) => {
    const { _id, recureter, jobTitle, workType, jobLocation, jobType, jobRequirements, jobResponsibilities, form, webSite } = req.body
    try {
        const addJobs = await Job.updateOne({ _id: _id }, { $set: { recureter: recureter, jobTitle: jobTitle, workType: workType, jobLocation: jobLocation, jobType: jobType, jobRequirements, form, jobResponsibilities, webSite } });
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
const GetApplicants = async(req, res) => {
    const { jobId } = req.params
    try {
        const applicant = await Job.findOne({ _id: jobId }, { applicants: 1 }).populate('applicants.applicant', 'FirstName , LastName , profilePhoto ');
        if (!applicant) {
            const error = new Error('delete jobs failde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            return res.status(200).json({ applicant })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const AcceptApplicants = async(req, res) => {
    const { jobId } = req.params
    const { applicantId } = req.body

    try {
        const applicant = await Job.updateOne({ _id: jobId, $and: [{ "applicants.applicant": applicantId }] }, { $set: { "applicants.$.accepetd": true } })
        if (!applicant) {
            const error = new Error('delete jobs failde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            return res.status(200).json({ msg: 'Accepted' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const UnAcceptApplicants = async(req, res) => {
    const { jobId } = req.params
    const { applicantId } = req.body

    try {
        const applicant = await Job.updateOne({ _id: jobId, $and: [{ "applicants.applicant": applicantId }] }, { $set: { "applicants.$.accepetd": false } })
        if (!applicant) {
            const error = new Error('delete jobs failde');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            return res.status(200).json({ msg: 'Accepted' })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { AddJob, DeleteJObs, EditJObs, GetJobs, GetApplicants, AcceptApplicants, UnAcceptApplicants }