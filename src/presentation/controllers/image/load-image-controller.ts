import { LoadImage } from "../../../domain/usecases/load-image/load-image";
import { badRequest, internalError, ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoadImageController implements Controller {

    constructor(private readonly loadImage : LoadImage) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const image = await this.loadImage.load(httpRequest.params.id, httpRequest.body.accountId)
            if(!image)
                return badRequest(new Error("Image not found"))

                return ok(image)
        } catch (error) {
            return internalError()
        }
    }
}