import { HttpRequest, Middleware } from "../../presentation/protocols"
import { NextFunction, Request, Response } from "express"

export const adaptMiddleware = (middleware: Middleware) => {
    return async (req : Request, res: Response, next: NextFunction) => {
        const httpRequest : HttpRequest = {
            headers: req.headers
        }

        const httpResponse = await middleware.handle(httpRequest)
        if(httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299){
            req.body.accountId = httpResponse.body.accountId
            next()
        } else {
            return res.status(httpResponse.statusCode).json({msg: httpResponse.body.message})
        }
    }
}