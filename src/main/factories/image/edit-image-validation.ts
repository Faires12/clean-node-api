import { Validation } from "../../../presentation/protocols";
import { ValidationComposite } from "../../../presentation/validations";
import { OptionalBase64ImageValidation } from "../../../presentation/validations/optional-base64-image-validation";
import { ValidatorAdapter } from "../../../utils/validator-adapter";

export const MakeEditImageValidation = () : Validation => {
    const validations : Validation[] = []

    validations.push(new OptionalBase64ImageValidation('base64', new ValidatorAdapter()))
    return new ValidationComposite(validations)
}