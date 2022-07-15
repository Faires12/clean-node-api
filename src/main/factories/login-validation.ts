import { Validation } from "../../presentation/protocols";
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from "../../presentation/validations";
import { ValidatorAdapter } from "../../utils/validator-adapter";

export const makeLoginValidation = () : Validation => {
    const validations : Validation[] = []
    for(const field of ['email', 'password']){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    return new ValidationComposite(validations)
}