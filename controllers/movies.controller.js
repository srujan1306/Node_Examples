import { Movies } from "../entities/movies.entity.js";
import {
  editMovieById,
  createMovie,
  deleteMovieById,
  getMoviesById,
  getMovies,
} from "../services/movies.service.js";
import { s3 } from "../aws_s3_config.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

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
  const file = request.file;
  if (!file) {
    return response.status(400).json({ error: "No file uploaded." });
  }
  const contentType = file.mimetype; // e.g., 'image/jpeg', 'image/png'

  // Prepare the upload parameters
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${Date.now().toString()}-${file.originalname}`,
    Body: file.buffer, // Buffer from multer.memoryStorage
    ACL: "public-read", // Adjust according to your needs
    ContentType: contentType, // Set the Content-Type header
    ContentDisposition: "inline", // Ensure the file is displayed inline
  };
  const command = new PutObjectCommand(uploadParams);
  const image = await s3.send(command);
  const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${uploadParams.Key}`;

  let data = request.body;
  let updates = {
    movieId: uuidv4(),
    poster: fileUrl,
    rating: Number(data.rating),
  };
  data = {
    ...data, // Spread the existing data properties
    ...updates, // Spread the updates to override specific properties
  };
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
