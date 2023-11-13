import express from "express";
import userController from "../resources/app/controllers/userController.js";

const router = express.Router();

router.get("/", userController.index);

router.post("/create", userController.createVideo);

export default router;
