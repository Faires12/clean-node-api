import { DbLoadImage } from "../../../data/usecases/image/db-load-image"
import { MongooseImage } from "../../../infra/db/mongoose/image-repository"
import { LoadImageController } from "../../../presentation/controllers/image/load-image-controller"

export const makeLoadImageController = () : LoadImageController => {
    const dbLoadImage = new DbLoadImage(new MongooseImage())
    return new LoadImageController(dbLoadImage)
}