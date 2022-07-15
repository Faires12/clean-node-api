import { Encrypter } from "../../data/protocols/cryptography/encrypter";
import bcrypt from 'bcrypt'
import { HashComparer } from "../../data/protocols/cryptography/hash-comparer";

export class BcryptAdapter implements Encrypter, HashComparer {

    constructor(private readonly salt : number) {}

    async encrypt(input: string): Promise<string> {
        return await bcrypt.hash(input, this.salt)
    }

    async compare(input: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(input, hashed)
    }
}