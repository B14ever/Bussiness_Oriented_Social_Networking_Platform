const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        requier: true
    },
    role: {
        type: String,
        enum: ['admin', 'company', 'personal'],
        requier: true
    },
    otp: {
        code: {
            type: Number,
            required: true
        },
        ValidUntil: {
            type: Date,
            required: true
        },
        attempts: {
            type: Number,
            default: 0
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    PersenalAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalAccount' }
})
module.exports = mongoose.model('Users', UserSchema)