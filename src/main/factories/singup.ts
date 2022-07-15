import { DbAddAccount } from "../../data/usecases/db-add-account";
import { DbAuthentication } from "../../data/usecases/db-authentication";
import { BcryptAdapter } from "../../infra/cryptography/bcrypt-adapter";
import { MongooseAccount } from "../../infra/db/mongoose/account-repository";
import { JwtAdapter } from "../../infra/token/jwt-adapter";
import { SignUpController } from "../../presentation/controllers/user/signup-controller";
import { makeSignupValidation } from "./signup-validation";

export const makeSignUpController = () : SignUpController=> {
    const mongooseAccount = new MongooseAccount()
    const bcryptAdapter = new BcryptAdapter(12)
    const jwtAdapter = new JwtAdapter('secret')
    const dbAddAccount = new DbAddAccount(mongooseAccount, bcryptAdapter, mongooseAccount)
    const dbAuthentication = new DbAuthentication(mongooseAccount, bcryptAdapter, jwtAdapter)
    return new SignUpController(makeSignupValidation(), dbAddAccount, dbAuthentication)
}