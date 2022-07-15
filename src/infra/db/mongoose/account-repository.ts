import { AddAccountRepository } from "../../../data/protocols/repositories/add-account-repository";
import { LoadAccountByEmailRepository } from "../../../data/protocols/repositories/load-account-by-email-repository";
import { LoadAccountByIdRepository } from "../../../data/protocols/repositories/load-account-by-id-repository";
import { AccountModel } from "../../../domain/models/account";
import { AddAccountModel } from "../../../domain/usecases/add-account/add-account";
import Account from './models/Account'

const map = (collection : any) : any => {
    const {_id, __v, ...collectionWithoutId} = collection._doc
    return Object.assign({}, collectionWithoutId, {id: _id.toString()})
}

export class MongooseAccount implements LoadAccountByEmailRepository, AddAccountRepository, LoadAccountByIdRepository {
    async loadByEmail(email: string): Promise<AccountModel | null> {
        const account = await Account.findOne({email: email})
        if(account)
            return map(account)
        return null
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        const newAccount = new Account(account)
        await newAccount.save()
        return map(newAccount)
    }

    async loadById(id: string): Promise<AccountModel | null> {
        const account = await Account.findById(id)
        if(account)
            return map(account)
        return null
    }
}