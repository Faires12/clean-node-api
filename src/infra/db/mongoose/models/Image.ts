import {Schema, model} from 'mongoose'

const ImageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
    accountId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

export default model('images', ImageSchema)