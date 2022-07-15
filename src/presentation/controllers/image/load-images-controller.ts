import { LoadAccountImages } from "../../../domain/usecases/load-account-images/load-account-images";
import { forbiden, internalError, ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoadAccountImagesController implements Controller {

    constructor(private readonly loadAccountImages : LoadAccountImages) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const images = await this.loadAccountImages.loadImages(httpRequest.body.accountId)
            return ok(images)
        } catch (error) {
            return internalError()
        }
    }
}