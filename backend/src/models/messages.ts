import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let messages = new Schema({
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop'
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String
    },
    date: {
        type: Date
    },
})

export default mongoose.model('messages', messages, 'messages');