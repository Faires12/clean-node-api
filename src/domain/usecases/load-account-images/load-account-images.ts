import { ImageModel } from "../../models/image";

export interface LoadAccountImages {
    loadImages(accountId: string) : Promise<ImageModel[]>
}