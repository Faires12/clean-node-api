import { AccountModel } from "../../domain/models/account";
import { LoadAccountByToken } from "../../domain/usecases/load-account-by-token/load-account-by-token";
import { LoadAccountByIdRepository } from "../protocols/repositories/load-account-by-id-repository";
import { TokenDecrypter } from "../protocols/token/token-decrypter";

export class DbLoadAccountByToken implements LoadAccountByToken {

    constructor(private readonly tokenDecrypter : TokenDecrypter, 
        private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {}

    async loadByToken(accessToken: string): Promise<AccountModel | null> {
        const id = await this.tokenDecrypter.decrypt(accessToken)
        if(!id)
            return null

        const account = await this.loadAccountByIdRepository.loadById(id)
        if(!account)
            return null
            
        return account
    }
}