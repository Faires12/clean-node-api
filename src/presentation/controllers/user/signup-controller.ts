import { badRequest, forbiden, internalError, ok, unauthorized } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../../protocols";
import {AddAccount} from '../../../domain/usecases/add-account/add-account'
import { Authentication } from "../../../domain/usecases/authentication/authentication";

export class SignUpController implements Controller{

    constructor(private readonly validations : Validation, private readonly addAccount : AddAccount,
        private readonly authentication : Authentication) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)
            if(error)
                return badRequest(error)

            const {email, name, password} = httpRequest.body
            const account = await this.addAccount.add({email, name, password})
            if(!account)
                return forbiden(new Error('Email already in use!'))

            const accessToken = await this.authentication.auth({email, password})
            if(!accessToken)
                return unauthorized(new Error('Unauthorized!'))
            
            return ok({accessToken: accessToken})
        } catch (error) {
            return internalError()
        }
    }

}