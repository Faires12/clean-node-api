import { Controller, HttpRequest } from "../../presentation/protocols"
import { Request, Response } from "express"

export const adaptRoute = (controller : Controller) => {
    return async (req : Request, res: Response) => {
        const httpRequest : HttpRequest = {
            body: req.body,
            params: req.params
        }

        const httpResponse = await controller.handle(httpRequest)
        if(httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299){
            return res.status(httpResponse.statusCode).json(httpResponse.body)
        } else {
            return res.status(httpResponse.statusCode).json({msg: httpResponse.body.message})
        }
    }
}