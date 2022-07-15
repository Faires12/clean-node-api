import { EmailValidator } from "../presentation/validations";
import validator from "validator";
import { Base64Validator } from "../presentation/validations/base-64-validator";

export class ValidatorAdapter implements EmailValidator, Base64Validator {
    isValid(email: string): boolean {
        return validator.isEmail(email)
    }

    isValidBase64(base64: string): boolean {
        let base64Image = base64.split(';base64,').pop() 
        if(!base64Image)
            return false
        return validator.isBase64(base64Image)
    }
}