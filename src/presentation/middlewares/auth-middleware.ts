import { LoadAccountByToken } from "../../domain/usecases/load-account-by-token/load-account-by-token";
import { internalError, ok, unauthorized } from "../helpers/http";
import { HttpRequest, HttpResponse, Middleware } from "../protocols";

export class AuthMiddleware implements Middleware {

    constructor(private readonly loadAccountByToken : LoadAccountByToken) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accessToken = httpRequest.headers.accesstoken

            if(!accessToken)
                return unauthorized(new Error('Missing access token'))

            const account = await this.loadAccountByToken.loadByToken(accessToken)
            if(!account)
                return unauthorized(new Error('Invalid access token'))
            
            return ok({accountId: account.id})
        } catch (error) {
            return internalError()
        }
    }
}