//Models
const Question = require('../../Models/Quetions')
    //middleWare
const NewQuestion = async(req, res, next) => {
    const { typeofStudy, newQuestions } = req.body
    try {
        const addNewQuestion = await Question.updateOne({ typeOfStudy: typeofStudy }, { $push: { questions: newQuestions } }).exec();
        if (!addNewQuestion) {
            const error = new Error('unableToAddNewQuestion');
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
module.exports = { NewQuestion }