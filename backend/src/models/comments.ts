import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Comments = new Schema({
    text: { 
        type: String
    },
    date: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop'
    }
})

export default mongoose.model('Comments', Comments, 'comments');