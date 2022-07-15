import { DbAddAccount } from "../../data/usecases/db-add-account";
import { DbAuthentication } from "../../data/usecases/db-authentication";
import { BcryptAdapter } from "../../infra/cryptography/bcrypt-adapter";
import { MongooseAccount } from "../../infra/db/mongoose/account-repository";
import { JwtAdapter } from "../../infra/token/jwt-adapter";
import { LoginController } from "../../presentation/controllers/user/login-controller";
import { makeLoginValidation } from "./login-validation";

export const makeLoginController = () : LoginController => {
    const mongooseAccount = new MongooseAccount()
    const bcryptAdapter = new BcryptAdapter(12)
    const jwtAdapter = new JwtAdapter('secret')
    const dbAuthentication = new DbAuthentication(mongooseAccount, bcryptAdapter, jwtAdapter)
    return new LoginController(makeLoginValidation(), dbAuthentication)
}