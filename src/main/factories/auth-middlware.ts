import { DbLoadAccountByToken } from "../../data/usecases/db-load-account-by-token";
import { MongooseAccount } from "../../infra/db/mongoose/account-repository";
import { JwtAdapter } from "../../infra/token/jwt-adapter";
import { AuthMiddleware } from "../../presentation/middlewares/auth-middleware";

export const makeAuthMiddleware = () : AuthMiddleware => {
    const jwtAdapter = new JwtAdapter('secret')
    const mongooseAccount = new MongooseAccount()
    const dbLoadAccountByToken = new DbLoadAccountByToken(jwtAdapter, mongooseAccount)
    return new AuthMiddleware(dbLoadAccountByToken)
}