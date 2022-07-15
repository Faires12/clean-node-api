import { AddImage } from "../../../domain/usecases/add-image/add-image";
import { EditImage } from "../../../domain/usecases/edit-image/edit-image";
import { LoadImage } from "../../../domain/usecases/load-image/load-image";
import { badRequest, internalError, noContent, ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../../protocols";

export class EditImageController implements Controller {

    constructor(private readonly validations : Validation, private readonly loadImage : LoadImage,
        private readonly editImage : EditImage) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if(error)
                return badRequest(error)

            const image = await this.loadImage.load(httpRequest.params.id, httpRequest.body.accountId)
                if(!image)
                    return badRequest(new Error("Image not found"))

            const {title, base64} = httpRequest.body

            await this.editImage.edit({id: httpRequest.params.id, title: title ?? undefined, base64: base64 ?? undefined})

            return noContent()
        } catch (error) {
            console.log(error)
            return internalError()
        }    
    }
}