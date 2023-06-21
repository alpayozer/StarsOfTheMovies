import mongoose from 'mongoose';

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: String,
        required: true,
    },
    actors: {
        type: Array,
        required: true,
    },
    directors: {
        type: Array,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    categories: {
        type: Array,
        required: false   
    },
    trailer: {
        type: String,
        required:false
    },
    createdAt:{
        type:Date
    }
});


const movie = mongoose.model('movie', MovieSchema);

export default movie;