import Movie from "../model/movie.js";

export const createMovie = async (request, response) => {
  try {
    const movie = await new Movie(request.body);
    movie.save();

    response.status(200).json(movie);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updateMovie = async (request, response) => {
  try {
    const movie = await Movie.findById(request.params.id);

    if (!movie) {
      response.status(404).json({ msg: "Movie not found" });
    }

    await Movie.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json(movie);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteMovie = async (request, response) => {
  try {
    const movie = await Movie.findById(request.params.id);

    await movie.delete();

    response.status(200).json("Movie deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getMovie = async (request, response) => {
  try {
    const movie = await Movie.findById(request.params.id);

    response.status(200).json(movie);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAllMovies = async (request, response) => {
  let category = request.query.category;
  let title =  request.query.title;
  let movies;
  try {
    if (category){
      movies = await Movie.find({ categories: category });
    } else if(title){
      movies = await Movie.find({ title: title });
    }
    else movies = await Movie.find({});

    response.status(200).json(movies);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getLastMovies = async (request,response) =>{
  let movies;
  try {
    movies = await Movie.find({}).sort({createdAt:-1}).limit(3);
    response.status(200).json(movies);

  } catch (error) {
    response.status(500).json(error);
  }
}
