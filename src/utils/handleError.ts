import express, { Response } from "express";

function handleHttpError(res: Response,  message: string= "Something went wrong..." , code: number = 403): void {
    res.status(code);
    res.send({error: message, success: false });
}

export default handleHttpError;