import { ImageModel } from "../../../domain/models/image";
import { LoadAccountImages } from "../../../domain/usecases/load-account-images/load-account-images";
import { LoadAccountImagesRepository } from "../../protocols/repositories/load-account-images-repository";

export class DbLoadAccountImages implements LoadAccountImages {

    constructor(private readonly loadAccountImagesRepository : LoadAccountImagesRepository) {}

    async loadImages(accountId: string): Promise<ImageModel[]> {
        const images = await this.loadAccountImagesRepository.loadImages(accountId)
        return images
    }
}