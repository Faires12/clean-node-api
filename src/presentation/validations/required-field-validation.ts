import { MissingParamError } from "../errors";
import { Validation } from "../protocols";

export class RequiredFieldValidation implements Validation{
    constructor(private readonly fieldName : string) {}
    
    validate(input: any): Error | null {
        if(!input[this.fieldName])
            return new MissingParamError(this.fieldName)
        return null
    }
}