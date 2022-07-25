import express, { Response } from "express";

function handleHttpResponse(res: Response, data: object = { message: 'Success process...' }, code: number = 200): void {
    res.status(code);
    res.send({ data, success: true });
}

export default handleHttpResponse;
//module.exports = {handleHttpResponse};