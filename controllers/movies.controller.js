import { Movies } from "../entities/movies.entity.js";
import {
  editMovieById,
  createMovie,
  deleteMovieById,
  getMoviesById,
  getMovies,
} from "../services/movies.service.js";
async function editMovieByIdCtr(request, response) {
  const { id } = request.params;
  const UpdatedData = request.body;
  const ExistingData = await Movies.get({ movieId: id }).go();
  if (ExistingData.data) {
    await editMovieById(ExistingData, UpdatedData);
    response.send({
      msg: "movie edited successfully",
      data: UpdatedData,
    });
  } else {
    response.status(404).send({ msg: "movie not found" });
  }
}

async function createMovieByIdCtr(request, response) {
  const data = request.body;
  data.movieId = uuidv4();
  const addmovie = await createMovie(data);

  response.send(addmovie.data);
}

async function deleteMovieByIdCtr(request, response) {
  const { id } = request.params;
  const movie_to_deleted = await Movies.get({ movieId: id }).go();

  if (movie_to_deleted.data) {
    await deleteMovieById(id);
    response.send({
      msg: "movie deleted successfully",
      data: movie_to_deleted.data,
    });
  } else {
    response.status(404).send({ msg: "movie not found" });
  }
}

async function getMoviesByIdCtr(request, response) {
  const { id } = request.params;
  const result = await getMoviesById(id);
  result
    ? response.send(result.data)
    : response.status(404).send({ msg: "movie not found" });
}

async function getMoviesCtr(request, response) {
  const allmovies = await getMovies();
  response.send(allmovies.data);
}

export {
  editMovieByIdCtr,
  createMovieByIdCtr,
  deleteMovieByIdCtr,
  getMoviesByIdCtr,
  getMoviesCtr,
};
