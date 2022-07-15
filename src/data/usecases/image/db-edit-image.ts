import { DeleteImage } from "../../../domain/usecases/delele-image/delete-image";
import { EditImage, EditImageModel } from "../../../domain/usecases/edit-image/edit-image";
import { SaveBase64File } from "../../protocols/files/save-base64-file";
import { DeleteImageRepository } from "../../protocols/repositories/delete-image-repository";
import { EditImageRepository } from "../../protocols/repositories/edit-image-repository";
import { UuidGenerator } from "../../protocols/uuid/uuid-generator";

export class DbEditImage implements EditImage {

    constructor(private readonly uuidGenerator : UuidGenerator,
        private readonly saveBase64File : SaveBase64File,
        private readonly editImageRepository : EditImageRepository) {}

    async edit(image: EditImageModel): Promise<void> {
        const uuid = this.uuidGenerator.generate()  
        const path = image.base64 ? await this.saveBase64File.save(image.base64, uuid) : image.base64
        await this.editImageRepository.edit({id: image.id, path: path , title: image.title})
    }
}