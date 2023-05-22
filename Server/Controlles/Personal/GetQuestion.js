//Models
const Question = require('../../Models/Quetions')
const GetQuestions = async(req, res, next) => {
    const typeOfStudy = req.body.TOPIC
    const Questions = await Question.find({ typeOfStudy: typeOfStudy }, { questions: 1 })
    return res.status(200).json({ Questions })

}
module.exports = { GetQuestions }