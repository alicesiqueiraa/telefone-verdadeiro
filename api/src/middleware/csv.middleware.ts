import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class csvMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {

        res.locals.csv = req.body.csv;

        res.locals.file = req.body.file;

        next()
    }
}