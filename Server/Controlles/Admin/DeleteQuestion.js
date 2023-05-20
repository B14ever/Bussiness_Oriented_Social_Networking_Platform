//Models
const Question = require('../../Models/Quetions')
    //middleWare
const DeleteQuestion = async(req, res, next) => {

    const { typeofStudy, deleteQuestion } = req.body
    try {
        const Delete = await Question.updateOne({ typeOfStudy: typeofStudy }, { questions: deleteQuestion })
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
module.exports = { DeleteQuestion }