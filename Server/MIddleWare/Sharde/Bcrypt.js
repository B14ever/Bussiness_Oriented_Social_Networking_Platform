const bcrypt = require('bcrypt')
const HashPasword = async(Password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
    return hashedPassword
}
const CompaierPassword = async(Password, hash) => {
    const match = await bcrypt.compare(Password, hash)
    if (match) {
        return true
    } else {
        return false
    }
}
module.exports = { HashPasword, CompaierPassword }