import { DeleteImage } from "../../../domain/usecases/delele-image/delete-image";
import { LoadImage } from "../../../domain/usecases/load-image/load-image";
import { badRequest, internalError, noContent } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class DeleteImageController implements Controller {

    constructor(private readonly loadImage : LoadImage,
        private readonly deleteImage : DeleteImage) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const image = await this.loadImage.load(httpRequest.params.id, httpRequest.body.accountId)
            if(!image)
                return badRequest(new Error("Image not found"))

            await this.deleteImage.delete(httpRequest.params.id)

            return noContent()
        } catch (error) {
            return internalError()
        }
    }
}