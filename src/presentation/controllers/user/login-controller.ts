import { Authentication } from "../../../domain/usecases/authentication/authentication";
import { badRequest, internalError, ok, unauthorized } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../../protocols";

export class LoginController implements Controller {
    constructor(private readonly validations : Validation, private readonly authentication : Authentication) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if(error)
                return badRequest(error)

            const {email, password} = httpRequest.body

            const accessToken = await this.authentication.auth({email, password})
            if(!accessToken)
                return unauthorized(new Error('Unauthorized'))

            return ok({accessToken})
        } catch (error) {
            return internalError()
        }
    }
}