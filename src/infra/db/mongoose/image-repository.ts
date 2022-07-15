import { AddImageRepository, AddImageRepositoryModel } from "../../../data/protocols/repositories/add-image-repository";
import { DeleteImageRepository } from "../../../data/protocols/repositories/delete-image-repository";
import { EditImageRepository, EditImageRepositoryModel } from "../../../data/protocols/repositories/edit-image-repository";
import { LoadAccountImagesRepository } from "../../../data/protocols/repositories/load-account-images-repository";
import { LoadImageRepository } from "../../../data/protocols/repositories/load-image-repository";
import { ImageModel } from "../../../domain/models/image";
import Image from "./models/Image";

const map = (collection : any) : any => {
    const {_id, __v, ...collectionWithoutId} = collection._doc
    return Object.assign({}, collectionWithoutId, {id: _id.toString()})
}

const mapArray = (collectionArray : any) : any => {
    let collectionArrayMapped : any[] = []

    for(const collection of collectionArray){
        collectionArrayMapped.push(map(collection))
    }

    return collectionArrayMapped
}

export class MongooseImage implements AddImageRepository, LoadAccountImagesRepository, 
LoadImageRepository, DeleteImageRepository, EditImageRepository {
    async add(image: AddImageRepositoryModel): Promise<ImageModel> {
        const newImage = new Image(image)
        await newImage.save()
        return map(newImage)
    }

    async loadImages(accountId: string): Promise<ImageModel[]> {
        const images = await Image.find({accountId})
        return mapArray(images)
    }

    async load(id: string): Promise<ImageModel | null> {
        const image = await Image.findById(id)
        if(!image)
            return null
        return map(image)
    }

    async delete(id: string): Promise<void> {
        await Image.findByIdAndDelete(id)
    }

    async edit(image: EditImageRepositoryModel): Promise<void> {
        let query : any = {}
        if(image.title)
            query.title = image.title
        if(image.path)
            query.path = image.path

        await Image.findByIdAndUpdate(image.id, query)
    }
}