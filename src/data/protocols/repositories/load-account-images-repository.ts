import { ImageModel } from "../../../domain/models/image";

export interface LoadAccountImagesRepository {
    loadImages(accountId: string) : Promise<ImageModel[]>
}