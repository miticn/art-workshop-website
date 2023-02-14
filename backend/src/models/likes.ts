import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Likes = new Schema({
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Likes', Likes, 'likes');