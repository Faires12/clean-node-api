import { DbLoadAccountImages } from "../../../data/usecases/image/db-load-account-images"
import { MongooseImage } from "../../../infra/db/mongoose/image-repository"
import { LoadAccountImagesController } from "../../../presentation/controllers/image/load-images-controller"

export const makeLoadAccountImagesController = () : LoadAccountImagesController => {
    const dbLoadAccountImages = new DbLoadAccountImages(new MongooseImage())
    return new LoadAccountImagesController(dbLoadAccountImages)
}