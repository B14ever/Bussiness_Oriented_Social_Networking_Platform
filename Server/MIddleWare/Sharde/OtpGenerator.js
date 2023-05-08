const otpGenerator = require('otp-generator')
const OTPGenerator = () => {
    const Code = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const newOTP = {
        code: Code,
        ValidUntil: new Date(Date.now() + 10 * 60 * 1000),
        attempts: 0
    }
    return newOTP
}
module.exports = { OTPGenerator }