import { UuidGenerator } from "../../data/protocols/uuid/uuid-generator";
import { v4 } from "uuid";

export class UuidAdapter implements UuidGenerator {
    generate(): string {
        return v4()
    }   
}