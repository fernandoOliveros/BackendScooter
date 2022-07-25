import express, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

function validateResults(req: Request, res: Response, next: NextFunction) {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        res.status(403);
        res.send("something went wrong");
    }

} 

export default validateResults;
//module.exports= validateResults;