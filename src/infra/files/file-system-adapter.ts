import { SaveBase64File } from "../../data/protocols/files/save-base64-file";
import * as fs from 'node:fs/promises'

export class FileSystemAdapter implements SaveBase64File {
    imageType : any = {
        '/': 'jpg',
        'i': 'png',
        'R': 'gif'
    }

    constructor(private readonly basePath : string) {}

    async save(base64: string, fileName: string): Promise<string> {
        let base64Image = base64.split(';base64,').pop() as any

        const imageName = `${fileName}.${this.imageType[base64Image.charAt(0)]}`
        await fs.writeFile(`${this.basePath}/${imageName}`, base64Image, {encoding: 'base64'})
        
        return imageName
    }       
}