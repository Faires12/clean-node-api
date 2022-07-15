import { ImageModel } from "../../models/image";

export interface LoadImage {
    load(id : string, accountId : string) : Promise<ImageModel | null>
}