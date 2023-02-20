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
    },
    gallery: {
        type: Array
    },
    availableSeats: {
        type: Number
    },
    totalSeats: {
        type: Number
    },
    descriptionLong: {
        type: String
    },
    cordinates: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number
    },
    status: {
        type: String
    },
})

export default mongoose.model('Workshop', Workshop, 'workshops');