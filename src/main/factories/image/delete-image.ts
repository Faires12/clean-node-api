import { DbDeleteImage } from "../../../data/usecases/image/db-delete-image"
import { DbLoadImage } from "../../../data/usecases/image/db-load-image"
import { MongooseImage } from "../../../infra/db/mongoose/image-repository"
import { DeleteImageController } from "../../../presentation/controllers/image/delete-image-controller"

export const makeDeleteImage = () : DeleteImageController => {
    const mongooseImage = new MongooseImage()
    const dbDeleteImage = new DbDeleteImage(mongooseImage)
    const dbLoadImage = new DbLoadImage(mongooseImage)
    return new DeleteImageController(dbLoadImage, dbDeleteImage)
}