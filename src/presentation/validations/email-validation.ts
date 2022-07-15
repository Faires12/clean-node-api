import { InvalidParamError } from "../errors";
import { Validation } from "../protocols";
import { EmailValidator } from "./email-validator";

export class EmailValidation implements Validation{
    constructor(private readonly fieldName : string, private readonly emailValidator : EmailValidator) {}
    
    validate(input: any): Error | null {
        if(!this.emailValidator.isValid(input[this.fieldName]))
            return new InvalidParamError(this.fieldName)
        return null
    }
}