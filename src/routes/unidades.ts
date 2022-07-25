import express from "express";
const router = express.Router();
import {createUnidadesCtrl} from "../controllers/unidades";

router.get("/", createUnidadesCtrl )

export {router};
