export interface EditImageModel {
    title?: string
    base64?: string
    id: string
}

export interface EditImage {
    edit(image : EditImageModel) : Promise<void>
}