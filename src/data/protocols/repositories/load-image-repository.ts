import { ImageModel } from "../../../domain/models/image";

export interface LoadImageRepository {
    load(id : string) : Promise<ImageModel | null>
}