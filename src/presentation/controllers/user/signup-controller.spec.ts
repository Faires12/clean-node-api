import { AccountModel } from "../../../domain/models/account"
import { AddAccount, AddAccountModel } from "../../../domain/usecases/add-account/add-account"
import { Authentication, AuthenticationModel } from "../../../domain/usecases/authentication/authentication"
import { badRequest, forbiden, internalError } from "../../helpers/http"
import { Validation } from "../../protocols"
import { SignUpController } from "./signup-controller"

const makeValidation = () : Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error | null {
            return null
        }
    }

    return new ValidationStub()
}

const makeAddAccount = () : AddAccount => {
    class AddAccountStub implements AddAccount {
        async add(account: AddAccountModel): Promise<AccountModel | null> {
            return new Promise(resolve => resolve({
                email: 'email',
                name: 'name',
                password: '123',
                id: 'id'
            }))
        }
    }

    return new AddAccountStub()
}

const makeAuthentication = () : Authentication => {
    class AuthenticationStub implements Authentication{
        async auth(authentication: AuthenticationModel): Promise<string | null> {
            return 'accessToken'
        }
    }
    
    return new AuthenticationStub()
}

interface sutTypes {
    sut: SignUpController
    validationStub: Validation
    addAccountStub: AddAccount
    authenticationStub: Authentication
}

const makeSut = () : sutTypes => {
    const validationStub = makeValidation()
    const addAccountStub = makeAddAccount()
    const authenticationStub = makeAuthentication()
    const sut = new SignUpController(validationStub, addAccountStub, authenticationStub)
    return {sut, validationStub, addAccountStub, authenticationStub}
}

const FakeRequest = {
    body: {
        email: 'email',
        name: 'name',
        password: '123',
        cpassword: '123'
    }
}

describe('SignUp Controller', () => {
    test('Should return 400 if validation returns error', async () => {
        const {sut, validationStub} = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
        const httpResponse = await sut.handle(FakeRequest)
        expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Should call validation with correct values', async () => {
        const {sut, validationStub} = makeSut()
        const validSpy = jest.spyOn(validationStub, 'validate')
        await sut.handle(FakeRequest)
        expect(validSpy).toHaveBeenCalledWith(FakeRequest.body)
    })

    test('Should return 403 if AddAccount returns null', async () => {
        const {sut, addAccountStub} = makeSut()
        jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.handle(FakeRequest)
        expect(httpResponse).toEqual(forbiden(new Error('Email already in use!')))
    })

    test('Should call AddAccount with correct values', async () => {
        const {sut, addAccountStub} = makeSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        await sut.handle(FakeRequest)
        expect(addSpy).toHaveBeenCalledWith({
            email: 'email',
            name: 'name',
            password: '123',
        })
    })

    test('Should return 500 if AddAccount throws', async () => {
        const {sut, addAccountStub} = makeSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
            throw new Error('')
        })
        const httpResponse = await sut.handle(FakeRequest)
        expect(httpResponse).toEqual(internalError())
    })

    test('Should return 200 on success', async () => {
        const {sut} = makeSut()
        const httpResponse = await sut.handle(FakeRequest)
        expect(httpResponse.statusCode).toBe(200)
    })
})