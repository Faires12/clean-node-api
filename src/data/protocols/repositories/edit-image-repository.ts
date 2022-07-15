import { ImageModel } from "../../../domain/models/image";

export interface EditImageRepositoryModel {
    id: string
    title?: string
    path?: string
}

export interface EditImageRepository {
    edit(image : EditImageRepositoryModel) : Promise<void>
}