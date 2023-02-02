import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Token = new Schema({
    expiry: { 
        type: Date
    },
    token: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Token', Token, 'resetPassword');