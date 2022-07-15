import { ImageModel } from "../../../domain/models/image";
import { AddImage, AddImageModel } from "../../../domain/usecases/add-image/add-image";
import { SaveBase64File } from "../../protocols/files/save-base64-file";
import { AddImageRepository } from "../../protocols/repositories/add-image-repository";
import { UuidGenerator } from "../../protocols/uuid/uuid-generator";

export class DbAddImage implements AddImage {

    constructor(private readonly uuidGenerator : UuidGenerator,
        private readonly saveBase64File : SaveBase64File,
        private readonly addImageRepository : AddImageRepository){}

    async add(image: AddImageModel): Promise<ImageModel> {
        const uuid = this.uuidGenerator.generate()  
        const path = await this.saveBase64File.save(image.base64, uuid)
        const newImage = await this.addImageRepository.add({
            title: image.title,
            path: path,
            accountId: image.accountId
        })

        return newImage
    }
}