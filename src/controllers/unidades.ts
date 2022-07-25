import express, { Request, Response } from "express";
//import { matchedData } from "express-validator";
//import {unidadesModel} from "../models"
//import  handleHttpResponse  from "../utils/handleResponse";
//import handleHttpError  from "../utils/handleError";

async function createUnidadesCtrl(req: Request, res: Response): Promise<void> {
  try {
    res.send("hello bro this is just a proof");
  } catch (e) {
    console.log(e);
  }
}

export { createUnidadesCtrl };
