//Models
const Question = require('../../Models/Quetions')
    //middleWare
const CreateSkillAssessment = async(req, res, next) => {

    const { typeofStudy, questions, description } = req.body
    try {
        const addSkillAssessment = await Question.create({ typeOfStudy: typeofStudy, questions: questions, description: description })
        if (!addSkillAssessment) {
            const error = new Error('unableToaddQuestions');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            return res.status(200).json({ message: 'QuestionsCreated' })
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { CreateSkillAssessment }