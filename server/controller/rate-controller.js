
import Rate from "../model/rate.js";


export const newRate = async (request, response) => {
    try {
        const rate = await new Rate(request.body);
        rate.save();

        response.status(200).json(rate +'Rate saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getRates = async (request, response) => {
    try {
        const rates = await Rate.find({ movieId: request.params.id });
        
        response.status(200).json(rates);
    } catch (error) {
        response.status(500).json(error)
    }
}
