import express from "express";
import { createUserCtr } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/newuser", createUserCtr);

export default router;
