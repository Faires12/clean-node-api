import { DbAddImage } from "../../../data/usecases/image/db-add-image"
import { MongooseImage } from "../../../infra/db/mongoose/image-repository"
import { FileSystemAdapter } from "../../../infra/files/file-system-adapter"
import { UuidAdapter } from "../../../infra/uuid/uuid-adapter"
import { AddImageController } from "../../../presentation/controllers/image/add-image-controller"
import { makeAddImageValidation } from "./add-image-validation"


export const makeAddImageController = (publicPath : string) : AddImageController => {
    const dbAddImage = new DbAddImage(new UuidAdapter(), new FileSystemAdapter(publicPath), new MongooseImage())
    return new AddImageController(makeAddImageValidation(), dbAddImage)
}