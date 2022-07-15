import { DeleteImage } from "../../../domain/usecases/delele-image/delete-image";
import { DeleteImageRepository } from "../../protocols/repositories/delete-image-repository";

export class DbDeleteImage implements DeleteImage {

    constructor(private readonly deleteImageRepository : DeleteImageRepository) {}

    async delete(id: string): Promise<void> {
        await this.deleteImageRepository.delete(id)
    }
}