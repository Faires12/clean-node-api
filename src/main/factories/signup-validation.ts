import { Validation } from "../../presentation/protocols";
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from "../../presentation/validations";
import { ValidatorAdapter } from "../../utils/validator-adapter";

export const makeSignupValidation = () : Validation => {
    const validations : Validation[] = []
    for(const field of ['email', 'name', 'password', 'cpassword']){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'cpassword'))
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    return new ValidationComposite(validations)
}