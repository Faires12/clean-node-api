import { ImageModel } from "../../../domain/models/image";

export interface AddImageRepositoryModel {
    accountId: string
    title: string
    path: string
}

export interface AddImageRepository {
    add(image : AddImageRepositoryModel) : Promise<ImageModel>
}