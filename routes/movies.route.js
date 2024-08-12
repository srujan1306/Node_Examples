import express from "express";
import {
  getMoviesByIdCtr,
  createMovieByIdCtr,
  deleteMovieByIdCtr,
  getMoviesCtr,
  editMovieByIdCtr,
} from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/", getMoviesCtr);
router.get("/:id", getMoviesByIdCtr);
router.delete("/del/:id", deleteMovieByIdCtr);
router.post("/", createMovieByIdCtr);
router.put("/:id", editMovieByIdCtr);

export default router;
