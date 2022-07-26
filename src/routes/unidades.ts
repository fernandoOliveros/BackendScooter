import express from "express";
const router = express.Router();
import {
  createUnidadCtrl,
  updateUnidadesCtrl,
  readAllUnidadesCtrl,
  readUnidadCtrl,
  deleteUnidadCtrl,
} from "../controllers/unidades";
import { validatorUnidades, validatorReadUnidad } from "../middleware/unidades";

router.post("/create", validatorUnidades, createUnidadCtrl); 
router.get("/read", readAllUnidadesCtrl); 
router.get("/read/:id", validatorReadUnidad, readUnidadCtrl); 
router.put("/update/:id", validatorReadUnidad, validatorUnidades,  updateUnidadesCtrl);
router.delete("/delete/:id", validatorReadUnidad, deleteUnidadCtrl);


export { router };
