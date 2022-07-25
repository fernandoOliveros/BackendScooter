import express, { Request, Response } from "express";
import { matchedData } from "express-validator";
import unidadesModel from "../models/index"
//import  handleHttpResponse  from "../utils/handleResponse";
//import handleHttpError  from "../utils/handleError";

async function createUnidadesCtrl(req: Request, res: Response): Promise<void> {
  try {
    const body = matchedData(req);
    console.log(body)
    //res.send("hello bro this is just a proof");
  } catch (e) {
    console.log(e);
  }
}

export { createUnidadesCtrl };
