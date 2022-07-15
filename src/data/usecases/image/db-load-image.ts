import { ImageModel } from "../../../domain/models/image";
import { LoadImage } from "../../../domain/usecases/load-image/load-image";
import { LoadImageRepository } from "../../protocols/repositories/load-image-repository";

export class DbLoadImage implements LoadImage {

    constructor(private readonly laodImageRepository : LoadImageRepository) {}
        
    async load(id: string, accountId: string): Promise<ImageModel | null> {
        const image = await this.laodImageRepository.load(id)
        if(!image)
            return null
        if(image && image.accountId.toString() !== accountId)
            return null
        return image
    }
}