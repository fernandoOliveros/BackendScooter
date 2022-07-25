import express, { Request, Response } from "express";
import { matchedData } from "express-validator";
import Unidad from "../models/unidades"
import  handleHttpResponse  from "../utils/handleResponse";
//import handleHttpError  from "../utils/handleError";

async function createUnidadesCtrl(req: Request, res: Response): Promise<void> {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataUnidad = await Unidad.create(body);
    await handleHttpResponse(res, dataUnidad, 401);
  } catch (e) {
    console.log(e);
  }
}

export { createUnidadesCtrl };
