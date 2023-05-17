//Models
const Question = require('../../Models/Quetions')
    //middleWare
const GetSkillAssessment = async(req, res, next) => {
    const Assessment = await Question.find({})
    return res.status(200).json({ Assessment })

}
module.exports = { GetSkillAssessment }