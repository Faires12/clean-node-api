import { InvalidParamError } from "../errors";
import { Validation } from "../protocols";

export class CompareFieldsValidation implements Validation{
    constructor(private readonly fieldName : string, private readonly fieldName2 : string) {}
    
    validate(input: any): Error | null {
        if(input[this.fieldName] !== input[this.fieldName2])
            return new InvalidParamError(this.fieldName2)
        return null
    }
}