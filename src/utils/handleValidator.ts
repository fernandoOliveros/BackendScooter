import express, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

function validateResults(req: Request, res: Response, next: NextFunction) {
    try {
        validationResult(req).throw();
        return next();
    } catch (e) {
        res.status(403);
        res.send({ errors : e.array() });
    }

} 

export default validateResults;