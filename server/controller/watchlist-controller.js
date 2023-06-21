
import Watchlist from "../model/watchlist.js";


export const addWatchlist = async (request, response) => {
    try {
        const watchlist = await new Watchlist(request.body);
        watchlist.save();

        response.status(200).json('Watchlist saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getWatchlist = async (request, response) => {
    try {
        const watchlist = await Watchlist.find({ userId: request.params.id });
        
        response.status(200).json(watchlist);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteWatchlist = async (request, response) => {
    try {
        const watchlist = await Watchlist.findById(request.params.id);
        await watchlist.delete()

        response.status(200).json('watchlist deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

