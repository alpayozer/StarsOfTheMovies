import mongoose from 'mongoose';

const WatchlistSchema = mongoose.Schema({
    movieId: {
        type: String,
   
    },
    userId: {
        type: String,
  }
});


const watchlist = mongoose.model('watchlist', WatchlistSchema);

export default watchlist;