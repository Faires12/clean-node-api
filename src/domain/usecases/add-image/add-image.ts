import { ImageModel } from "../../models/image"

export interface AddImageModel {
    accountId: string
    title: string
    base64: string
}

export interface AddImage {
    add(image : AddImageModel) : Promise<ImageModel>
}