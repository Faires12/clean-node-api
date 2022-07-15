import { AccountModel } from "../../domain/models/account"
import { Encrypter } from "../protocols/cryptography/encrypter"
import { LoadAccountByEmailRepository } from "../protocols/repositories/load-account-by-email-repository"
import { DbAddAccount } from "./db-add-account"
import {AddAccountRepository} from '../protocols/repositories/add-account-repository'
import { AddAccountModel } from "../../domain/usecases/add-account/add-account"

const makeLoadAccountByEmailRepository = () : LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository{
        async loadByEmail(email: string): Promise<AccountModel | null> {
            return null
        }
    }

    return new LoadAccountByEmailRepositoryStub()
}

const makeEncrypter = () : Encrypter => {
    class EncrypterStub implements Encrypter{
        async encrypt(input: string): Promise<string> {
            return 'hashed_password'
        }
    } 

    return new EncrypterStub()
}

const makeAddAccountRepository = () : AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository{
        async add(account: AddAccountModel): Promise<AccountModel> {
            return {
                email: 'email',
                name: 'name',
                password: 'hashed_password',
                id: 'id'
            }
        }
    } 

    return new AddAccountRepositoryStub()
}

interface sutTypes {
    sut: DbAddAccount
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
    encrypterStub: Encrypter
    addAccountRepositoryStub: AddAccountRepository
}

const makeSut = () : sutTypes => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const encrypterStub = makeEncrypter()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(loadAccountByEmailRepositoryStub, encrypterStub, addAccountRepositoryStub)
    return {sut, loadAccountByEmailRepositoryStub, encrypterStub, addAccountRepositoryStub}
}

const fakeAcc = {
    email: 'email',
    name: 'name',
    password: '123'
}

describe('DbAddAccount', () => {
    test('Shold call LoadAccountByEmailRepository with correct values', async () => {
        const {sut, loadAccountByEmailRepositoryStub} = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.add(fakeAcc)
        expect(loadSpy).toHaveBeenCalledWith(fakeAcc.email)
    })

    test('Shold return null if LoadAccountByEmailRepository return existingAccount', async () => {
        const {sut, loadAccountByEmailRepositoryStub} = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve =>
            resolve({
                email: 'email',
                name: 'name',
                password: 'hashed_password',
                id: 'id'
            })))

        const res = await sut.add(fakeAcc)
        expect(res).toBeNull()
    })

    test('Shold throw if LoadAccountByEmailRepository throws', async () => {
        const {sut, loadAccountByEmailRepositoryStub} = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) =>
        reject(new Error(''))))

        const promise = sut.add(fakeAcc)
        await expect(promise).rejects.toThrow()
    })

    test('Shold call Encrypter with correct values', async () => {
        const {sut, encrypterStub} = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        await sut.add(fakeAcc)
        expect(encryptSpy).toHaveBeenCalledWith(fakeAcc.password)
    })


    test('Shold throw if Encrypter throws', async () => {
        const {sut, encrypterStub} = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) =>
        reject(new Error(''))))

        const promise = sut.add(fakeAcc)
        await expect(promise).rejects.toThrow()
    })

    test('Shold call AddAccountRepository with correct values', async () => {
        const {sut, addAccountRepositoryStub} = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(fakeAcc)
        expect(addSpy).toHaveBeenCalledWith({...fakeAcc, password: 'hashed_password'})
    })


    test('Shold throw if AddAccountRepository throws', async () => {
        const {sut, addAccountRepositoryStub} = makeSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) =>
        reject(new Error(''))))

        const promise = sut.add(fakeAcc)
        await expect(promise).rejects.toThrow()
    })
})