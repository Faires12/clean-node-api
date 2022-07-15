import { AddImage } from "../../../domain/usecases/add-image/add-image";
import { badRequest, internalError, ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../../protocols";

export class AddImageController implements Controller {

    constructor(private readonly validations : Validation, private readonly addImage : AddImage) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if(error)
                return badRequest(error)

            const {title, base64, accountId} = httpRequest.body
            const image = await this.addImage.add({title, base64, accountId})

            return ok(image)
        } catch (error) {
            console.log(error)
            return internalError()
        }    
    }
}