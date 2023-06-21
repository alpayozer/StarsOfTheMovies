import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    movieId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});


const comment = mongoose.model('comment', CommentSchema);

export default comment;