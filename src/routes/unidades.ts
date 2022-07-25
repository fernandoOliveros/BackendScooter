import express from "express";
const router = express.Router();
import {createUnidadesCtrl} from "../controllers/unidades";
import {validatorUnidades} from "../middleware/unidades"

router.post("/", validatorUnidades, createUnidadesCtrl)

export {router};
