import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Workshop = new Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    date: { 
        type: Date
    },
    mainPicture: {
        type: String
    }
})

export default mongoose.model('Workshop', Workshop, 'Workshops');