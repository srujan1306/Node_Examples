import express from "express";
import { v4 as uuidv4 } from "uuid";
import { Movies } from "../entities/movies.entity.js";
const router = express.Router();

router.get("/", async function (request, response) {
  const allmovies = await Movies.scan.go();
  response.send(allmovies.data);
});
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  const result = await Movies.get({ movieId: id }).go();
  result
    ? response.send(result.data)
    : response.status(404).send({ msg: "movie not found" });
});
router.delete("/del/:id", async function (request, response) {
  const { id } = request.params;
  const movie_to_deleted = await Movies.get({ movieId: id }).go();

  if (movie_to_deleted.data) {
    await Movies.delete({ movieId: id }).go();
    response.send({
      msg: "movie deleted successfully",
      data: movie_to_deleted.data,
    });
  } else {
    response.status(404).send({ msg: "movie not found" });
  }
});
router.post("/", express.json(), async function (request, response) {
  const data = request.body;
  data.movieId = uuidv4();
  const addmovie = await Movies.create(data).go();

  response.send(addmovie.data);
});
router.put("/:id", express.json(), async function (request, response) {
  const { id } = request.params;
  const UpdatedData = request.body;
  const ExistingData = await Movies.get({ movieId: id }).go();
  if (ExistingData.data) {
    await Movies.put({ ...ExistingData.data, ...UpdatedData }).go();
    response.send({
      msg: "movie edited successfully",
      data: UpdatedData,
    });
  } else {
    response.status(404).send({ msg: "movie not found" });
  }
});

export default router;
