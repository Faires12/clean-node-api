export interface SaveBase64File {
    save(base64 : string, fileName: string) : Promise<string>
}