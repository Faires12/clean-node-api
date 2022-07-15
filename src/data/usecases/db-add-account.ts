import { AccountModel } from "../../domain/models/account";
import { AddAccount, AddAccountModel } from "../../domain/usecases/add-account/add-account";
import { Encrypter } from "../protocols/cryptography/encrypter";
import { AddAccountRepository } from "../protocols/repositories/add-account-repository";
import { LoadAccountByEmailRepository } from "../protocols/repositories/load-account-by-email-repository";

export class DbAddAccount implements AddAccount {

    constructor(
        private readonly loadAccountByEmailRepository : LoadAccountByEmailRepository,
        private readonly encrypter : Encrypter,
        private readonly addAccountRepository : AddAccountRepository) {}
    
    async add(account: AddAccountModel): Promise<AccountModel | null> {
        const existingAccount = await this.loadAccountByEmailRepository.loadByEmail(account.email)
        if(existingAccount)
            return null
        
        const hashed_password = await this.encrypter.encrypt(account.password)

        const newAccount = await this.addAccountRepository.add({...account, password: hashed_password})
        return newAccount
    }
}