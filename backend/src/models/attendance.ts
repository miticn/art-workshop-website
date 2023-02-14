import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Attendance = new Schema({
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String
    }
})

export default mongoose.model('Attendance', Attendance, 'attendance');