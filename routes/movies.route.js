import express from "express";
import multer from "multer";

import {
  getMoviesByIdCtr,
  createMovieByIdCtr,
  deleteMovieByIdCtr,
  getMoviesCtr,
  editMovieByIdCtr,
} from "../controllers/movies.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(), // Use memory storage for multer
});

router.get("/", getMoviesCtr);
router.get("/:id", auth, getMoviesByIdCtr);
router.delete("/del/:id", deleteMovieByIdCtr);
router.post("/", upload.single("file"), createMovieByIdCtr);
router.put("/:id", editMovieByIdCtr);

export default router;
