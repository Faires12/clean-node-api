import { TokenGenerator } from "../../data/protocols/token/token-generator";
import jwt from 'jsonwebtoken'
import { TokenDecrypter } from "../../data/protocols/token/token-decrypter";

export class JwtAdapter implements TokenGenerator, TokenDecrypter {

    constructor(private readonly secret : string) {}

    async generate(input: string): Promise<string> {
        return await jwt.sign(input, this.secret)     
    }

    async decrypt(token: string): Promise<string> {
        return await jwt.decode(token) as string
    }
}