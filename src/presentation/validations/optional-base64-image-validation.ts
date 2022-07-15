import { InvalidParamError } from "../errors";
import { Validation } from "../protocols";
import { Base64Validator } from "./base-64-validator";

export class OptionalBase64ImageValidation implements Validation{
    constructor(private readonly fieldName : string, private readonly base64Validator : Base64Validator) {}
    
    validate(input: any): Error | null {
        if(!input[this.fieldName])
            return null
        
        if(!this.base64Validator.isValidBase64(input[this.fieldName]))
            return new InvalidParamError(this.fieldName)

        let fileType = input[this.fieldName].split(';base64,').pop().charAt(0)

        if(fileType !== '/' && fileType !== 'i' && fileType !== 'R')
            return new InvalidParamError(this.fieldName)
            
        return null
    }
}