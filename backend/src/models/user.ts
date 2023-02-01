import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    profilePicture:{
        type: String
    },
    verified: {
        type: Boolean
    },
    org:{
        city:{
            type: String
        },
        country:{
            type: String
        },
        name:{
            type: String
        },
        postNumer:{
            type: String
        },
        regNumber:{
            type: String
        },
        street:{
            type: String
        },
        streetNumber:{
            type: String
        }
    }
})

export default mongoose.model('User', User, 'users');