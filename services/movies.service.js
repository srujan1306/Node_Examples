import { Movies } from "../entities/movies.entity.js";

async function editMovieById(ExistingData, UpdatedData) {
  return await Movies.put({ ...ExistingData.data, ...UpdatedData }).go();
}

async function createMovie(data) {
  return await Movies.create(data).go();
}

async function deleteMovieById(id) {
  await Movies.delete({ movieId: id }).go();
}

async function getMoviesById(id) {
  return await Movies.get({ movieId: id }).go();
}

async function getMovies() {
  return await Movies.scan.go();
}
export {
  editMovieById,
  createMovie,
  deleteMovieById,
  getMoviesById,
  getMovies,
};
