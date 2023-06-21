import mongoose from 'mongoose';

const RateSchema = mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});


const rate = mongoose.model('rate', RateSchema);

export default rate;