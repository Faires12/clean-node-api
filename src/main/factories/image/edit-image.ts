import { DbAddImage } from "../../../data/usecases/image/db-add-image"
import { DbEditImage } from "../../../data/usecases/image/db-edit-image"
import { DbLoadImage } from "../../../data/usecases/image/db-load-image"
import { MongooseImage } from "../../../infra/db/mongoose/image-repository"
import { FileSystemAdapter } from "../../../infra/files/file-system-adapter"
import { UuidAdapter } from "../../../infra/uuid/uuid-adapter"
import { EditImageController } from "../../../presentation/controllers/image/edit-image-controller"
import { MakeEditImageValidation } from "./edit-image-validation"


export const makeEditImageController = (publicPath : string) : EditImageController => {
    const mongooseImage = new MongooseImage()
    const dbEditImage = new DbEditImage(new UuidAdapter(), new FileSystemAdapter(publicPath), mongooseImage)
    const dbLoadImage = new DbLoadImage(mongooseImage)
    return new EditImageController(MakeEditImageValidation(), dbLoadImage, dbEditImage)
}