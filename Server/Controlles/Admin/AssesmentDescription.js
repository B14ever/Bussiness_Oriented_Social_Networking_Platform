//Models
const Question = require('../../Models/Quetions')
    //middleWare
const AssesmentDescription = async(req, res, next) => {

    const { typeofStudy, description } = req.body
    console.log(description)
    try {
        const EditDescription = await Question.updateOne({ typeOfStudy: typeofStudy }, { description: description })
        if (!EditDescription) {
            const error = new Error('unableToChangeDescription');
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
module.exports = { AssesmentDescription }