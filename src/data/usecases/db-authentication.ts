import { Authentication, AuthenticationModel } from "../../domain/usecases/authentication/authentication";
import { HashComparer } from "../protocols/cryptography/hash-comparer";
import { LoadAccountByEmailRepository } from "../protocols/repositories/load-account-by-email-repository";
import { TokenGenerator } from "../protocols/token/token-generator";

export class DbAuthentication implements Authentication {

    constructor(private readonly loadAccountByEmailRepository : LoadAccountByEmailRepository,
        private readonly hashComparer : HashComparer, private readonly tokenGenerator : TokenGenerator) {}

    async auth(authentication: AuthenticationModel): Promise<string | null> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
        if(!account)
            return null

        const isPasswordValid = await this.hashComparer.compare(authentication.password, account.password)
        if(!isPasswordValid)
            return null

        const accessToken = await this.tokenGenerator.generate(account.id)
        return accessToken
    }
}