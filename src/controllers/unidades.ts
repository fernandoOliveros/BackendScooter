import express, { Request, Response } from "express";
import { matchedData } from "express-validator";
import Unidad from "../models/unidades";
import handleHttpResponse from "../utils/handleResponse";
import handleHttpError from "../utils/handleError";
//import { Model } from "sequelize/types";

async function createUnidadCtrl(req: Request, res: Response): Promise<void> {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataUnidad = await Unidad.create(body);
    await handleHttpResponse(res, dataUnidad, 401);
  } catch (e) {
    handleHttpError(res, "ERROR_UPLOAD_UNIDADES");
  }
}

async function updateUnidadesCtrl(req: Request, res: Response): Promise<void> {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataUnidad= await Unidad.findByPk(id);
    if (dataUnidad == null){
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return
    }
    const dataUpdateUnidad = await Unidad.update(body, {
      where: { id_Unidad: id },
    });
    handleHttpResponse(res, dataUpdateUnidad);
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_UNIDADES");
  }
}

async function readAllUnidadesCtrl(req: Request, res: Response, ): Promise<void> {
  try {
    const dataAllUnidades = await Unidad.findAll();
    handleHttpResponse(res, dataAllUnidades);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_UNIDADES");
  }
}

async function readUnidadCtrl(req: Request, res: Response): Promise<void> {
  try {
    req = <any> matchedData(req);
    const { id }= <any> req;
    console.log(id)
    const dataUnidad= await Unidad.findByPk(id);
    if(dataUnidad== null ){
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return
    }
    handleHttpResponse(res, dataUnidad);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_UNIDAD");
  }
}

async function deleteUnidadCtrl(req: Request, res: Response): Promise<void> {
  try {
    req = <any> matchedData(req);
    const { id }= <any> req;
    const dataUnidad= await Unidad.findByPk(id);
    if (dataUnidad == null){
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return
    }
    dataUnidad.destroy();
    //const dataDeleteUnidad = await Unidad.destroy({ where: { id_Unidad: id } });
    handleHttpResponse(res, dataUnidad);
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_UNIDAD");
  }
}

export {
  createUnidadCtrl,
  updateUnidadesCtrl,
  readAllUnidadesCtrl,
  readUnidadCtrl,
  deleteUnidadCtrl,
};
