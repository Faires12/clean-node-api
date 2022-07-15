import { Validation } from "../../../presentation/protocols";
import { Base64ImageValidation, RequiredFieldValidation, ValidationComposite } from "../../../presentation/validations";
import { ValidatorAdapter } from "../../../utils/validator-adapter";

export const makeAddImageValidation = () : Validation => {
    const validations : Validation[] = []
    for(const field of ['title', 'base64']){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new Base64ImageValidation('base64', new ValidatorAdapter()))
    return new ValidationComposite(validations)
}