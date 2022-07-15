import { AccountModel } from "../../models/account"

export interface AddAccountModel{
    email: string
    name: string
    password: string
}

export interface AddAccount {
    add (account : AddAccountModel) : Promise<AccountModel | null>
}