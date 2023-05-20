//Models
const Question = require('../../Models/Quetions')
    //middleWare
const DeleteAssessment = async(req, res, next) => {
    const { deleteId } = req.body
    try {
        const Delete = await Question.deleteOne({ _id: deleteId })
        if (!Delete) {
            const error = new Error('unableToDelete');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const Assessment = await Question.find({})
            return res.status(200).json({ Assessment })
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { DeleteAssessment }